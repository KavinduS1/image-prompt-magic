import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCREazkaU03u39buUPXZj3KVALJF0aK6W8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

export const generatePromptFromImage = async (
  imageFile: File,
  tone: string,
  style: string
): Promise<string> => {
  try {
    // Convert File to base64 using FileReader
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Extract base64 data from the data URL
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    // Create prompt based on tone and style
    const promptPrefix = `Analyze this image and generate a detailed description. Use a ${tone} tone and ${style} style.`;

    // Generate content
    const result = await model.generateContent([
      promptPrefix,
      {
        inlineData: {
          mimeType: imageFile.type,
          data: base64
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw new Error('Failed to generate prompt from image');
  }
};