let Page = require('./basePage');

var loginButton = '.login';
const baseUrl = 'https://www.car2go.com';
const loginPageUrl = baseUrl + '/auth/realms/c2gcustomer/protocol/openid-connect/auth';

let loginButtonData;

Page.prototype.findLoginButton = async function(){
    loginButtonData = await this.findByCss(loginButton);
    const result = await this.driver.wait(async function(){
        const loginButtonIsDisplayed = await loginButtonData.isDisplayed();
        const loginButtonText = await loginButtonData.getText();
        return {
            buttonText : loginButtonText,
            buttonIsDisplayed : loginButtonIsDisplayed
        }
    }, 5000);
    return result;
};

Page.prototype.isClickOnLoginButtonRedirectToAuthPage = async function(){
    loginButtonData = await this.findByCss(loginButton);
    await loginButtonData.click();
    return await this.isPageUrlCorrect(loginPageUrl);
};

module.exports = Page;
