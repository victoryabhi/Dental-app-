package com.saveetha.aipulpcapping.appium;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AppiumEndToEndTest extends BaseAppiumTest {

    @Test
    public void testCompleteApplicationFlow() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        try {
            // 1. Splash Screen
            ExcelReporter.recordResult("Splash Screen Check", "Started", "Checking for Get Started button");
            WebElement getStartedBtn = wait.until(ExpectedConditions.presenceOfElementLocated(
                    By.xpath("//*[@text='Get Started']")
            ));
            getStartedBtn.click();
            ExcelReporter.recordResult("Splash Screen Check", "PASS", "Clicked Get Started button");

            // 2. Welcome Screen
            ExcelReporter.recordResult("Welcome Screen Check", "Started", "Waiting for Sign In text");
            wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@text='Sign In']")));
            ExcelReporter.recordResult("Welcome Screen Check", "PASS", "Reached Welcome Screen");

            // 3. Login Screen Flow
            ExcelReporter.recordResult("Login Flow", "Started", "Entering credentials");
            
            WebElement emailField = driver.findElement(By.xpath("//*[@text='Email Address']/following-sibling::android.widget.EditText"));
            emailField.sendKeys("doctor@saveetha.com");
            
            WebElement passwordField = driver.findElement(By.xpath("//*[@text='Password']/following-sibling::android.widget.EditText"));
            passwordField.sendKeys("password123");
            
            WebElement signInBtn = driver.findElement(By.xpath("//android.widget.Button[@text='Sign In']"));
            signInBtn.click();
            
            ExcelReporter.recordResult("Login Flow", "PASS", "Submitted credentials");

            // 4. Dashboard Validation
            ExcelReporter.recordResult("Dashboard Check", "Started", "Waiting for Dashboard view");
            wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@text='Recent Analyses']")));
            ExcelReporter.recordResult("Dashboard Check", "PASS", "Successfully reached Dashboard");

        } catch (Exception e) {
            ExcelReporter.recordResult("End-to-End Flow", "FAIL", "Error occurred: " + e.getMessage());
            throw e;
        }
    }
}
