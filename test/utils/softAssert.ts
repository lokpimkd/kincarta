class SoftAssert {
    private errors: string[] = [];

    public assert(condition: boolean, message: string) {
        if (!condition) {
            this.errors.push(message);
        }
    }

    public async assertElementPresent(selector: WebdriverIO.Element, message: string) {
        try {
            const element = await $(selector);
            const isPresent = await element.isExisting();
            this.assert(isPresent, message);
            console.log('Mobile phone of broker is: ' + await element.getText());
        } catch (error) {
            this.errors.push(`Error checking element presence for element, "${message}"`);
        }
    }

    public verifyAll(logOnly = false) {
        if (this.errors.length > 0) {
            const errorMessage = `Soft assert failures:\n${this.errors.join('\n')}`;
            if (logOnly) {
                console.log(errorMessage);
                this.errors = []
            } else {
                throw new Error(errorMessage);
            }
        }
    }

}

export default new SoftAssert();