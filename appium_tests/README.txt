--- APPIUM END-TO-END AUTOMATION ---

This folder contains the Appium test suite for the AI Based Pulp Capping app.

STRUCTURE:
- src/test/java/.../appium: Test scripts (Base class, E2E test, Excel Reporter).
- reports: Excel (.xlsx) reports are generated here after test completion.
- build.gradle.kts: Dependencies for Appium, Selenium, and Apache POI.

HOW TO RUN:
1. Start your Appium Server (v2.0+ recommended) on port 4723.
2. Ensure an Android Emulator or physical device is connected.
3. Build the APK of your app first (run ./gradlew assembleDebug).
4. Run these tests using:
   cd appium_tests
   gradle test

REPORTING:
After the test finishes, check the 'reports' folder for 'Appium_EndToEnd_Report.xlsx'.
This file contains the analysis of each step in the user journey.
