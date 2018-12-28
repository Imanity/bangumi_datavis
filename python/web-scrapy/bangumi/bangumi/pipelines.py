# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json
from bangumi.items import *
class BangumiPipeline(object):

    def open_spider(self, spider):
        self.file = open('bangumi.json', 'w')
        self.file2 = open('person.json', 'w')

    def close_spider(self, spider):
        self.file.close()
        self.file2.close()

    def process_item(self, item, spider):
        line = json.dumps(dict(item),ensure_ascii=False) + "\n"
        if isinstance(item, BangumiItem):
            self.file.write(line)
        else:
            self.file2.write(line)
        return item
