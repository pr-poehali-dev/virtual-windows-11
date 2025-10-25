import { useState } from 'react';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import Browser from '@/components/apps/Browser';
import Notepad from '@/components/apps/Notepad';
import Settings from '@/components/apps/Settings';
import FileExplorer from '@/components/apps/FileExplorer';
import Calculator from '@/components/apps/Calculator';
import VolumeControl from '@/components/apps/VolumeControl';
import NetworkControl from '@/components/apps/NetworkControl';

export type AppType = 'browser' | 'notepad' | 'settings' | 'explorer' | 'calculator' | null;

export interface WindowState {
  id: string;
  type: AppType;
  title: string;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColor] = useState('#0078D4');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showNetworkControl, setShowNetworkControl] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);

  const openApp = (type: AppType, title: string) => {
    const existingWindow = windows.find(w => w.type === type);
    
    if (existingWindow) {
      setWindows(prev => prev.map(w => 
        w.id === existingWindow.id 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      ));
      setNextZIndex(prev => prev + 1);
    } else {
      const newWindow: WindowState = {
        id: `${type}-${Date.now()}`,
        type,
        title,
        isMaximized: false,
        isMinimized: false,
        zIndex: nextZIndex
      };
      setWindows(prev => [...prev, newWindow]);
      setNextZIndex(prev => prev + 1);
    }
    setShowStartMenu(false);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme}>
      <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
        <Desktop 
          windows={windows}
          onOpenApp={openApp}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onMaximizeWindow={maximizeWindow}
          onFocusWindow={focusWindow}
          theme={theme}
        />

        {windows.map(window => !window.isMinimized && (
          <div
            key={window.id}
            style={{ zIndex: window.zIndex }}
            className={`fixed ${
              window.isMaximized 
                ? 'inset-0 top-0 left-0 right-0 bottom-16' 
                : 'top-8 left-8 w-[900px] h-[600px]'
            } transition-all duration-200`}
            onClick={() => focusWindow(window.id)}
          >
            {window.type === 'browser' && (
              <Browser 
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                isMaximized={window.isMaximized}
              />
            )}
            {window.type === 'notepad' && (
              <Notepad 
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                isMaximized={window.isMaximized}
              />
            )}
            {window.type === 'settings' && (
              <Settings 
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                isMaximized={window.isMaximized}
                theme={theme}
                onToggleTheme={toggleTheme}
                accentColor={accentColor}
                onChangeAccentColor={setAccentColor}
              />
            )}
            {window.type === 'explorer' && (
              <FileExplorer 
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                isMaximized={window.isMaximized}
              />
            )}
            {window.type === 'calculator' && (
              <Calculator 
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                isMaximized={window.isMaximized}
              />
            )}
          </div>
        ))}

        <Taskbar 
          onToggleStart={() => setShowStartMenu(!showStartMenu)}
          windows={windows}
          onRestoreWindow={restoreWindow}
          theme={theme}
          onToggleVolume={() => {
            setShowVolumeControl(!showVolumeControl);
            setShowNetworkControl(false);
          }}
          onToggleNetwork={() => {
            setShowNetworkControl(!showNetworkControl);
            setShowVolumeControl(false);
          }}
        />

        {showStartMenu && (
          <StartMenu 
            onOpenApp={openApp}
            onClose={() => setShowStartMenu(false)}
          />
        )}

        {showVolumeControl && (
          <VolumeControl onClose={() => setShowVolumeControl(false)} />
        )}

        {showNetworkControl && (
          <NetworkControl onClose={() => setShowNetworkControl(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;