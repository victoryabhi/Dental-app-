package com.saveetha.aipulpcapping.appium;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.AfterClass;
import org.junit.BeforeClass;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class BaseAppiumTest {
    protected static AndroidDriver driver;

    @BeforeClass
    public static void setUp() throws MalformedURLException {
        UiAutomator2Options options = new UiAutomator2Options()
                .setPlatformName("Android")
                .setAutomationName("UiAutomator2")
                .setDeviceName("Android Emulator")
                .setApp("C:/Ai Based Pulp Cap/app/build/outputs/apk/debug/app-debug.apk")
                .setAppPackage("com.saveetha.aipulpcapping")
                .setAppActivity(".MainActivity")
                .setNoReset(false);

        // Standard Appium Server URL
        URL url = new URL("http://127.0.0.1:4723");
        
        driver = new AndroidDriver(url, options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterClass
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
        // Finalize Excel Report
        ExcelReporter.generateReport("C:/Ai Based Pulp Cap/appium_tests/reports/Appium_EndToEnd_Report.xlsx");
    }
}
