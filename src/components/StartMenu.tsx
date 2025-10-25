import { AppType } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StartMenuProps {
  onOpenApp: (type: AppType, title: string) => void;
  onClose: () => void;
}

const StartMenu = ({ onOpenApp, onClose }: StartMenuProps) => {
  const apps = [
    { type: 'browser' as AppType, title: 'Microsoft Edge', icon: 'Globe', color: 'bg-blue-500' },
    { type: 'notepad' as AppType, title: 'Блокнот', icon: 'FileText', color: 'bg-yellow-500' },
    { type: 'settings' as AppType, title: 'Параметры', icon: 'Settings', color: 'bg-gray-500' },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[650px] z-50 backdrop-blur-2xl bg-card/95 rounded-2xl shadow-2xl border border-border/50 p-6 animate-scale-in">
        <Input 
          placeholder="Введите текст для поиска" 
          className="mb-6 h-12 text-base bg-background/50"
        />

        <div className="mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">Закреплено</h3>
          <div className="grid grid-cols-4 gap-3">
            {apps.map((app, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => onOpenApp(app.type, app.title)}
                className="h-24 flex flex-col gap-2 hover:bg-accent/50 rounded-xl transition-all duration-200"
              >
                <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={app.icon} size={24} className="text-white" />
                </div>
                <span className="text-xs text-center">{app.title}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">Рекомендуется</h3>
          <div className="space-y-2">
            {apps.slice(0, 3).map((app, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => onOpenApp(app.type, app.title)}
                className="w-full justify-start h-16 hover:bg-accent/50 rounded-xl transition-all duration-200"
              >
                <div className={`w-10 h-10 ${app.color} rounded-lg flex items-center justify-center mr-3`}>
                  <Icon name={app.icon} size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{app.title}</div>
                  <div className="text-xs text-muted-foreground">Недавно использовано</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-accent/50"
          >
            <Icon name="User" size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="w-12 h-12 rounded-xl hover:bg-accent/50"
          >
            <Icon name="Power" size={20} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
