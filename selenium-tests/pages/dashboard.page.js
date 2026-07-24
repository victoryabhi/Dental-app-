import { By } from 'selenium-webdriver';

export class DashboardPage {
  constructor(driver) {
    this.driver = driver;
  }

  get welcomeText() { return By.xpath('//*[contains(text(), "diagnostic summary")]'); }
  get addPatientLink() { return By.xpath('//*[contains(text(), "Add Patient")]'); }
  get nameInput() { return By.css('input[placeholder*="name"]'); }
  get ageInput() { return By.css('input[type="number"]'); }
  get phoneInput() { return By.css('input[type="tel"]'); }
  get savePatientBtn() { return By.xpath('//button[contains(text(), "Save") or contains(text(), "Add")]'); }

  async navigateToAddPatient() {
    const link = await this.driver.findElement(this.addPatientLink);
    await link.click();
  }

  async addPatient(name, age, phone) {
    const nameEl = await this.driver.findElement(this.nameInput);
    await nameEl.sendKeys(name);
    const ageEl = await this.driver.findElement(this.ageInput);
    await ageEl.sendKeys(age);
    const phoneEl = await this.driver.findElement(this.phoneInput);
    await phoneEl.sendKeys(phone);
    const saveEl = await this.driver.findElement(this.savePatientBtn);
    await saveEl.click();
  }
}
