package com.saveetha.aipulpcapping.automation.pages;

import org.openqa.selenium.By;

public class WelcomePage extends BasePage {
    private final By signInButton = By.xpath("//*[@text='Sign In']");
    private final By registerButton = By.xpath("//*[@text='Create Account']");

    public void clickSignIn() {
        click(signInButton);
    }

    public void clickRegister() {
        click(registerButton);
    }
}
