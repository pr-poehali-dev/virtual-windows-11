import { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BrowserProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

const Browser = ({ onClose, onMinimize, onMaximize, isMaximized }: BrowserProps) => {
  const [url, setUrl] = useState('https://www.bing.com');
  const [inputUrl, setInputUrl] = useState('bing.com');

  const handleNavigate = () => {
    let newUrl = inputUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      if (newUrl.includes('.')) {
        newUrl = 'https://' + newUrl;
      } else {
        newUrl = `https://www.bing.com/search?q=${encodeURIComponent(newUrl)}`;
      }
    }
    setUrl(newUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  return (
    <WindowFrame
      title="Microsoft Edge"
      icon="Globe"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 p-2 border-b border-border bg-card/50">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="ChevronRight" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="RotateCw" size={16} />
          </Button>
          
          <div className="flex-1 flex items-center gap-2">
            <Icon name="Lock" size={14} className="text-muted-foreground ml-2" />
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Поиск или введите веб-адрес"
              className="flex-1 h-8 text-sm bg-background"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleNavigate}
            >
              <Icon name="Search" size={14} />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Star" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>

        <div className="flex-1 bg-white relative">
          <iframe
            src={url}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
            title="Browser Content"
          />
          <div className="absolute top-2 right-2 bg-destructive/80 text-destructive-foreground text-xs px-2 py-1 rounded pointer-events-none">
            Некоторые сайты могут блокировать iframe
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default Browser;