import puppeteer from "puppeteer";

export const runPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set to false to see the browser
  const page = await browser.newPage();
  
  await page.goto("https://example.com/job-application-form", { waitUntil: "networkidle2" });

  // Fill out the form fields
  await page.type("#name", "John Doe"); // Assuming the name field has the id "name"    
  await page.type("#email", "johndoe@example.com"); // Assuming the email field has the id "email"
  await page.type("#message", "I am applying for the position..."); // Assuming the message field has the id "message"

  // Click the submit button (assuming the button has the id "submit")
  await page.click("#submit");

  // Wait for the form submission to complete (you may need to adjust this based on the form)
  await page.waitForNavigation();

  // Optionally, you can take a screenshot or save a PDF after the submission
  await page.screenshot({ path: "form-submission.png" });

  // Close the browser
  await browser.close();
};
