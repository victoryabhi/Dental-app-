import { By } from 'selenium-webdriver';

export class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  get emailInput() { return By.css('input[type="email"]'); }
  get passwordInput() { return By.css('input[type="password"]'); }
  get submitBtn() { return By.css('button[type="submit"]'); }

  async login(email, password) {
    const emailEl = await this.driver.findElement(this.emailInput);
    await emailEl.sendKeys(email);
    const passEl = await this.driver.findElement(this.passwordInput);
    await passEl.sendKeys(password);
    const submitEl = await this.driver.findElement(this.submitBtn);
    await submitEl.click();
  }
}
