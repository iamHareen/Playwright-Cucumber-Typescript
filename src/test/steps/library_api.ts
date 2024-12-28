import { Given, When, Then } from "@cucumber/cucumber";
import { request, APIRequestContext, APIResponse, expect } from "@playwright/test";

let baseURL: string;
let requestContext: APIRequestContext;
let response: APIResponse;
let currentRole: string;

Given("the application is running at {string}", async (url: string) => {
  baseURL = url;
  requestContext = await request.newContext(); // Create a new Playwright request context
});

Given("I am logged in as {string}", async (role: string) => {
  currentRole = role;
});

When("I send a GET request to {string}", async (path: string) => {
  response = await requestContext.get(`${baseURL}${path}`, {
    headers: {
    //   "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${currentRole}:password`).toString("base64")}`,
    },
  });
});

Then("the response status code should be {int}", async (statusCode: number) => {
  console.log("Response Headers:", response.headers());
  console.log("Response Body:", await response.text());
  expect(response.status()).toBe(statusCode);
});

Then("the response should contain the list of books", async () => {
    const responseData = await response.json();
    expect(Array.isArray(responseData)).toBeTruthy();
    expect(responseData.length).toBeGreaterThanOrEqual(0);
  });





