import { BasePage } from './base.page.js';

export class PatientPage extends BasePage {
  // Locators
  get addPatientBtn() { return '//android.widget.Button[@content-desc="Add Patient"]'; }
  get nameInput() { return '//android.widget.EditText[@hint="Patient Name"]'; }
  get ageInput() { return '//android.widget.EditText[@hint="Age"]'; }
  get historyInput() { return '//android.widget.EditText[@hint="Medical History"]'; }
  get saveBtn() { return '//android.widget.Button[@text="Save"]'; }
  get searchBar() { return '//android.widget.EditText[@hint="Search patients"]'; }

  async addPatient(name, age, history) {
    await this.click(this.addPatientBtn);
    await this.setValue(this.nameInput, name);
    await this.setValue(this.ageInput, age);
    await this.setValue(this.historyInput, history);
    await this.click(this.saveBtn);
  }

  async searchPatient(name) {
    await this.setValue(this.searchBar, name);
  }
}
