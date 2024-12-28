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
  expect(response.status()).toBe(statusCode);
});

Then("the response should contain the list of books", async () => {
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy(); // Expect the response to be an array
  responseBody.forEach((book: any) => {
    expect(book).toHaveProperty("id");
    expect(book).toHaveProperty("title");
    expect(book).toHaveProperty("author");
  });
});
// -----------------------------------------------------------------------------------

When(
  "I send a POST request to {string} with the following payload:",
  async (path: string, payload: string) => {
    const parsedPayload = JSON.parse(payload); // Parse the payload from Gherkin
    response = await requestContext.post(`${baseURL}${path}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${currentRole}:password`).toString("base64")}`, // Use Basic Auth for this example
        "Content-Type": "application/json",
      },
      data: parsedPayload,
    });
  }
);


Then("the response body should {string}:", async (responseValidation: string, payload: string) => {
  const responseBody = await response.json();
  console.log(response);
  if (responseValidation.includes("contain the book details")) {
      const expectedDetails = JSON.parse(payload);
      expect(responseBody.title).toBe(expectedDetails.title);
      expect(responseBody.author).toBe(expectedDetails.author);
  } else if (responseValidation.includes("indicate a missing title error")) {
      expect(responseBody.error).toContain("title");
  } else if (responseValidation.includes("indicate a missing author error")) {
      expect(responseBody.error).toContain("author");
  }
   else if (responseValidation.includes("indicate invalid id error")) {
      expect(responseBody.error).toContain("id");
  }
  else {
      throw new Error(`Unknown response validation: ${responseValidation}`);
  }
});
