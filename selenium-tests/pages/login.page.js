import { By, until } from 'selenium-webdriver';

export class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  get emailInput() { return By.css('input[type="email"]'); }
  get passwordInput() { return By.css('input[type="password"]'); }

  async login(email, password) {
    // 1. Navigate directly to the email input page if we are on splash/welcome screen
    const currentUrl = await this.driver.getCurrentUrl();
    if (!currentUrl.includes('email_input')) {
      await this.driver.get(currentUrl.endsWith('/') ? currentUrl + 'email_input' : currentUrl + '/email_input');
    }

    // 2. Wait for and enter email
    const emailEl = await this.driver.wait(until.elementLocated(this.emailInput), 5000);
    await emailEl.sendKeys(email);

    // 3. Locate Next button and click it
    const nextBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Next')]")), 5000);
    await nextBtn.click();

    // 4. Wait for and enter password (on the /password_input screen)
    const passEl = await this.driver.wait(until.elementLocated(this.passwordInput), 5000);
    await passEl.sendKeys(password);

    // 5. Locate Login button and click it
    const loginBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Login')]")), 5000);
    await loginBtn.click();

    // 6. Dismiss the "Save Password" dialog if it shows up
    try {
      const dismissBtn = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Not Now')]")), 3000);
      await dismissBtn.click();
    } catch (e) {
      // Modal didn't appear or was already handled/dismissed
    }
  }
}

