package com.saveetha.aipulpcapping.automation.utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

public class ExtentReportManager {
    private static ExtentReports extent;

    public static ExtentReports getInstance() {
        if (extent == null) {
            String reportPath = "reports/execution-report.html";
            if (!new java.io.File("reports").exists() && new java.io.File("automation/reports").exists()) {
                reportPath = "automation/reports/execution-report.html";
            } else if (!new java.io.File("reports").exists()) {
                new java.io.File("reports").mkdirs();
            }

            ExtentSparkReporter spark = new ExtentSparkReporter(reportPath);
            spark.config().setTheme(Theme.STANDARD);
            spark.config().setDocumentTitle("Android E2E Automation Report");
            spark.config().setReportName("Pulp Capping App Test Results");

            extent = new ExtentReports();
            extent.attachReporter(spark);
            extent.setSystemInfo("Platform", "Android");
            extent.setSystemInfo("Framework", "Appium + TestNG");
        }
        return extent;
    }
}
