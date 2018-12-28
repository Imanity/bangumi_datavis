import scrapy
from bangumi.items import *
class MySpider(scrapy.Spider):
    #用于区别Spider
    name = "MySpider"
    #允许访问的域
    allowed_domains = ['bangumi.tv']
    #爬取的地址
    start_urls = ['http://bangumi.tv/anime/browser/airtime/2018?sort=rank&page=1']
    page = 1
    #爬取方法
    def parse(self, response):
        for i in response.xpath('//h3'):
            id = 'http://bangumi.tv'+i.xpath('.//a/@href').extract()[0]
            yield scrapy.Request(id,callback = self.parse_subject)
        self.page +=1
        if(self.page < 12):
            urls = 'http://bangumi.tv/anime/browser/airtime/2018?sort=rank&page='+str(self.page)
            yield scrapy.Request(url = urls, callback = self.parse)
        return None
    def parse_subject(self, response):
        item = BangumiItem()
        item['id'] = response.url.split('/')[-1]
        item['name'] = (response.xpath('//h1[@class="nameSingle"]/a/text()').extract()[0])
        item['score'] = response.xpath('//*[@id="panelInterestWrapper"]/div[1]/div/div[1]/div[2]/span[1]/text()').extract()[0]
        item['cover'] = response.xpath('//*[@id="bangumiInfo"]/div/div/a/img').extract()[0].split('\"')[1]
        item['tags'] = response.xpath('//*[@id="subject_detail"]/div[3]/div/a/span/text()').extract()
        item['cv_id'] = []
        
        for i in range(len( response.xpath('//div[@class="info"]').extract())):
            tmp = (response.xpath('//*[@id="browserItemList"]/li['+str(i+1)+']/div/div/span/a/@href').extract())
            if tmp != []:
                item['cv_id'].append(response.xpath('//*[@id="browserItemList"]/li['+str(i+1)+']/div/div/span/a/@href').extract()[0].split('/')[-1])
                yield scrapy.Request('http://bangumi.tv/person/'+ item['cv_id'][-1], callback = self.parse_person)
        for i in item['cv_id']:
            i = i.split('/')[-1]
        for i in range(len(response.xpath('//*[@id="infobox"]/li').extract())):
            title = response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/span/text()').extract()[0]
            if title == '导演: ':
                item['director_id'] = [j.split('/')[-1] for j in response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/a/@href').extract()]
                for x in item['director_id']:
                    yield scrapy.Request('http://bangumi.tv/person/'+ x, callback = self.parse_person)
            elif title == '脚本: ':
                item['script_id'] = [j.split('/')[-1] for j in response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/a/@href').extract()]
                for x in item['script_id']:
                    yield scrapy.Request('http://bangumi.tv/person/'+ x, callback = self.parse_person)

            elif title == '分镜: ':
                item['storyboard_id'] = [j.split('/')[-1] for j in response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/a/@href').extract() ]
                for x in item['storyboard_id']:
                    yield scrapy.Request('http://bangumi.tv/person/'+ x, callback = self.parse_person)

            elif title =='中文名: ':
                item['name_chs'] =  response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/text()').extract()[0]

            elif title == '音乐: ':
                item['music_id'] =  [j.split('/')[-1] for j in response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/a/@href').extract() ]
                for x in item['music_id']:
                    yield scrapy.Request('http://bangumi.tv/person/'+ x, callback = self.parse_person)

            elif title == '动画制作: ':
                item['company_id'] = [j.split('/')[-1] for j in  response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/a/@href').extract()]
                for x in item['company_id']:
                    yield scrapy.Request('http://bangumi.tv/person/'+ x, callback = self.parse_person)

            elif title == '放送开始: ' or title == '上映年度: ':
                item['date'] = response.xpath('//*[@id="infobox"]/li['+str(i+1)+']/text()').extract()[0]
        yield(item)

    def parse_person(self, response):
        item = person()
        item['id'] = response.url.split('/')[-1]
        item['pic'] = response.xpath('//*[@id="columnCrtA"]/div[1]/div/a/img/@src').extract()
        if not len(item['pic']) == 0:
            item['pic'] = item['pic'][0]
        item['name'] = response.xpath('//*[@id="headerSubject"]/h1/a/text()').extract()[0]
        yield item
