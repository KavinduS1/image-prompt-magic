import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import CustomizationPanel from '@/components/CustomizationPanel';
import PromptDisplay from '@/components/PromptDisplay';
import { toast } from 'sonner';

const Index = () => {
  const [image, setImage] = useState<File | null>(null);
  const [tone, setTone] = useState('creative');
  const [style, setStyle] = useState('detailed');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (file: File) => {
    setImage(file);
    toast.success('Image uploaded successfully!');
  };

  const generatePrompt = async () => {
    if (!image) {
      toast.error('Please upload an image first');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPrompt(
        "A stunning photograph capturing a moment of serenity, featuring soft natural lighting that creates a warm, inviting atmosphere. The composition draws the viewer's eye through the frame, while subtle details in the background add depth and context to the scene."
      );
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Image to Text Prompt Generator
          </h1>
          <p className="text-lg text-gray-600">
            Transform your images into detailed text prompts
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {image && (
            <>
              <CustomizationPanel
                tone={tone}
                setTone={setTone}
                style={style}
                setStyle={setStyle}
              />
              
              <div className="flex justify-center">
                <button
                  onClick={generatePrompt}
                  disabled={isLoading}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate Prompt'}
                </button>
              </div>
              
              <PromptDisplay
                prompt={prompt}
                onRegenerate={generatePrompt}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;