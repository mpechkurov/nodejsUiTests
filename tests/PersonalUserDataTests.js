const {Builder, By, until} = require('selenium-webdriver');
const { expect, assert } = require('chai');

const loginPageUrl = 'https://www.car2go.com/auth/realms/c2gcustomer/protocol/openid-connect/auth?client_id=portal-client&redirect_uri=https%3A%2F%2Fwww.car2go.com%2FUS%2Fen%2Fmyaccount%2F&state=da2dc815-ba11-4af5-b625-4c093f257225&nonce=b7ac906c-35ad-45ee-a135-472c3f3b01bc&response_mode=fragment&response_type=code&scope=openid';


describe('Pesonal user data', ()=>{
    let driver;
    var currentDate;
    beforeEach(async function(){
        currentDate = new Date().getTime();
        driver = new Builder().forBrowser('chrome').build();
        await driver.get(loginPageUrl);
    });

    it('validate uset detail page personal information', async()=>{
        await driver.findElement(By.name('username')).sendKeys('4338471');
        await driver.findElement(By.name('password')).sendKeys('Aa123456');
        await driver.findElement(By.name('login')).click();
        await driver.wait(until.elementLocated(By.css('.c2g-my-details'))).click();
        await driver.wait(until.elementLocated(By.id('name-address')));

        const salutatationField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "salutation")]//span')).getText();
        expect(salutatationField).to.be.equal('Salutation');
        const salutatation = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "salutation")]//p')).getText();
        expect(salutatation).to.be.equal('Mr.');

        const firstNameField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "firstName")]//span')).getText();
        expect(firstNameField).to.be.equal('First name');
        const firstName = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "firstName")]//p')).getText();
        expect(firstName).to.be.equal('Nils');

        const lastNameField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "lastName")]//span')).getText();
        expect(lastNameField).to.be.equal('Last name');
        const lastName = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "lastName")]//p')).getText();
        expect(lastName).to.be.equal('Reißig');

        const birthPlaceField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "birthPlace")]//span')).getText();
        expect(birthPlaceField).to.be.equal('Birth place');
        const birthPlace = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "birthPlace")]//p')).getText();
        expect(birthPlace).to.contain('testBirthPlace');

        const languageField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "language")]//span')).getText();
        expect(languageField).to.be.equal('Language');
        const language = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "language")]//p')).getText();
        expect(language).to.be.equal('german');

        const emailField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "email")]//span')).getText();
        expect(emailField).to.be.equal('Email address');
        const email = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "email")]//p')).getText();
        expect(email).to.be.equal('nils.reissig+manuel@gmail.com');
    });

    it('check if user can change personal data for example bith date', async()=>{
        await driver.findElement(By.name('username')).sendKeys('4338471');
        await driver.findElement(By.name('password')).sendKeys('Aa123456');
        await driver.findElement(By.name('login')).click();
        await driver.wait(until.elementLocated(By.css('.c2g-my-details'))).click();

        await driver.wait(until.elementLocated(By.css('.c2g-mydetails-edit-personaldata'))).click();
        await driver.wait(until.elementLocated(By.css('.button--secondary')));

        await driver.findElement(By.id('birthPlace')).clear();
        await driver.findElement(By.id('birthPlace')).sendKeys('testBirthPlace'+currentDate);
        await driver.findElement(By.css('.button--primary')).click();
        await driver.wait(until.elementLocated(By.css('.c2g-mydetails-edit-personaldata')));

        const birthPlaceField = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "birthPlace")]//span')).getText();
        expect(birthPlaceField).to.be.equal('Birth place');
        const birthPlace = await driver.findElement(By.xpath('.//*[contains(@ng-hide, "birthPlace")]//p')).getText();
        expect(birthPlace).to.be.equal('testBirthPlace'+currentDate);
    });


    afterEach(function () { driver.quit(), 100});

});