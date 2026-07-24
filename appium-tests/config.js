export const config = {
  // WebdriverIO Appium configuration details
  port: 4723,
  path: '/',
  capabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:appPackage': 'com.saveetha.aipulpcapping',
    'appium:appActivity': 'com.saveetha.aipulpcapping.MainActivity',
    'appium:noReset': false,
    'appium:newCommandTimeout': 240,
    'appium:ensureWebviewsHavePages': true
  }
};
