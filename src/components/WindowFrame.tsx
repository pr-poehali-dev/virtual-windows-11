import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WindowFrameProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  children: ReactNode;
  icon?: string;
}

const WindowFrame = ({ 
  title, 
  onClose, 
  onMinimize, 
  onMaximize, 
  isMaximized, 
  children,
  icon = 'Square'
}: WindowFrameProps) => {
  return (
    <div className="h-full w-full flex flex-col bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 backdrop-blur-xl">
      <div className="h-12 bg-card/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={16} className="text-primary" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="h-8 w-10 hover:bg-accent/50 rounded-md"
          >
            <Icon name="Minus" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMaximize}
            className="h-8 w-10 hover:bg-accent/50 rounded-md"
          >
            <Icon name={isMaximized ? "Minimize2" : "Square"} size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-10 hover:bg-destructive hover:text-destructive-foreground rounded-md"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-background">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
