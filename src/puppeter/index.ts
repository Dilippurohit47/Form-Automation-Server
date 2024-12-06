import { chromium } from "playwright";
import { fillFormFields } from "../utils/lableCheckerAi.js";

export const playWright = async (formUrl, name, surname, email) => {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(formUrl, {
      waitUntil: "networkidle",
    });
    const userDetails = {
      "Full Name": "Dilip Purohit",
      "GitHub profile URL": "https://github.com/dilippurohit",
      "city" :"mumbai",
      "Email address": "dilip@example.com",
      LinkedInUrl: "fefe",
    };

    let fieldMapping = {};
    const inputFields = page.locator("input");
    console.log(inputFields);
    const count = await inputFields.count();
    for (let i = 0; i < count; i++) {
      const input = inputFields.nth(i);
      const arialabel = await input.getAttribute("aria-label");
      if (arialabel) {
        fieldMapping[arialabel] = input;
      }
    }

    const data = await fillFormFields(fieldMapping, userDetails);
    const startIndex = data.indexOf("{");
    const endIndex = data.lastIndexOf("}");

    let newInput;
    if (startIndex !== -1 && endIndex !== -1) {
      newInput = data.slice(startIndex, endIndex + 1); // Extract the content including {}
    }
    const parsedData = JSON.parse(newInput);
    for (const [input, value] of Object.entries(parsedData)) {
      console.log(input, value);

      if (value) {
        // await page.fill('input[aria-label="Surname"]', "Purohit");
        await page.fill(`input[aria-label="${input}"]`, value);
      } else {
        console.log("No value");
      }
    }

    // console.log("Form filled successfully!");
    // Optional: Submit the form if there's a submit button
    // await page.click('button[type="submit"]');
    // await browser.close();
  } catch (error) {
    console.error("Error filling the form:", error);
  }
};
