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
}

const Desktop = ({ onOpenApp }: DesktopProps) => {
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([
    { id: '1', name: 'Проводник', type: 'app', appType: 'explorer', icon: 'Folder' },
    { id: '2', name: 'Браузер', type: 'app', appType: 'browser', icon: 'Globe' },
    { id: '3', name: 'Блокнот', type: 'app', appType: 'notepad', icon: 'FileText' },
    { id: '4', name: 'Калькулятор', type: 'app', appType: 'calculator', icon: 'Calculator' },
    { id: '5', name: 'Параметры', type: 'app', appType: 'settings', icon: 'Settings' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreateFolder = () => {
    const newFolder: DesktopItem = {
      id: `folder-${Date.now()}`,
      name: 'Новая папка',
      type: 'folder',
      icon: 'Folder'
    };
    setDesktopItems([...desktopItems, newFolder]);
  };

  const handleCreateFile = () => {
    const newFile: DesktopItem = {
      id: `file-${Date.now()}`,
      name: 'Новый документ.txt',
      type: 'file',
      icon: 'FileText'
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
        <div className="flex-1 p-4 grid grid-cols-1 auto-rows-min gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, 100px)', gridAutoFlow: 'column' }}>
          {desktopItems.map((item) => (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <button
                  onDoubleClick={() => handleDoubleClick(item)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
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
