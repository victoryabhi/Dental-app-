package com.saveetha.aipulpcapping.automation.pages;

import org.openqa.selenium.By;

public class SplashPage extends BasePage {
    private final By getStartedButton = By.xpath("//*[@text='Get Started']");

    public boolean isSplashLoaded() {
        return isDisplayed(getStartedButton);
    }

    public void clickGetStarted() {
        click(getStartedButton);
    }
}
