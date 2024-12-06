import  { GoogleGenerativeAI } from '@google/generative-ai';  // Import the Gemini API

// Input Data (Your user data)


// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);  // Use your API key
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to generate a response to fill the form
export const fillFormFields = async (fieldMapping,userData) => {
  const prompt = `
    Given the following form fields: 
    ${JSON.stringify(fieldMapping)}, 
    and the user data: ${JSON.stringify(userData)}, 
    return an object where the keys are the form fields, and the values are the data to fill in the form return only object and nothing else.
  `;

  try {
    // Get response from Gemini AI
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();  // Get the text response
return responseText
    // Process the response if needed, e.g., parse and fill fields
  } catch (error) {
    console.error('Error in generating content:', error);
  }
};

