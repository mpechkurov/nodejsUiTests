let Page = require('./basePage');

const baseUrl = 'https://www.car2go.com';
const myAccountPageUrl = baseUrl + '/US/en/myaccount/';
var userNameField = 'username';
var passwordField = 'password';
var loginButtonName = 'login';
var editButtonLocator = '.c2g-mydetails-edit-personaldata';
var saveButtonLocator = '.button--primary';
var saveButtonOnEditFormLocator = '.when-is-unlocked';
var myDetailsButton = '.c2g-my-details';
var nameAddresCardLocator = 'name-address';

Page.prototype.loginWithCredentials = async function(user, password){
    userNameData = await this.findByName(userNameField);
    passwordData = await this.findByName(passwordField);
    await this.write(userNameData, user);
    await this.write(passwordData, password);
    loginButton = await this.findByName(loginButtonName);
    loginButton.click();
    return await this.isPageUrlCorrect(myAccountPageUrl);
};

Page.prototype.openMyDetailsPage = async function(){
    myDetailButton = await this.findByCss(myDetailsButton);
    myDetailButton.click();
    return await this.findById(nameAddresCardLocator);
};

Page.prototype.getFieldByAttributeName = async function(attribute){
    fieldName = await this.findByXpath(`.//*[contains(@ng-hide, "${attribute}")]//span`);
    field = await this.findByXpath(`.//*[contains(@ng-hide, "${attribute}")]//p`);
    const result = await this.driver.wait(async function(){
        return {
            fieldTitle : await fieldName.getText(),
            fieldValue : await field.getText()
        }
    }, 5000);
    return result;
};

Page.prototype.openEditForm = async function(){
    editMyProfileButton = await this.findByCss(editButtonLocator);
    editMyProfileButton.click();
    return await this.findByCss(saveButtonOnEditFormLocator);
};

Page.prototype.changeFieldById = async function(fieldId, inputValue){
    field = await this.findById(fieldId);
    field.clear();
    field.sendKeys(inputValue);
    saveButton = await this.findByCss(saveButtonLocator);
    saveButton.click();
    return await this.findByCss(editButtonLocator);
};

module.exports = Page;