package com.saveetha.aipulpcapping.automation.tests;

import com.saveetha.aipulpcapping.automation.pages.DashboardPage;
import com.saveetha.aipulpcapping.automation.pages.LoginPage;
import com.saveetha.aipulpcapping.automation.pages.SplashPage;
import com.saveetha.aipulpcapping.automation.pages.WelcomePage;
import com.saveetha.aipulpcapping.automation.utils.ExtentReportManager;
import org.testng.Assert;
import org.testng.annotations.Test;

public class E2EFlowTest extends BaseTest {

    @Test(priority = 1, description = "Verify Splash and Welcome Navigation")
    public void testSplashToWelcome() {
        test = ExtentReportManager.getInstance().createTest("TC_NAV_001 - Splash to Welcome");
        SplashPage splashPage = new SplashPage();
        Assert.assertTrue(splashPage.isSplashLoaded(), "Splash screen did not load");
        splashPage.clickGetStarted();
        test.pass("Navigated to Welcome screen");
    }

    @Test(priority = 2, description = "Verify Login Flow")
    public void testValidLogin() {
        test = ExtentReportManager.getInstance().createTest("TC_AUTH_001 - Valid Login");
        SplashPage splashPage = new SplashPage();
        splashPage.clickGetStarted();
        
        WelcomePage welcomePage = new WelcomePage();
        welcomePage.clickSignIn();
        
        LoginPage loginPage = new LoginPage();
        loginPage.login("doctor@saveetha.com", "password123");
        
        DashboardPage dashboardPage = new DashboardPage();
        Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Dashboard failed to load");
        test.pass("Successfully logged in and reached Dashboard");
    }
}
