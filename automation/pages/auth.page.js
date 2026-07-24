import { BasePage } from './base.page.js';

export class AuthPage extends BasePage {
  // Locators
  get emailInput() { return '//android.widget.EditText[@hint="Email"]'; }
  get passwordInput() { return '//android.widget.EditText[@hint="Password"]'; }
  get loginButton() { return '//android.widget.Button[@content-desc="Login"]'; }
  get submitBtn() { return '//android.widget.Button[@text="Sign In"]'; }
  get registerTab() { return '//android.widget.TextView[@text="Register"]'; }
  get fullNameInput() { return '//android.widget.EditText[@hint="Full Name"]'; }
  get clinicNameInput() { return '//android.widget.EditText[@hint="Clinic Name"]'; }

  async login(email, password) {
    await this.click(this.loginButton);
    await this.setValue(this.emailInput, email);
    await this.setValue(this.passwordInput, password);
    await this.click(this.submitBtn);
  }

  async register(name, email, password, clinic) {
    await this.click(this.loginButton);
    await this.click(this.registerTab);
    await this.setValue(this.fullNameInput, name);
    await this.setValue(this.emailInput, email);
    await this.setValue(this.passwordInput, password);
    await this.setValue(this.clinicNameInput, clinic);
    await this.click(this.submitBtn);
  }
}
