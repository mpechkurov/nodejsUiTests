const {Builder, By, until} = require('selenium-webdriver');
const { expect, assert } = require('chai');
const Page = require('../lib/userDataPage');

const loginPageUrl = 'https://www.car2go.com/auth/realms/c2gcustomer/protocol/openid-connect/auth?client_id=portal-client&redirect_uri=https%3A%2F%2Fwww.car2go.com%2FUS%2Fen%2Fmyaccount%2F&state=da2dc815-ba11-4af5-b625-4c093f257225&nonce=b7ac906c-35ad-45ee-a135-472c3f3b01bc&response_mode=fragment&response_type=code&scope=openid';


describe('Pesonal user data', ()=>{
    let driver;
    var currentDate;

    beforeEach(async function(){
        currentDate = new Date().getTime();
        page = new Page();
        driver = page.driver;
        await page.visit(loginPageUrl);
    });

    afterEach (async () => {
        await page.quit();
    });

    it('validate uset detail page personal information', async()=>{
        await page.loginWithCredentials('4338471', 'Aa123456');
        await page.openMyDetailsPage();
        
        const salutatationField = await page.getFieldByAttributeName('salutation');
        expect(salutatationField.fieldTitle).to.be.equal('Salutation');
        expect(salutatationField.fieldValue).to.be.equal('Mr.');

        const firstNameField = await page.getFieldByAttributeName('firstName');
        expect(firstNameField.fieldTitle).to.be.equal('First name');
        expect(firstNameField.fieldValue).to.be.equal('Nils');

        const lastNameField = await page.getFieldByAttributeName('lastName');
        expect(lastNameField.fieldTitle).to.be.equal('Last name');
        expect(lastNameField.fieldValue).to.be.equal('Reißig');

        const birthPlaceField = await page.getFieldByAttributeName('birthPlace');
        expect(birthPlaceField.fieldTitle).to.be.equal('Birth place');
        expect(birthPlaceField.fieldValue).to.contain('testBirthPlace');

        const languageField = await page.getFieldByAttributeName('language');
        expect(languageField.fieldTitle).to.be.equal('Language');
        expect(languageField.fieldValue).to.be.equal('german');

        const emailField = await page.getFieldByAttributeName('email');
        expect(emailField.fieldTitle).to.be.equal('Email address');
        expect(emailField.fieldValue).to.be.equal('nils.reissig+manuel@gmail.com');
    });

    it('check if user can change personal data for example bith date', async()=>{
        await page.loginWithCredentials('4338471', 'Aa123456');
        await page.openMyDetailsPage();
        await page.openEditForm();
        await page.changeFieldById('birthPlace', 'testBirthPlace'+currentDate);

        const birthPlaceField = await page.getFieldByAttributeName('birthPlace');
        expect(birthPlaceField.fieldTitle).to.be.equal('Birth place');
        expect(birthPlaceField.fieldValue).to.be.equal('testBirthPlace'+currentDate);        

    });
});
