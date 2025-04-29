import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import CodeEditor from '@/components/CodeEditor';
import ASTViewer from '@/components/ASTViewer';
import MigrationControls from '@/components/MigrationControls';
import { ThemeToggle } from '@/components/ThemeToggle';
import PythonifyLogo from '@/components/PythonifyLogo';
import { RocketIcon, Zap, Code } from 'lucide-react';

const Index = () => {
  const [cCode, setCCode] = useState<string>('// Enter your C code here\n#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}');
  const [pythonCode, setPythonCode] = useState<string>('# Migrated Python code will appear here\n\ndef main():\n    print("Hello, world!")\n\nif __name__ == "__main__":\n    main()');
  const [activeTab, setActiveTab] = useState('editor');
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animation trigger after initial render
    setIsLoaded(true);
  }, []);

  const handleMigrate = () => {
    toast.success('Code migration initiated!');
    
    // For demo purposes, we're just simulating a migration with loading states
    setTimeout(() => {
      setMigrationComplete(true);
      setPythonCode(`# Migrated from C code\n\ndef main():\n    print("Hello, world!")\n\nif __name__ == "__main__":\n    main()`);
      toast.success('Migration completed successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Card className={`mb-6 overflow-hidden ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center gap-4">
              <div className="transition-all duration-500 hover:scale-110">
                <PythonifyLogo size="lg" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl">Legacy Code Migration Engine</CardTitle>
                <CardDescription>Migrate procedural C code to object-oriented Python</CardDescription>
              </div>
            </div>
            <ThemeToggle />
          </CardHeader>
        </Card>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${isLoaded ? 'animate-[fade-in_0.8s_ease-out_0.3s_backwards]' : 'opacity-0'}`}>
          {/* Left panel: Code editors */}
          <div className="lg:col-span-7">
            <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="editor" className="transition-transform active:scale-95">Code Editor</TabsTrigger>
                <TabsTrigger value="ast" className="transition-transform active:scale-95">AST Visualization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="space-y-4">
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-500" />
                      C Code Input
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeEditor 
                      code={cCode} 
                      setCode={setCCode} 
                      language="c" 
                      height="300px" 
                    />
                  </CardContent>
                </Card>
                
                <Card className={`transition-all duration-300 ${migrationComplete ? 'ring-2 ring-green-500/30' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className={`h-5 w-5 text-emerald-500 ${migrationComplete ? 'animate-pulse' : ''}`} />
                      Python Code Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeEditor 
                      code={pythonCode} 
                      setCode={setPythonCode} 
                      language="python" 
                      height="300px" 
                      readOnly={true}
                    />
                  </CardContent>
                </Card>
                
                <MigrationControls onMigrate={handleMigrate} />
              </TabsContent>
              
              <TabsContent value="ast">
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <RocketIcon className="h-5 w-5 text-purple-500" />
                      Abstract Syntax Tree (AST)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="border rounded-md h-[600px] bg-white dark:bg-gray-800 transition-colors duration-300">
                      <ASTViewer code={cCode} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right panel: Settings and controls */}
          <div className="lg:col-span-5">
            <Card className={`transition-all duration-300 hover:shadow-md ${isLoaded ? 'animate-[fade-in_1s_ease-out_0.5s_backwards]' : 'opacity-0'}`}>
              <CardHeader>
                <CardTitle className="text-lg">Migration Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Migration Options</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md">
                        <input type="checkbox" id="preserveComments" className="rounded dark:bg-gray-800" defaultChecked />
                        <label htmlFor="preserveComments">Preserve comments</label>
                      </div>
                      <div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md">
                        <input type="checkbox" id="generateDocs" className="rounded dark:bg-gray-800" defaultChecked />
                        <label htmlFor="generateDocs">Generate docstrings</label>
                      </div>
                      <div className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md">
                        <input type="checkbox" id="useTyping" className="rounded dark:bg-gray-800" defaultChecked />
                        <label htmlFor="useTyping">Use Python type hints</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Python Version</h3>
                    <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-700">
                      <option>Python 3.12</option>
                      <option>Python 3.11</option>
                      <option>Python 3.10</option>
                      <option>Python 3.9</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Code Style</h3>
                    <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-700">
                      <option>PEP 8</option>
                      <option>Google Style</option>
                      <option>Black</option>
                    </select>
                  </div>
                  
                  <div>
                    <Button 
                      className="w-full group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
                      onClick={handleMigrate}
                    >
                      <RocketIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Migrate Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`mt-6 ${isLoaded ? 'animate-[fade-in_1.2s_ease-out_0.7s_backwards]' : 'opacity-0'}`}>
              <CardHeader>
                <CardTitle className="text-lg">Migration History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm dark:text-gray-300">
                  No previous migrations found.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
