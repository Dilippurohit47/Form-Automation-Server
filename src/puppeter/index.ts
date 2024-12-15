import { chromium } from "playwright";
import { fillFormFields } from "../utils/lableCheckerAi.js";
import { JsonArray } from "@prisma/client/runtime/library";

export type UserInfoTypes = JsonArray;

export const playWright = async (formUrl: string, userInfo: UserInfoTypes) => {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(formUrl, {
      waitUntil: "networkidle",
    });

    let fieldMapping: { [key: string]: any } = {};
    const inputFields = page.locator("input");
    const count: number = await inputFields.count();

    for (let i = 0; i < count; i++) {
      const input = inputFields.nth(i);
      const arialabel = await input.getAttribute("aria-label");
      if (!arialabel) {
        const name = await input.getAttribute("name");
        fieldMapping[name!] = name;
      } else {
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
      if (typeof value === "string") {
        const locator = await page
          .locator(`input[name="${input}"], input[aria-label="${input}"]`)
          .nth(0);
        if (await locator.isVisible()) {
          await page.fill(
            `input[name="${input}"], input[aria-label="${input}"]`,
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
