import WindowFrame from '@/components/WindowFrame';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface SettingsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Settings = ({ onClose, onMinimize, onMaximize, isMaximized, theme, onToggleTheme }: SettingsProps) => {
  const settingsItems = [
    { icon: 'Wifi', title: 'Сеть и Интернет', desc: 'Wi-Fi, режим в самолёте, VPN' },
    { icon: 'Bluetooth', title: 'Bluetooth и устройства', desc: 'Принтеры, мышь, клавиатура' },
    { icon: 'Palette', title: 'Персонализация', desc: 'Фон, темы, цвета', special: true },
    { icon: 'Lock', title: 'Конфиденциальность и защита', desc: 'Разрешения приложений' },
    { icon: 'Monitor', title: 'Система', desc: 'Дисплей, звук, уведомления' },
  ];

  return (
    <WindowFrame
      title="Параметры"
      icon="Settings"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
    >
      <div className="h-full flex">
        <div className="w-64 border-r border-border bg-card/30 p-4">
          <div className="mb-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">Пользователь</div>
                <div className="text-xs text-muted-foreground">user@windows.com</div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-1">
            {settingsItems.map((item, index) => (
              <Button
                key={index}
                variant={item.special ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-3 px-3"
              >
                <Icon name={item.icon} size={18} className="mr-3 flex-shrink-0" />
                <span className="text-sm text-left">{item.title}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Персонализация</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Настройте внешний вид Windows в соответствии с вашими предпочтениями
            </p>

            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Режим цветов</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Выберите режим приложения по умолчанию
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => theme === 'dark' && onToggleTheme()}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === 'light' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-full h-24 bg-white rounded-lg mb-3 border border-gray-200" />
                    <div className="text-sm font-medium">Светлая</div>
                  </button>

                  <button
                    onClick={() => theme === 'light' && onToggleTheme()}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === 'dark' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-full h-24 bg-gray-800 rounded-lg mb-3" />
                    <div className="text-sm font-medium">Темная</div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">Автоматическая смена темы</div>
                    <div className="text-xs text-muted-foreground">Переключение по времени суток</div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Цвет фона</h2>
                <div className="grid grid-cols-6 gap-3">
                  {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500', 'bg-green-500'].map((color, i) => (
                    <button
                      key={i}
                      className={`w-12 h-12 ${color} rounded-lg hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Settings;
