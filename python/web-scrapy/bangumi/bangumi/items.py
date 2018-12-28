# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class BangumiItem(scrapy.Item):
    # define the fields for your item here like:
    id = scrapy.Field()
    name = scrapy.Field()
    name_chs= scrapy.Field()
    date = scrapy.Field()
    score= scrapy.Field()
    cover = scrapy.Field()
    tags = scrapy.Field()
    cv_id = scrapy.Field()
    storyboard_id = scrapy.Field()
    music_id = scrapy.Field()
    company_id = scrapy.Field()
    director_id = scrapy.Field()
    script_id = scrapy.Field()

class person(scrapy.Item):
    id = scrapy.Field()
    name = scrapy.Field()
    pic = scrapy.Field()
