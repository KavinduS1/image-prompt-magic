import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCREazkaU03u39buUPXZj3KVALJF0aK6W8";
const MODEL = "gemini-1.5-pro-002";

export const genAI = new GoogleGenerativeAI(API_KEY);

export const generatePromptFromImage = async (imageData: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL });
    
    const prompt = "Generate a detailed, creative description of this image that could be used as a prompt.";
    
    const result = await model.generateContent([prompt, { inlineData: { data: imageData, mimeType: "image/jpeg" } }]);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw new Error('Failed to generate prompt from image');
  }
};