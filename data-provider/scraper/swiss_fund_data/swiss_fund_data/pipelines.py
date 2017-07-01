# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import urllib
import urllib2

class SwissFundDataPipeline(object):
    def process_item(self, item, spider):

        #TODO: Outsource Constants, urls etc.
        SWISSFUNDDATA_CSV_OFFSET    = 3
        SWISSFUNDDATA_CSV_URL       = 'https://www.swissfunddata.ch/sfdpub/de/funds/excelData/'
        CONSUMER_POST_URL           = 'http://localhost:3000/api/isin/'

        data = {}

        if item['status'] == 'NOK':
            print 'isin not found / id not extracted'
        else:
            response = urllib2.urlopen(SWISSFUNDDATA_CSV_URL + item['id'])
            for index, line in enumerate(response):
                if index > SWISSFUNDDATA_CSV_OFFSET:
                    fields = line.split(';')
                    data[fields[0]] = fields[2]

            data        = urllib.urlencode(data)
            req         = urllib2.Request(CONSUMER_POST_URL + item['isin'], data)
            response    = urllib2.urlopen(req)
            result      = response.read()
            print result
        return item
