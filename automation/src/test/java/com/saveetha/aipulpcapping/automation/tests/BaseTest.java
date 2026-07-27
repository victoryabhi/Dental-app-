package com.saveetha.aipulpcapping.automation.tests;

import com.saveetha.aipulpcapping.automation.utils.DriverManager;
import com.saveetha.aipulpcapping.automation.utils.ExtentReportManager;
import com.aventstack.extentreports.ExtentTest;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

public class BaseTest {
    protected static ExtentTest test;

    @BeforeSuite
    public void setupSuite() {
        ExtentReportManager.getInstance();
    }

    @BeforeMethod
    public void setup() {
        DriverManager.getDriver();
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }

    @AfterSuite
    public void tearDownSuite() {
        ExtentReportManager.getInstance().flush();
    }
}
