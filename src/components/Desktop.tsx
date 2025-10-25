import { useState } from 'react';
import { AppType, WindowState } from '@/pages/Index';
import Icon from '@/components/ui/icon';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from '@/components/ui/input';

interface DesktopProps {
  windows: WindowState[];
  onOpenApp: (type: AppType, title: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  theme: 'light' | 'dark';
}

interface DesktopItem {
  id: string;
  name: string;
  type: 'app' | 'folder' | 'file';
  appType?: AppType;
  icon: string;
  position: { row: number; col: number };
}

const Desktop = ({ onOpenApp }: DesktopProps) => {
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([
    { id: '1', name: 'Проводник', type: 'app', appType: 'explorer', icon: 'Folder', position: { row: 0, col: 0 } },
    { id: '2', name: 'Браузер', type: 'app', appType: 'browser', icon: 'Globe', position: { row: 1, col: 0 } },
    { id: '3', name: 'Блокнот', type: 'app', appType: 'notepad', icon: 'FileText', position: { row: 2, col: 0 } },
    { id: '4', name: 'Калькулятор', type: 'app', appType: 'calculator', icon: 'Calculator', position: { row: 3, col: 0 } },
    { id: '5', name: 'Параметры', type: 'app', appType: 'settings', icon: 'Settings', position: { row: 4, col: 0 } },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const findNextAvailablePosition = (): { row: number; col: number } => {
    const occupied = new Set(desktopItems.map(item => `${item.position.row},${item.position.col}`));
    
    for (let col = 0; col < 20; col++) {
      for (let row = 0; row < 20; row++) {
        if (!occupied.has(`${row},${col}`)) {
          return { row, col };
        }
      }
    }
    return { row: 0, col: 0 };
  };

  const handleCreateFolder = () => {
    const newFolder: DesktopItem = {
      id: `folder-${Date.now()}`,
      name: 'Новая папка',
      type: 'folder',
      icon: 'Folder',
      position: findNextAvailablePosition()
    };
    setDesktopItems([...desktopItems, newFolder]);
  };

  const handleCreateFile = () => {
    const newFile: DesktopItem = {
      id: `file-${Date.now()}`,
      name: 'Новый документ.txt',
      type: 'file',
      icon: 'FileText',
      position: findNextAvailablePosition()
    };
    setDesktopItems([...desktopItems, newFile]);
  };

  const handleDoubleClick = (item: DesktopItem) => {
    if (item.type === 'app' && item.appType) {
      onOpenApp(item.appType, item.name);
    } else if (item.type === 'folder') {
      onOpenApp('explorer', item.name);
    } else if (item.type === 'file') {
      onOpenApp('notepad', item.name);
    }
  };

  const handleRename = (id: string) => {
    const item = desktopItems.find(i => i.id === id);
    if (item) {
      setEditingId(id);
      setEditingName(item.name);
    }
  };

  const handleRenameComplete = (id: string) => {
    setDesktopItems(desktopItems.map(item => 
      item.id === id ? { ...item, name: editingName } : item
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setDesktopItems(desktopItems.filter(item => item.id !== id));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex-1 p-4 relative">
          {desktopItems.sort((a, b) => a.position.col - b.position.col || a.position.row - b.position.row).map((item) => (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <button
                  onDoubleClick={() => handleDoubleClick(item)}
                  className="absolute flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                  style={{
                    top: `${item.position.row * 110 + 16}px`,
                    left: `${item.position.col * 110 + 16}px`,
                    width: '100px'
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon} size={28} className="text-primary" />
                  </div>
                  {editingId === item.id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={() => handleRenameComplete(item.id)}
                      onKeyPress={(e) => e.key === 'Enter' && handleRenameComplete(item.id)}
                      className="h-6 text-xs text-center px-1"
                      autoFocus
                    />
                  ) : (
                    <span className="text-xs text-center text-foreground drop-shadow-lg">
                      {item.name}
                    </span>
                  )}
                </button>
              </ContextMenuTrigger>
              {item.type !== 'app' && (
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleDoubleClick(item)}>
                    <Icon name="FolderOpen" size={14} className="mr-2" />
                    Открыть
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handleRename(item.id)}>
                    <Icon name="Edit" size={14} className="mr-2" />
                    Переименовать
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
                    <Icon name="Trash2" size={14} className="mr-2" />
                    Удалить
                  </ContextMenuItem>
                </ContextMenuContent>
              )}
            </ContextMenu>
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleCreateFolder}>
          <Icon name="FolderPlus" size={14} className="mr-2" />
          Создать папку
        </ContextMenuItem>
        <ContextMenuItem onClick={handleCreateFile}>
          <Icon name="FilePlus" size={14} className="mr-2" />
          Создать текстовый файл
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Desktop;