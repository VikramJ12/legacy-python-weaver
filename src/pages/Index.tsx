
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import CodeEditor from '@/components/CodeEditor';
import ASTViewer from '@/components/ASTViewer';
import MigrationControls from '@/components/MigrationControls';

const Index = () => {
  const [cCode, setCCode] = useState<string>('// Enter your C code here\n#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}');
  const [pythonCode, setPythonCode] = useState<string>('# Migrated Python code will appear here\n\ndef main():\n    print("Hello, world!")\n\nif __name__ == "__main__":\n    main()');
  const [activeTab, setActiveTab] = useState('editor');

  const handleMigrate = () => {
    // In a real app, this would call an API to perform the migration
    toast.success('Code migration initiated!');
    
    // For demo purposes, we're just simulating a migration
    setTimeout(() => {
      setPythonCode(`# Migrated from C code\n\ndef main():\n    print("Hello, world!")\n\nif __name__ == "__main__":\n    main()`);
      toast.success('Migration completed successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Legacy Code Migration Engine</CardTitle>
            <CardDescription>Migrate procedural C code to object-oriented Python</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel: Code editors */}
          <div className="lg:col-span-7">
            <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Code Editor</TabsTrigger>
                <TabsTrigger value="ast">AST Visualization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">C Code Input</CardTitle>
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
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Python Code Output</CardTitle>
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
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Abstract Syntax Tree (AST)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="border rounded-md h-[600px] bg-white">
                      <ASTViewer code={cCode} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right panel: Settings and controls */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Migration Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Migration Options</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="preserveComments" className="rounded" defaultChecked />
                        <label htmlFor="preserveComments">Preserve comments</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="generateDocs" className="rounded" defaultChecked />
                        <label htmlFor="generateDocs">Generate docstrings</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="useTyping" className="rounded" defaultChecked />
                        <label htmlFor="useTyping">Use Python type hints</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Python Version</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>Python 3.12</option>
                      <option>Python 3.11</option>
                      <option>Python 3.10</option>
                      <option>Python 3.9</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Code Style</h3>
                    <select className="w-full p-2 border rounded-md">
                      <option>PEP 8</option>
                      <option>Google Style</option>
                      <option>Black</option>
                    </select>
                  </div>
                  
                  <div>
                    <Button 
                      className="w-full"
                      onClick={handleMigrate}
                    >
                      Migrate Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Migration History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
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
