export const config = {
  port: 4723,
  path: '/',
  capabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Emulator',
    'appium:appPackage': 'com.saveetha.aipulpcapping',
    'appium:appActivity': 'com.saveetha.aipulpcapping.MainActivity',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 300,
    'appium:ensureWebviewsHavePages': true,
    'appium:gpsEnabled': true
  }
};
