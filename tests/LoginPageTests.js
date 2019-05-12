const { describe, it, afterEach, beforeEach } = require('mocha');
const Page = require('../lib/loginPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

const baseUrl = 'https://www.car2go.com';
const loginPageUrl = 'https://www.car2go.com/auth/realms/c2gcustomer/protocol/openid-connect/auth?client_id=portal-client&redirect_uri=https%3A%2F%2Fwww.car2go.com%2FUS%2Fen%2Fmyaccount%2F&state=da2dc815-ba11-4af5-b625-4c093f257225&nonce=b7ac906c-35ad-45ee-a135-472c3f3b01bc&response_mode=fragment&response_type=code&scope=openid';
const errorMessageText = 'Please enter your car2go e-mail address and your car2go password to log in to your car2go account.';


(async function testSuite(){
    try {
        describe('Login functionality ', () => {
            let driver, page;
        
            beforeEach(async function(){
                page = new Page();
                driver = page.driver;
                await page.visit(loginPageUrl);
            });
        
            afterEach (async () => {
                await page.quit();
            });
        
            it('validate login page elements', async()=>{
                const loginField = await page.findUserNameField();
                expect(loginField.displayed).to.be.true;
                expect(loginField.placeHolder).to.be.equal('Email address');
        
                const passwordField = await page.findPasswordField();
                expect(passwordField.displayed).to.be.true;
                expect(passwordField.placeHolder).to.be.equal('Password');
        
                const loginButton = await page.findLoginButton();
                expect(loginButton.displayed).to.be.true;
                expect(loginButton.text).to.be.equal('LOGIN');
            });
        
            it('validaete error message for wrong password ', async()=> {
                const erroMessage = await page.getErrorMessageForEmptyNameAndPassword();
                expect(erroMessage).to.contain(errorMessageText);
            });
        
            it('successful login with correct credentials', async ()=>{
                const redirectToCorrectpage = await page.loginWithCredentials('4338471', 'Aa123456');
                expect(redirectToCorrectpage).to.be.true
            });

        });        
    } catch (ex) {
        console.log(new Error(ex.message));
    }
})();


