const {Builder, By, until} = require('selenium-webdriver');
const { expect, assert } = require('chai');
const Page = require('../lib/mainPage');

const baseUrl = 'https://www.car2go.com';

describe('Main page login functionality ', () => {
    let driver, page;

    beforeEach(async function(){
        page = new Page();
        driver = page.driver;
        await page.visit(baseUrl);
    });

    afterEach (async () => {
        await page.quit();
    });

    it('validate login buton on main page', async()=>{
        const result = await page.findLoginButton();
        expect(result.buttonIsDisplayed).to.be.true;
        expect(result.buttonText).to.be.equal('Login');

        const result2 = await page.isClickOnLoginButtonRedirectToAuthPage();
        expect(result2, 'redirect to wrong page').to.be.true
    });

});
