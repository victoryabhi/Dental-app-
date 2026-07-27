package com.saveetha.aipulpcapping.automation.listeners;

import com.saveetha.aipulpcapping.automation.utils.DriverManager;
import com.saveetha.aipulpcapping.automation.utils.ExtentReportManager;
import com.saveetha.aipulpcapping.automation.utils.ExcelReportGenerator;
import com.aventstack.extentreports.Status;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TestListener implements ITestListener {
    private static List<ExcelReportGenerator.TestResult> excelResults = new ArrayList<>();

    @Override
    public void onTestSuccess(ITestResult result) {
        ExtentReportManager.getInstance().createTest(result.getName()).pass("Passed");
        recordExcel(result, "PASS");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String screenshotPath = takeScreenshot(result.getName());
        ExtentReportManager.getInstance().createTest(result.getName())
                .fail(result.getThrowable())
                .addScreenCaptureFromPath("../screenshots/" + result.getName() + ".png");
        recordExcel(result, "FAIL");
    }

    @Override
    public void onFinish(ITestContext context) {
        ExcelReportGenerator.generateReport("Automation_Test_Report.xlsx", excelResults);
    }

    private void recordExcel(ITestResult result, String status) {
        excelResults.add(new ExcelReportGenerator.TestResult(
                "TC_" + result.getName().hashCode(),
                "General",
                result.getName(),
                "High",
                status,
                (result.getEndMillis() - result.getStartMillis()) + "ms"
        ));
    }

    private String takeScreenshot(String name) {
        File srcFile = ((TakesScreenshot) DriverManager.getDriver()).getScreenshotAs(OutputType.FILE);
        String path = "screenshots/" + name + ".png";
        try {
            FileUtils.copyFile(srcFile, new File(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }
}
