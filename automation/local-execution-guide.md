# Local Execution & Troubleshooting Guide

This guide details how to configure, run, and troubleshoot the Enterprise Appium E2E Automation Framework on your local machine.

---

## 1. Local Prerequisites

Make sure the following are installed:
- **Node.js** (v18 or higher)
- **Java Development Kit (JDK)** (v17 or higher)
- **Android SDK** (Command-line tools & Platform tools)
- **Appium** (`npm install -g appium`)
- **UIAutomator2 Driver** (`appium driver install uiautomator2`)

---

## 2. Running Tests Locally

1. **Compile your Android app** to produce the APK file:
   ```bash
   ./gradlew assembleDebug
   ```
2. **Start an Android Emulator** via Android Studio or command-line:
   ```bash
   emulator -avd <Your_AVD_Name>
   ```
3. **Start the Appium Server**:
   ```bash
   appium
   ```
4. **Navigate to the automation folder and install dependencies**:
   ```bash
   cd automation
   npm install
   ```
5. **Execute the automation test suite**:
   ```bash
   npm run test
   ```

After execution finishes, all reports will be saved in the `reports/` folder (including Excel files, HTML dashboards, and execution logs).

---

## 3. Troubleshooting & FAQs

### Error: `connect ECONNREFUSED 127.0.0.1:4723`
- **Cause**: The Appium server is not running or listening on the default port.
- **Solution**: Open a new terminal and run `appium`. Ensure it binds to port `4723`.

### Error: `Could not find a connected Android device`
- **Cause**: ADB (Android Debug Bridge) cannot detect any active device or emulator.
- **Solution**: Run `adb devices`. If the list is empty, start an emulator from Android Studio or enable USB debugging on your physical device.

### Error: `Appium driver UiAutomator2 not installed`
- **Cause**: Appium is running but lacks the Android automation driver.
- **Solution**: Install it by executing:
  ```bash
  appium driver install uiautomator2
  ```
