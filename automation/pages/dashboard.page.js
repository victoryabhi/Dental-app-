import { BasePage } from './base.page.js';

export class DashboardPage extends BasePage {
  // Locators
  get welcomeText() { return '//android.widget.TextView[contains(@text, "Welcome")]'; }
  get runAnalysisBtn() { return '//android.widget.Button[@text="Start AI Analysis"]'; }
  get notificationIcon() { return '//android.widget.ImageView[@content-desc="Notifications"]'; }

  async navigateToAnalysis() {
    await this.click(this.runAnalysisBtn);
  }

  async openNotifications() {
    await this.click(this.notificationIcon);
  }
}
