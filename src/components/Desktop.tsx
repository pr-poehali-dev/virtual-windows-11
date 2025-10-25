import { AppType, WindowState } from '@/pages/Index';
import Icon from '@/components/ui/icon';

interface DesktopProps {
  windows: WindowState[];
  onOpenApp: (type: AppType, title: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  theme: 'light' | 'dark';
}

const Desktop = ({ onOpenApp }: DesktopProps) => {
  const desktopApps = [
    { type: 'explorer' as AppType, title: 'Проводник', icon: 'Folder' },
    { type: 'browser' as AppType, title: 'Браузер', icon: 'Globe' },
    { type: 'notepad' as AppType, title: 'Блокнот', icon: 'FileText' },
    { type: 'settings' as AppType, title: 'Параметры', icon: 'Settings' },
  ];

  return (
    <div className="flex-1 p-4 grid grid-cols-1 auto-rows-min gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, 100px)', gridAutoFlow: 'column' }}>
      {desktopApps.map((app, index) => (
        <button
          key={index}
          onDoubleClick={() => onOpenApp(app.type, app.title)}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon name={app.icon} size={28} className="text-primary" />
          </div>
          <span className="text-xs text-center text-foreground drop-shadow-lg">
            {app.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Desktop;