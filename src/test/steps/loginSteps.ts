import { Given, When, Then } from "@cucumber/cucumber";

Given("User click on the login link", async function () {
  console.log("User click on the login link");
});

Given("User enter the username as {string}", function (name) {
  console.log("User enter the username as {string}", name);
});

Given("User enter the password as {string}", function (password) {
  console.log("User enter the password as {string}", password);
});

When("User click on the login button", function () {
  console.log("User click on the login button");
});

Then('Login should be success', async function () {
  console.log('Login should be success')
});

When("Login should fail", function () {
  console.log("Login should fail");
});
