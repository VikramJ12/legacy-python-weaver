
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightCircle, Play, RefreshCw, Download } from 'lucide-react';

interface MigrationControlsProps {
  onMigrate: () => void;
}

const MigrationControls = ({ onMigrate }: MigrationControlsProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3 justify-between">
          <Button 
            onClick={onMigrate}
            className="flex items-center gap-2"
          >
            <ArrowRightCircle size={18} />
            <span>Migrate Code</span>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" title="Run code" className="dark:border-gray-700 dark:hover:bg-gray-700">
              <Play size={18} />
            </Button>
            <Button variant="outline" size="icon" title="Reset" className="dark:border-gray-700 dark:hover:bg-gray-700">
              <RefreshCw size={18} />
            </Button>
            <Button variant="outline" size="icon" title="Download Python code" className="dark:border-gray-700 dark:hover:bg-gray-700">
              <Download size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MigrationControls;
