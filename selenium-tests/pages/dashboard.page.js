import { By } from 'selenium-webdriver';

export class DashboardPage {
  constructor(driver) {
    this.driver = driver;
  }

  get welcomeText() { return By.xpath('//*[contains(text(), "diagnostic summary")]'); }
  get addPatientLink() { return By.xpath('//*[contains(text(), "Add Patient")]'); }
  get idInput() { return By.xpath('//input[contains(@placeholder, "#")]'); }
  get nameInput() { return By.xpath('//input[contains(@placeholder, "name")]'); }
  get dobInput() { return By.xpath('//input[@type="date"]'); }
  get phoneInput() { return By.xpath('//input[contains(@placeholder, "555") or contains(@placeholder, "0000")]'); }
  get savePatientBtn() { return By.xpath('//button[contains(text(), "Save")]'); }

  async navigateToAddPatient() {
    const link = await this.driver.findElement(this.addPatientLink);
    await link.click();
  }

  async addPatient(id, name, dob, phone) {
    const idEl = await this.driver.findElement(this.idInput);
    await idEl.sendKeys(id);
    const nameEl = await this.driver.findElement(this.nameInput);
    await nameEl.sendKeys(name);
    const dobEl = await this.driver.findElement(this.dobInput);
    await dobEl.sendKeys(dob);
    const phoneEl = await this.driver.findElement(this.phoneInput);
    await phoneEl.sendKeys(phone);
    const saveEl = await this.driver.findElement(this.savePatientBtn);
    await saveEl.click();
  }
}

