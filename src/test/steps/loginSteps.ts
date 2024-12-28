import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

Given("User navigates to the application", async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://bookcart.azurewebsites.net");
});

Given("User click on the login link", async function () {
  // await page.locator("//span[text()='Login']").click()
  await page
    .locator(
      "button[class='mat-mdc-tooltip-trigger mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary mat-mdc-button-base ng-star-inserted'] span[class='mdc-button__label']"
    )
    .click();
});

Given("User enter the username as {string}", async function (username) {
  await page.locator("input[formcontrolname='username']").fill(username);
});

Given("User enter the password as {string}", async function (password) {
  await page.locator("input[formcontrolname='password']").fill(password);
});

When("User click on the login button", async function () {
  await page
    .locator(
      "button[class='mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base'] span[class='mdc-button__label']"
    )
    .click();
});

Then("Login should be success", async function () {
  const text = await page
    .locator(
      "a[class='mat-mdc-menu-trigger mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-primary mat-mdc-button-base ng-star-inserted'] span[class='mdc-button__label'] span"
    )
    .textContent();
  console.log("Username: " + text);
  await browser.close();
});

When("Login should fail", async function () {
  const failureMessage = page.locator("mat-error[role='alert']").click();
  console.log(failureMessage);
  await browser.close();
});
