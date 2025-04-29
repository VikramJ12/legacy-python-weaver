
import React from 'react';
import { Code, Sparkles } from 'lucide-react';

interface PythonifyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const PythonifyLogo: React.FC<PythonifyLogoProps> = ({ 
  size = 'md', 
  withText = true 
}) => {
  // Size variants
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12"
  };
  
  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <Code 
          className={`text-primary ${sizeClasses[size]} animate-pulse`} 
          strokeWidth={1.5} 
        />
        <Sparkles 
          className={`absolute -top-1 -right-1 text-amber-400 ${size === 'lg' ? 'h-5 w-5' : 'h-3 w-3'} animate-[spin_3s_linear_infinite]`}
        />
      </div>
      
      {withText && (
        <div className={`font-bold ${textSizes[size]} bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 text-transparent bg-clip-text`}>
          Pythonify
        </div>
      )}
    </div>
  );
};

export default PythonifyLogo;
