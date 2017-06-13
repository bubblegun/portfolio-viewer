# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import urllib2

class SwissFundDataPipeline(object):
    def process_item(self, item, spider):
        
        #https://www.swissfunddata.ch/sfdpub/de/funds/excelData/74653
        id = 74653
        
        response = urllib2.urlopen('https://www.swissfunddata.ch/sfdpub/de/funds/excelData/%d' % id)
        for line in response:
            print line
        
        return item
