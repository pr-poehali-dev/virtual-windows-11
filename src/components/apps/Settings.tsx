import { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

type SettingsSection = 'personalization' | 'system' | 'network' | 'bluetooth' | 'privacy';

const Settings = ({ onClose, onMinimize, onMaximize, isMaximized, theme, onToggleTheme }: SettingsProps) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('personalization');

  const settingsItems = [
    { id: 'network' as SettingsSection, icon: 'Wifi', title: 'Сеть и Интернет', desc: 'Wi-Fi, режим в самолёте, VPN' },
    { id: 'bluetooth' as SettingsSection, icon: 'Bluetooth', title: 'Bluetooth и устройства', desc: 'Принтеры, мышь, клавиатура' },
    { id: 'personalization' as SettingsSection, icon: 'Palette', title: 'Персонализация', desc: 'Фон, темы, цвета' },
    { id: 'privacy' as SettingsSection, icon: 'Lock', title: 'Конфиденциальность', desc: 'Разрешения приложений' },
    { id: 'system' as SettingsSection, icon: 'Monitor', title: 'Система', desc: 'Дисплей, звук, уведомления' },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'personalization':
        return (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Персонализация</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Настройте внешний вид системы в соответствии с вашими предпочтениями
            </p>

            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Режим цветов</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Выберите режим приложения по умолчанию
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={onToggleTheme}
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
                    onClick={onToggleTheme}
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
        );

      case 'system':
        return (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Система</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Сведения о системе и параметры устройства
            </p>

            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">О системе</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Название системы</span>
                    <span className="text-sm font-medium">Browser OS</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Версия</span>
                    <span className="text-sm font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Тип системы</span>
                    <span className="text-sm font-medium">64-разрядная веб-ОС</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Процессор</span>
                    <span className="text-sm font-medium">WebAssembly Engine</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-sm text-muted-foreground">Память (RAM)</span>
                    <span className="text-sm font-medium">Динамическая</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">Хранилище</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Локальное хранилище браузера</span>
                    <span className="text-sm text-muted-foreground">Доступно</span>
                  </div>
                  <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary rounded-full" />
                  </div>
                  <div className="text-xs text-muted-foreground">Использовано ~33% от доступного объёма</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Сеть и Интернет</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Wi-Fi, режим в самолёте и другие сетевые параметры
            </p>

            <div className="bg-card rounded-xl border border-border p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Wifi" size={20} />
                    <div>
                      <div className="text-sm font-medium">Wi-Fi</div>
                      <div className="text-xs text-muted-foreground">Подключено к Home Network</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50">
                  <div className="flex items-center gap-3">
                    <Icon name="Plane" size={20} />
                    <div>
                      <div className="text-sm font-medium">Режим в самолёте</div>
                      <div className="text-xs text-muted-foreground">Отключить все беспроводные подключения</div>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        );

      case 'bluetooth':
        return (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Bluetooth и устройства</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Управление подключёнными устройствами
            </p>

            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg mb-6">
                <div className="flex items-center gap-3">
                  <Icon name="Bluetooth" size={20} />
                  <span className="text-sm font-medium">Bluetooth</span>
                </div>
                <Switch />
              </div>

              <div className="text-sm text-muted-foreground text-center py-8">
                Устройства не найдены
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold mb-2">Конфиденциальность</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Управление разрешениями и защита данных
            </p>

            <div className="space-y-4">
              {['Камера', 'Микрофон', 'Местоположение', 'Уведомления'].map((item, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{item}</div>
                      <div className="text-xs text-muted-foreground mt-1">Разрешить доступ приложениям</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

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
                <div className="text-xs text-muted-foreground">user@browseros.com</div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="h-[calc(100%-140px)]">
            <div className="space-y-1">
              {settingsItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto py-3 px-3"
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon name={item.icon} size={18} className="mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-sm">{item.title}</div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-8">
            {renderContent()}
          </div>
        </ScrollArea>
      </div>
    </WindowFrame>
  );
};

export default Settings;