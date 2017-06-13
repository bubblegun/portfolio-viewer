import scrapy

from swiss_fund_data.items import SwissFundDataItem

class SwissFundDataSpider(scrapy.Spider):
    name = "SwissFundData"
    
    isin = 'CH0111762537'
    #isin = 'CH0111XXXXX'
    
    #return value?

    #def __init__(self, isin=None, *args, **kwargs):
        #super(FundSpider, self).__init__(*args, **kwargs)
        #self.start_urls = ['https://www.swissfunddata.ch/sfdpub/de/funds/overview?text=%s' % isin]

    def start_requests(self):
        urls = [
            'https://www.swissfunddata.ch/sfdpub/de/funds/overview?text=%s' % self.isin
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, cookies={'sfdpub-disclaimer': 'private'})

    def parse(self, response):
        self.logger.info('Parse function called on %s', response.url)
        
        item            = SwissFundDataItem()
        
        try:
            url         = response.xpath('//div[@id="tab-1"]/table/tbody/tr/td[2]/a/@href').extract()[0]
            url         = response.urljoin(url)
            item['url'] =  url
            self.logger.info(url)
            
            yield item
            
        except IndexError:
            self.logger.info('ISIN %s not found' % self.isin)
