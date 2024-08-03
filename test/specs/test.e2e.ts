import {browser, expect} from '@wdio/globals'
import searchBrokerPage from "../pageobjects/searchBroker.page.ts";

describe('Yavlena broker page', () => {

    before(async () => {
            await searchBrokerPage.open();
            await browser.maximizeWindow();
            await searchBrokerPage.infiniteScroll();
        }
    )

    it('Should search each broker and check if all required details are present', async () => {
        let numberOfResults = null;
        const brokerList = await searchBrokerPage.brokerNamesList;
        const newList = searchBrokerPage.checkNameUniqueness(await searchBrokerPage.brokerNamesList.map(elem => elem.getText()));
        console.log('List of all brokers:\n' + newList);

        for (let i = 0; i < brokerList.length; i++) {
            await searchBrokerPage.searchBrokerByName(newList[i].name);
            console.log('Searching name: ' + newList[i].name);

            numberOfResults = await searchBrokerPage.brokerNameCards.length;
            await searchBrokerPage.getButtonByText('Details').click();

            //This is implemented because there are rare occurrences where there are more than one brokers
            //with same Name and Surname
            if (!newList[i].isUnique) {
                await expect(numberOfResults).toBeGreaterThan(1);
            } else {
                await expect(numberOfResults).toEqual(1);
            }

            const allPropertiesDisplayed = await searchBrokerPage.checkAllPropertiesDisplayed(await searchBrokerPage.brokerNameCards);
            await expect(allPropertiesDisplayed).toBe(true);

            await searchBrokerPage.getButtonByText('Clear').click();
            await browser.pause(1000);
            //The browser.pause is not ideal but the DOM is being updated very slowly when clearing the search results
            //and this was the only solution all other waitFor are not working here, increment if still failing
        }
    })
})