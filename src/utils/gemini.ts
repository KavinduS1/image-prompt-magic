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

    // Create a more detailed prompt template
    const promptPrefix = `Analyze this image and generate an ultra-detailed description for use in text-to-image AI models. Follow this structure:

1. Overall Scene: Begin with a comprehensive overview of the main subject and composition.

2. Art Style: Identify and describe the artistic style (e.g., photorealistic, digital art, illustration, abstract).

3. Mood and Atmosphere: Capture the emotional tone and ambiance of the image.

4. Lighting: Detail the lighting conditions, including:
   - Direction and quality of light
   - Color temperature
   - Shadows and highlights
   - Time of day effects

5. Colors: Specify the color palette and any notable color relationships.

6. Textures and Materials: Describe surface qualities and material properties.

7. Technical Details: Include camera perspective, depth of field, and any post-processing effects.

8. Small Details: Note any subtle elements that add to the image's character.

Use a ${tone} tone and ${style} style in your description. Make the description detailed enough for AI image generation while maintaining natural language flow.`;

    // Generate content
    const result = await model.generateContent([
      promptPrefix,
      {
        inlineData: {
          mimeType: imageFile.type,
          data: base64Data
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