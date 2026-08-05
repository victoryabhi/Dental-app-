package com.saveetha.aipulpcapping.automation.pages;

import org.openqa.selenium.By;

public class DashboardPage extends BasePage {
    private final By recentAnalysesText = By.xpath("//*[@text='Recent Analyses']");
    private final By addPatientButton = By.xpath("//*[@content-desc='Add']"); // Assuming there's an add button

    public boolean isDashboardLoaded() {
        return isDisplayed(recentAnalysesText);
    }
}
