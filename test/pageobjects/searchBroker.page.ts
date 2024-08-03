import {$, browser} from '@wdio/globals'
import BasePage from './basePage.ts';
import softAssert from "../utils/softAssert.ts";

class SearchBrokerPage extends BasePage {
    public open() {
        return super.open('broker?city=Sofia');
    }

    public get searchBrokerInput() {
        return $('#broker-keyword');
    }

    public get landLinePhoneNumber() {
        return $('.MuiGrid-container>.MuiGrid-item>.MuiPaper-root>.MuiCardContent-root>.MuiBox-root>.MuiCollapse-root>.MuiCollapse-wrapper>.MuiCollapse-wrapperInner>div:last-of-type>a:nth-of-type(1)');
    }

    public get mobilePhoneNumber() {
        return $('.MuiGrid-container>.MuiGrid-item>.MuiPaper-root>.MuiCardContent-root>.MuiBox-root>.MuiCollapse-root>.MuiCollapse-wrapper>.MuiCollapse-wrapperInner>div:last-of-type>a:nth-of-type(2)');
    }

    public get brokerNameCards() {
        return $$('.MuiGrid-container>.MuiGrid-item');
    }

    public async checkAllPropertiesDisplayed(elements: WebdriverIO.ElementArray) {
        const propertiesLocator = `//a[contains(text(), "properties")]`;
        const addressLocator = '//span[contains(text(), " / ")]';

        for (const element of elements) {
            const propertiesElement = await element.$(propertiesLocator);
            const isPropertiesElementDisplayed = await propertiesElement.isDisplayed();
            console.log('The broker has: ' + await propertiesElement.getText());

            const addressElement = await element.$(addressLocator);
            const isAddressElementDisplayed = await addressElement.isDisplayed();
            console.log('The broker address is: ' + await addressElement.getText());

            const landLinePhoneElement = await this.landLinePhoneNumber;
            const isLandLinePhoneElementDisplayed = await landLinePhoneElement.isDisplayed();
            console.log('Landline Phone number of broker is: ' + await landLinePhoneElement.getText());

            const mobilePhoneElement = await this.mobilePhoneNumber;
            await softAssert.assertElementPresent(mobilePhoneElement, 'Mobile phone number is missing in this broker');
            softAssert.verifyAll(true);

            if (!isPropertiesElementDisplayed && !isAddressElementDisplayed && !isLandLinePhoneElementDisplayed) {
                return false;
            }
        }

        return true;
    }

    public async searchBrokerByName(brokerName: string) {
        await this.searchBrokerInput.setValue(brokerName);
        await browser.keys('Enter');
        await browser.pause(1000);
        //The browser.pause is not ideal but the DOM is being rendered very slowly when searching in the ag-grid
        //and this was the only solution all other waitFor are not working here
    }

    public checkNameUniqueness(names: string[]): { name: string, isUnique: boolean }[] {
        const nameCount: { [key: string]: number } = {};
        names.forEach(name => {
            nameCount[name] = (nameCount[name] || 0) + 1;
        });

        return names.map(name => ({
            name,
            isUnique: nameCount[name] === 1
        }));
    }
}

export default new SearchBrokerPage();