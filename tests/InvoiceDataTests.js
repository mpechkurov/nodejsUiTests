const { By, until} = require('selenium-webdriver');
const { expect } = require('chai');
const Page = require('../lib/loginPage');

const loginPageUrl = 'https://www.car2go.com/auth/realms/c2gcustomer/protocol/openid-connect/auth?client_id=portal-client&redirect_uri=https%3A%2F%2Fwww.car2go.com%2FUS%2Fen%2Fmyaccount%2F&state=da2dc815-ba11-4af5-b625-4c093f257225&nonce=b7ac906c-35ad-45ee-a135-472c3f3b01bc&response_mode=fragment&response_type=code&scope=openid';

describe('Invoices functionality', ()=>{
    let driver;
    beforeEach(async function(){
        page = new Page();
        driver = page.driver;
        await page.visit(loginPageUrl);
    });

    afterEach (async () => {
        await page.quit();
    });

    it('user can select any month and get PDF invoice', async()=>{
        await page.loginWithCredentials('4338471', 'Aa123456');

        await driver.wait(until.elementLocated(By.css('.c2g-trips-invoices'))).click();
        await driver.wait(until.elementLocated(By.css('.selected-item')));
        const el = await driver.findElement(By.css('.custom-dropdown'));
        await driver.wait(until.elementIsVisible(el), 7000).click();
        await driver.findElement(By.xpath('.//*[@class="custom-dropdown"]/select/option[contains(@value, "2019-03")]')).click();
        const selectedOption = await driver.wait(until.elementLocated(By.css('.selected-item'))).getText();
        expect(selectedOption).to.be.equal('Mar 2019');
        // Then we can check PDF invoices. But I didn't find any invoice for any year.
    });

});