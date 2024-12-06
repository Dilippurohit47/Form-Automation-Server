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

    const firstNameInput = page.locator('input[aria-label="Name"]');
    if (firstNameInput.isVisible()) {
      await firstNameInput.fill("Dilip");
    }
    const githubInput = page.locator('input[aria-label="Git-hub"]');
    if(githubInput.isVisible()){
      console.log(true)
    }
    if (await githubInput.isVisible()) {
      await githubInput.fill("Nice track");
    } 
   
 
    await page.fill('input[aria-label="Surname"]', "Purohit");
    await page.fill('input[aria-label="Email"]', "jhondoexample.com");
    // await page.getByRole("button", { name: "Submit" }).click();

    // await browser.close();
  } catch (error) {
    console.error("Error loading the page:", error);
  }
};
