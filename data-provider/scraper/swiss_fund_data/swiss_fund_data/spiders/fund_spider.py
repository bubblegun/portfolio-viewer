import re
import scrapy

from swiss_fund_data.items import SwissFundDataItem

class SwissFundDataSpider(scrapy.Spider):
    name = "SwissFundData"

    def __init__(self, isin=None, *args, **kwargs):
        super(SwissFundDataSpider, self).__init__(*args, **kwargs)
        self.isin   = isin
        self.url    = 'https://www.swissfunddata.ch/sfdpub/de/funds/overview?text=%s' % isin

    def start_requests(self):
        yield scrapy.Request(url=self.url, callback=self.parse, cookies={'sfdpub-disclaimer': 'private'})

    def parse(self, response):
        self.logger.info('Parse function called on %s', response.url)
        
        item            = SwissFundDataItem()
        item['isin']    = self.isin
        item['status']  = 'OK'

        try:
            url         = response.xpath('//div[@id="tab-1"]/table/tbody/tr/td[2]/a/@href').extract()[0]
            item['url'] = response.urljoin(url)

            self.logger.info('ISIN %s found' % self.isin)

            try:
                item['id']  = re.findall('/(\d+)', url)[0]
                self.logger.info('ID %s extracted' % item['id'])
            except IndexError:
                item['status'] = 'NOK'
                self.logger.info('Couldn\'t extract ID')

            yield item

        except IndexError:
            item['status'] = 'NOK'
            self.logger.info('ISIN %s not found' % self.isin)

            yield item
