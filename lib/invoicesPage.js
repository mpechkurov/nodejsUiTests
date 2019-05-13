let Page = require('./basePage');

const baseUrl = 'https://www.car2go.com';
const myAccountPageUrl = baseUrl + '/US/en/myaccount/';
var userNameField = 'username';
var passwordField = 'password';
var loginButtonName = 'login';
var tipsAndIvoicesButton = '.c2g-trips-invoices';
var selectedItemField = '.selected-item';
var dropDownMenu = '.custom-dropdown';

let tripsAndInvoicesButton, dropDown, optionToSelect, selectedOption;

//TO DO: reuse it from login page
Page.prototype.loginWithCredentials = async function(user, password){
    userNameData = await this.findByName(userNameField);
    passwordData = await this.findByName(passwordField);
    await this.write(userNameData, user);
    await this.write(passwordData, password);
    loginButton = await this.findByName(loginButtonName);
    loginButton.click();
    return await this.isPageUrlCorrect(myAccountPageUrl);
};

Page.prototype.selectInvoiceForDate = async function(yearMonth){
    tripsAndInvoicesButton = await this.findByCss(tipsAndIvoicesButton);
    tripsAndInvoicesButton.click();
    await this.findByCss(selectedItemField);
    dropDown = await this.findByCss(dropDownMenu);
    await this.waitUntilVisible(dropDown);
    dropDown.click()
    optionToSelect = await this.findByXpath('.//*[@class="custom-dropdown"]/select/option[contains(@value, "2019-03")]');
    optionToSelect.click();
    selectedOption = await this.findByCss(selectedItemField);
    return await this.driver.wait(async function(){
        return selectedOption.getText();
    }, 5000);
};

module.exports = Page;