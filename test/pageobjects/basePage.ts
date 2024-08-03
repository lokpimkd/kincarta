import {$, browser} from '@wdio/globals'

export default class BasePage {
    public open(path: string) {
        return browser.url(`https://www.yavlena.com/en/${path}`);
    }

    public async infiniteScroll() {
        let lastHeight: number = await browser.execute(() => document.body.scrollHeight);

        while (true) {
            await browser.keys('End');

            // Wait for new content to load
            await browser.pause(2000);
            let newHeight: number = await browser.execute(() => document.body.scrollHeight);

            if (newHeight === lastHeight) {
                break;
            }

            lastHeight = newHeight;
        }
    }

    public get brokerNamesList() {
        return $$('h6');
    }

    public getButtonByText(text: string) {
        const xpath = `//button[contains(text(), "${text}")]`;
        return $(xpath);
    }
}