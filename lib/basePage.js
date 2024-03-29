const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    this.quit = async function() {
        return await this.driver.quit();
    };

    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    this.findByCss = async function(css) {
        await this.driver.wait(until.elementLocated(By.css(css)), 15000, 'Looking for element');
        return await this.driver.findElement(By.css(css));
    }

    this.findByXpath = async function(xpath) {
        await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(xpath));
    }

    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };

    this.isPageUrlCorrect = async function(pageUrl){
        return await this.driver.wait(until.urlContains(pageUrl), 15000);
    }

    this.waitUntilVisible = async function(el){
        return await this.driver.wait(until.elementIsVisible(el), 15000);
    }

};

module.exports = Page;