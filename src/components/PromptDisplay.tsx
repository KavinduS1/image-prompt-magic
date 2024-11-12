import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface PromptDisplayProps {
  prompt: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

const PromptDisplay = ({ prompt, onRegenerate, isLoading }: PromptDisplayProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  if (!prompt && !isLoading) return null;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Generated Prompt</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={onRegenerate}
            className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
            title="Regenerate prompt"
            disabled={isLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{prompt}</p>
      )}
    </div>
  );
};

export default PromptDisplay;