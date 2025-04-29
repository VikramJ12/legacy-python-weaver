
import React, { useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import hljs from 'highlight.js/lib/core';
import c from 'highlight.js/lib/languages/c';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/vs2015.css'; // Dark theme similar to VS Code

// Register the languages we need
hljs.registerLanguage('c', c);
hljs.registerLanguage('python', python);

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
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Apply syntax highlighting when code changes
    if (preRef.current) {
      preRef.current.innerHTML = hljs.highlight(code, { language }).value;
    }
  }, [code, language]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setCode) {
      setCode(e.target.value);
    }
  };

  // Show highlighted code for read-only mode or when not editing
  if (readOnly) {
    return (
      <div className="w-full relative transition-all duration-300" style={{ minHeight: height }}>
        <div className="absolute top-2 right-2 z-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
          {language}
        </div>
        <pre
          ref={preRef}
          className="font-mono text-sm w-full h-full p-4 whitespace-pre-wrap break-all overflow-auto rounded-md border border-input dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"
          style={{ 
            minHeight: height,
            resize: "vertical",
            lineHeight: 1.5,
            outline: "none",
            tabSize: 2,
          }}
        ></pre>
      </div>
    );
  }

  // For editable mode, use a textarea with a pre element overlay
  return (
    <div className="w-full relative transition-all duration-300" style={{ minHeight: height }}>
      <div className="absolute top-2 right-2 z-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded transition-colors duration-300">
        {language}
      </div>
      <Textarea
        value={code}
        onChange={handleChange}
        className="font-mono text-sm w-full h-full p-4 absolute top-0 left-0 z-0 bg-transparent dark:text-transparent caret-gray-900 dark:caret-white transition-colors duration-300"
        style={{ 
          minHeight: height,
          resize: "vertical",
          tabSize: 2,
          lineHeight: 1.5,
          color: "transparent",
          caretColor: "inherit"
        }}
        readOnly={readOnly}
      />
      <pre
        ref={preRef}
        aria-hidden="true"
        className="font-mono text-sm w-full h-full p-4 pointer-events-none whitespace-pre-wrap break-all overflow-auto rounded-md border border-input dark:bg-gray-900 transition-colors duration-300"
        style={{ 
          minHeight: height,
          resize: "vertical",
          lineHeight: 1.5,
          tabSize: 2,
        }}
      ></pre>
    </div>
  );
};

export default CodeEditor;
