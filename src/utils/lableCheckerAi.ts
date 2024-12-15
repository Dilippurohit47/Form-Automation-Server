import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserInfoTypes } from "../puppeter/index.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API); // Use your API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type FieldMappingObject = {
  [key: string]: string | null;
};

export const fillFormFields = async (
  fieldMapping: FieldMappingObject,
  userData: UserInfoTypes
) => {
  const prompt = `
    Given the following form fields: 
    ${JSON.stringify(fieldMapping)}, 
    and the user data: ${JSON.stringify(userData)}, 
    return an object where the keys are the form fields, and the values are the data to fill in the form return only object and nothing else.
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error("Error in generating content:", error);
  }
};
