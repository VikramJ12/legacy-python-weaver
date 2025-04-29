
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  code: string;
  setCode?: (code: string) => void;
  language: string;
  height?: string;
  readOnly?: boolean;
}

const CodeEditor = ({ 
  code, 
  setCode, 
  language, 
  height = "300px",
  readOnly = false
}: CodeEditorProps) => {
  return (
    <div className="w-full relative" style={{ minHeight: height }}>
      <div className="absolute top-2 right-2 z-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
        {language}
      </div>
      <Textarea
        value={code}
        onChange={(e) => setCode && setCode(e.target.value)}
        className="font-mono text-sm w-full h-full p-4 dark:bg-gray-900 dark:text-gray-100"
        style={{ 
          minHeight: height,
          resize: "vertical",
          tabSize: 2,
          lineHeight: 1.5
        }}
        readOnly={readOnly}
      />
    </div>
  );
};

export default CodeEditor;
