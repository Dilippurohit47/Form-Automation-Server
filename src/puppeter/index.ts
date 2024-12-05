import { chromium } from "playwright";

export const playWright = async () => {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://forms.fillout.com/t/7Sx7AHuiAous", {
      waitUntil: "networkidle",
    });
    console.log("Page loaded successfully");
    await page.getByRole("button", { name: "Start" }).click();
    await page.fill('input[aria-label="Name"]', "Dilip");
    await page.fill('input[aria-label="Surname"]', "purohit");
    await page.fill('input[aria-label="Email"]', "jhondoexample.com");
    await page.getByRole("button", { name: "Submit" }).click();

    await browser.close();
  } catch (error) {
    console.error("Error loading the page:", error);
  }
};
