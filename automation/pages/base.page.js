export class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async findElement(selector) {
    return await this.driver.$(selector);
  }

  async click(selector) {
    const el = await this.findElement(selector);
    await el.waitForDisplayed({ timeout: 5000 });
    await el.click();
  }

  async setValue(selector, value) {
    const el = await this.findElement(selector);
    await el.waitForDisplayed({ timeout: 5000 });
    await el.setValue(value);
  }

  async getText(selector) {
    const el = await this.findElement(selector);
    await el.waitForDisplayed({ timeout: 5000 });
    return await el.getText();
  }

  async isDisplayed(selector) {
    try {
      const el = await this.findElement(selector);
      return await el.isDisplayed();
    } catch (e) {
      return false;
    }
  }
}
