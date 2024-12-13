import { chromium } from "playwright";
import { fillFormFields } from "../utils/lableCheckerAi.js";

export const playWright = async (formUrl, userInfo) => {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(formUrl, {
      waitUntil: "networkidle",
    });

    let fieldMapping = {};
    const inputFields = page.locator("input");
    const count = await inputFields.count();

    for (let i = 0; i < count; i++) {
      const input = inputFields.nth(i);
      const arialabel = await input.getAttribute("aria-label");
      if (!arialabel) {
        const name = await input.getAttribute("name");
        fieldMapping[name] = name;
      }

      if (arialabel) {
        fieldMapping[arialabel] = input;
      }
    }

    const data = await fillFormFields(fieldMapping, userInfo);
    const startIndex = data.indexOf("{");
    const endIndex = data.lastIndexOf("}");
    let newInput;
    if (startIndex !== -1 && endIndex !== -1) {
      newInput = data.slice(startIndex, endIndex + 1);
    }
    const parsedData = JSON.parse(newInput);
    for (const [input, value] of Object.entries(parsedData)) {
      if (value) {
        const locator = await page
          .locator(`input[name="${input}"], input[aria-label="${input}"]`)
          .nth(0);
        if (await locator.isVisible()) {
          await page.fill(
            `input[name="${input}"] ,input[aria-label="${input}"] `,
            value
          );
        }
      }
    }
    const submitButton = page.getByText("Submit");
    const pageContent = await page.content();
    return pageContent;
    // await submitButton.click();
    // await browser.close();
  } catch (error) {
    console.error("Error filling the form:", error);
  }
};
