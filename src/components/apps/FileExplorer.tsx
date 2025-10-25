import { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileExplorerProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: string;
  dateModified: string;
}

const FileExplorer = ({ onClose, onMinimize, onMaximize, isMaximized }: FileExplorerProps) => {
  const [currentPath, setCurrentPath] = useState('Этот компьютер');
  
  const items: FileItem[] = [
    { name: 'Документы', type: 'folder', icon: 'FileText', dateModified: '25.10.2025' },
    { name: 'Загрузки', type: 'folder', icon: 'Download', dateModified: '25.10.2025' },
    { name: 'Изображения', type: 'folder', icon: 'Image', dateModified: '25.10.2025' },
    { name: 'Музыка', type: 'folder', icon: 'Music', dateModified: '25.10.2025' },
    { name: 'Видео', type: 'folder', icon: 'Video', dateModified: '25.10.2025' },
    { name: 'Рабочий стол', type: 'folder', icon: 'Monitor', dateModified: '25.10.2025' },
  ];

  const sidebarItems = [
    { name: 'Рабочий стол', icon: 'Monitor' },
    { name: 'Документы', icon: 'FileText' },
    { name: 'Загрузки', icon: 'Download' },
    { name: 'Изображения', icon: 'Image' },
    { name: 'Этот компьютер', icon: 'HardDrive' },
  ];

  return (
    <WindowFrame
      title="Проводник"
      icon="Folder"
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
            <Icon name="ChevronUp" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="RotateCw" size={16} />
          </Button>

          <div className="flex-1 flex items-center gap-2 bg-background px-3 py-1 rounded-md ml-2">
            <Icon name="Folder" size={14} className="text-muted-foreground" />
            <span className="text-sm">{currentPath}</span>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Search" size={16} />
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-48 border-r border-border bg-card/30">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {sidebarItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-9"
                    onClick={() => setCurrentPath(item.name)}
                  >
                    <Icon name={item.icon} size={16} className="mr-2" />
                    <span className="text-sm">{item.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="grid grid-cols-1 gap-1">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 cursor-pointer group"
                  >
                    <Icon 
                      name={item.icon} 
                      size={20} 
                      className="text-primary flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{item.name}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.dateModified}
                    </div>
                    <div className="text-xs text-muted-foreground w-24">
                      {item.type === 'folder' ? 'Папка' : 'Файл'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default FileExplorer;
