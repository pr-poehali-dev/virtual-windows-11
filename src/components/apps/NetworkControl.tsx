import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface NetworkControlProps {
  onClose: () => void;
}

const NetworkControl = ({ onClose }: NetworkControlProps) => {
  const networks = [
    { name: 'Home Network', strength: 4, connected: true, secured: true },
    { name: 'Office WiFi', strength: 3, connected: false, secured: true },
    { name: 'Guest Network', strength: 2, connected: false, secured: false },
  ];

  const getSignalIcon = (strength: number) => {
    if (strength >= 4) return 'Wifi';
    if (strength >= 3) return 'Wifi';
    return 'WifiOff';
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <Card className="fixed bottom-20 right-4 w-80 z-50 p-4 backdrop-blur-xl bg-card/95 border-border/50 animate-scale-in">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Сеть и Интернет</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="Settings" size={16} />
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Wifi" size={18} className="text-primary" />
              <span className="text-sm font-medium">Wi-Fi</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-1">
            {networks.map((network, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start h-auto py-3 ${
                  network.connected ? 'bg-accent/50' : ''
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon 
                    name={getSignalIcon(network.strength)} 
                    size={18} 
                    className={network.connected ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{network.name}</div>
                    {network.connected && (
                      <div className="text-xs text-muted-foreground">Подключено</div>
                    )}
                  </div>
                  {network.secured && (
                    <Icon name="Lock" size={14} className="text-muted-foreground" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          <div className="pt-3 border-t border-border space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Plane" size={16} className="mr-3" />
              <span className="text-sm">Режим в самолёте</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Bluetooth" size={16} className="mr-3" />
              <span className="text-sm">Bluetooth</span>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NetworkControl;
