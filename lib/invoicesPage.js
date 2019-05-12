let Page = require('./basePage');

let tripsAndInvoicesButton, dropDown, optionToSelect, selectedOption;

Page.prototype.selectInvoiceForDate = async function(yearMonth){
    tripsAndInvoicesButton = await this.findByCss('.c2g-trips-invoices');
    tripsAndInvoicesButton.click();
    await this.findByCss('.selected-item');
    dropDown = await this.findByCss('.custom-dropdown');
    await this.driver.wait(until.elementIsVisible(dropDown), 7000);
    dropDown.click()
    optionToSelect = await this.findByXpath('.//*[@class="custom-dropdown"]/select/option[contains(@value, "2019-03")]');
    optionToSelect.click();
    selectedOption = await this.findByCss('.selected-item');
    return await this.driver.wait(async function(){
        return selectedOption.getText();
    }, 5000);
};

module.exports = Page;