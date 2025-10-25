import { WindowState } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface TaskbarProps {
  onToggleStart: () => void;
  windows: WindowState[];
  onRestoreWindow: (id: string) => void;
  theme: 'light' | 'dark';
  onToggleVolume: () => void;
  onToggleNetwork: () => void;
}

const Taskbar = ({ onToggleStart, windows, onRestoreWindow, onToggleVolume, onToggleNetwork }: TaskbarProps) => {
  const getAppIcon = (type: string) => {
    switch(type) {
      case 'browser': return 'Globe';
      case 'notepad': return 'FileText';
      case 'settings': return 'Settings';
      case 'explorer': return 'Folder';
      default: return 'Square';
    }
  };

  return (
    <div className="h-16 backdrop-blur-xl bg-[hsl(var(--win-blur))] border-t border-border/50 flex items-center justify-center px-2 shadow-lg">
      <div className="flex items-center gap-1">
        <Button
          onClick={onToggleStart}
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-lg hover:bg-accent/50 transition-all duration-200"
        >
          <Icon name="Grid3x3" size={20} className="text-primary" />
        </Button>

        <div className="h-8 w-px bg-border mx-1" />

        {windows.map(window => (
          <Button
            key={window.id}
            onClick={() => onRestoreWindow(window.id)}
            variant="ghost"
            className={`h-12 px-4 rounded-lg hover:bg-accent/50 transition-all duration-200 ${
              !window.isMinimized ? 'bg-accent/30' : ''
            }`}
          >
            <Icon name={getAppIcon(window.type || '')} size={18} />
            <span className="ml-2 text-sm max-w-[150px] truncate">{window.title}</span>
          </Button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2 px-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onToggleNetwork}
        >
          <Icon name="Wifi" size={16} className="text-foreground" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onToggleVolume}
        >
          <Icon name="Volume2" size={16} className="text-foreground" />
        </Button>
        <Icon name="Battery" size={16} className="text-foreground" />
        <div className="text-xs text-foreground ml-2">
          {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;