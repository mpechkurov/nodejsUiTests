let Page = require('./basePage');

const baseUrl = 'https://www.car2go.com';
const myAccountPageUrl = baseUrl + '/US/en/myaccount/';
var userNameField = 'username';
var passwordField = 'password';
var loginButtonName = 'login';
var loginErrorMessagesId = 'loginErrorMessages';

let userNameData, passwordData, loginButton, errorMessage;

Page.prototype.findUserNameField = async function(){
    userNameData = await this.findByName(userNameField);
    const result = await this.driver.wait(async function(){
        const userNameDataFieldIsDisplayed = await userNameData.isDisplayed();
        const userNameDataPlaceHolder = await userNameData.getAttribute('placeholder');

        return {
            displayed : userNameDataFieldIsDisplayed,
            placeHolder : userNameDataPlaceHolder
        }
    }, 5000);
    return result;
};

Page.prototype.findPasswordField = async function(){
    passwordData = await this.findByName(passwordField);
    const result = await this.driver.wait(async function(){
        return {
            displayed : await passwordData.isDisplayed(), 
            placeHolder : await passwordData.getAttribute('placeholder')
        }
    }, 5000);
    return result;
};

Page.prototype.findLoginButton = async function(){
    loginButton = await this.findByName(loginButtonName);
    const result = await this.driver.wait(async function(){
        return {
            displayed : await loginButton.isDisplayed(),
            text : await loginButton.getText()
        }
    }, 5000);
    return result;
};

Page.prototype.getErrorMessageForEmptyNameAndPassword = async function(){
    await this.findByCss('.login-app-container');
    loginButton = await this.findByName(loginButtonName);
    loginButton.click();
    errorMessage = await this.findById(loginErrorMessagesId);
    return await this.driver.wait(async function(){
        return errorMessage.getText()
    }, 5000);
};

Page.prototype.loginWithCredentials = async function(user, password){
    userNameData = await this.findByName(userNameField);
    passwordData = await this.findByName(passwordField);
    await this.write(userNameData, user);
    await this.write(passwordData, password);
    loginButton = await this.findByName(loginButtonName);
    loginButton.click();
    return await this.isPageUrlCorrect(myAccountPageUrl);
};

module.exports = Page;
