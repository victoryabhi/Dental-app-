package com.saveetha.aipulpcapping.automation.utils;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class DriverManager {
    private static ThreadLocal<AndroidDriver> driver = new ThreadLocal<>();

    public static AndroidDriver getDriver() {
        if (driver.get() == null) {
            try {
                initializeDriver();
            } catch (Exception e) {
                System.err.println("CRITICAL: Failed to initialize driver: " + e.getMessage());
            }
        }
        return driver.get();
    }

    private static void initializeDriver() throws MalformedURLException {
        String appPath = ConfigReader.getProperty("appPath");
        if (appPath == null) appPath = "app/build/outputs/apk/debug/app-debug.apk";
        
        java.io.File apkFile = new java.io.File(appPath);
        if (!apkFile.exists()) {
            String[] searchPaths = {
                "app/build/outputs/apk/debug/app-debug.apk",
                "../app/build/outputs/apk/debug/app-debug.apk",
                "../../app/build/outputs/apk/debug/app-debug.apk",
                "automation/app/build/outputs/apk/debug/app-debug.apk"
            };
            for (String path : searchPaths) {
                java.io.File f = new java.io.File(path);
                if (f.exists()) {
                    apkFile = f;
                    break;
                }
            }
        }

        System.out.println("Using APK for testing: " + apkFile.getAbsolutePath());

        UiAutomator2Options options = new UiAutomator2Options()
                .setPlatformName("Android")
                .setAutomationName("UiAutomator2")
                .setDeviceName("Android Emulator")
                .setApp(apkFile.getAbsolutePath())
                .setAppPackage("com.saveetha.aipulpcapping")
                .setAppActivity(".MainActivity")
                .setNoReset(false)
                .setEnforceAppInstall(true);

        String appiumUrl = ConfigReader.getProperty("appiumServerUrl");
        if (appiumUrl == null) appiumUrl = "http://127.0.0.1:4723";
        
        driver.set(new AndroidDriver(new URL(appiumUrl), options));
        driver.get().manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
    }

    public static void quitDriver() {
        if (driver.get() != null) {
            try {
                driver.get().quit();
            } catch (Exception ignored) {}
            driver.remove();
        }
    }
}
