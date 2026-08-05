# Local Execution Guide - Appium E2E

### Prerequisites
1. **Node.js & Appium**: Install via `npm install -g appium`.
2. **Appium Driver**: Install via `appium driver install uiautomator2`.
3. **Android Studio**: Ensure `ANDROID_HOME` is set.
4. **Java 17**: Ensure `JAVA_HOME` is set.

### Steps to Run Locally
1. **Start Emulator**: Launch an Android emulator from Android Studio.
2. **Build APK**: Run `./gradlew :app:assembleDebug` from the project root.
3. **Start Appium**: Run `appium` in a separate terminal.
4. **Execute Tests**:
   ```bash
   cd automation
   gradle test
   ```

### Reports
- HTML Report: `automation/reports/execution-report.html`
- Excel Report: `automation/reports/Automation_Test_Report.xlsx`
- Screenshots: `automation/screenshots/`
