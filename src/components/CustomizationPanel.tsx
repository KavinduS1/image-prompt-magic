import React from 'react';
import { Settings2 } from 'lucide-react';

interface CustomizationPanelProps {
  tone: string;
  setTone: (tone: string) => void;
  style: string;
  setStyle: (style: string) => void;
}

const CustomizationPanel = ({
  tone,
  setTone,
  style,
  setStyle
}: CustomizationPanelProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-5 h-5 text-primary-500" />
        <h3 className="font-medium text-gray-900">Customize Prompt</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="creative">Creative</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="short">Short Prompt</option>
            <option value="detailed">Detailed Description</option>
            <option value="story">Story-like</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;