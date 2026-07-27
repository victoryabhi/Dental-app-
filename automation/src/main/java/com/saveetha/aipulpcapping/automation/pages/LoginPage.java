package com.saveetha.aipulpcapping.automation.pages;

import org.openqa.selenium.By;

public class LoginPage extends BasePage {
    private final By emailField = By.xpath("//*[@text='Email Address']/following-sibling::android.widget.EditText");
    private final By passwordField = By.xpath("//*[@text='Password']/following-sibling::android.widget.EditText");
    private final By signInButton = By.xpath("//android.widget.Button[@text='Sign In']");

    public void login(String email, String password) {
        type(emailField, email);
        type(passwordField, password);
        click(signInButton);
    }
}
