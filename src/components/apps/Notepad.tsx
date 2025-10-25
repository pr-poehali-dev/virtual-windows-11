import { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface NotepadProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  fileName?: string;
}

const Notepad = ({ onClose, onMinimize, onMaximize, isMaximized, fileName }: NotepadProps) => {
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(fileName || '');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [tempFileName, setTempFileName] = useState('');
  const [saveLocation, setSaveLocation] = useState('Рабочий стол');
  const { toast } = useToast();

  const applyFormatting = (command: string) => {
    document.execCommand(command, false);
    switch(command) {
      case 'bold': setIsBold(!isBold); break;
      case 'italic': setIsItalic(!isItalic); break;
      case 'underline': setIsUnderline(!isUnderline); break;
    }
  };

  const handleSave = () => {
    if (!currentFileName) {
      handleSaveAs();
    } else {
      const files = JSON.parse(localStorage.getItem('desktop-files') || '{}');
      files[currentFileName] = {
        content,
        location: saveLocation,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem('desktop-files', JSON.stringify(files));
      
      toast({
        title: "Файл сохранён",
        description: `${currentFileName} сохранён в ${saveLocation}`,
      });
    }
  };

  const handleSaveAs = () => {
    setTempFileName(currentFileName || 'Новый документ.txt');
    setShowSaveDialog(true);
  };

  const handleSaveDialogConfirm = () => {
    const files = JSON.parse(localStorage.getItem('desktop-files') || '{}');
    const finalFileName = tempFileName.endsWith('.txt') ? tempFileName : `${tempFileName}.txt`;
    
    files[finalFileName] = {
      content,
      location: saveLocation,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem('desktop-files', JSON.stringify(files));
    
    setCurrentFileName(finalFileName);
    setShowSaveDialog(false);
    
    toast({
      title: "Файл сохранён",
      description: `${finalFileName} сохранён в ${saveLocation}`,
    });
  };

  return (
    <>
      <WindowFrame
        title={currentFileName || "Блокнот"}
        icon="FileText"
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center gap-1 p-2 border-b border-border bg-card/50">
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Создать">
              <Icon name="FileText" size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave} title="Сохранить">
              <Icon name="Save" size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSaveAs} title="Сохранить как">
              <Icon name="FolderOpen" size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Печать">
              <Icon name="Printer" size={16} />
            </Button>
            
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            <Button 
              variant={isBold ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8 font-bold"
              onClick={() => applyFormatting('bold')}
            >
              B
            </Button>
            <Button 
              variant={isItalic ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8 italic"
              onClick={() => applyFormatting('italic')}
            >
              I
            </Button>
            <Button 
              variant={isUnderline ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8 underline"
              onClick={() => applyFormatting('underline')}
            >
              U
            </Button>
            
            <Separator orientation="vertical" className="h-6 mx-1" />
            
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="AlignLeft" size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="AlignCenter" size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="AlignRight" size={16} />
            </Button>
          </div>

          <div
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            className="flex-1 p-6 outline-none overflow-auto text-foreground text-base leading-relaxed"
            style={{ fontFamily: 'Segoe UI, system-ui, sans-serif' }}
          >
            {!content && (
              <span className="text-muted-foreground">Начните вводить текст...</span>
            )}
          </div>
        </div>
      </WindowFrame>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md z-[9999]">
          <DialogHeader>
            <DialogTitle>Сохранить как</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="filename">Имя файла</Label>
              <Input
                id="filename"
                value={tempFileName}
                onChange={(e) => setTempFileName(e.target.value)}
                placeholder="Введите имя файла"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="location">Расположение</Label>
              <select
                id="location"
                value={saveLocation}
                onChange={(e) => setSaveLocation(e.target.value)}
                className="w-full mt-2 h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="Рабочий стол">Рабочий стол</option>
                <option value="Документы">Документы</option>
                <option value="Загрузки">Загрузки</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveDialogConfirm}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notepad;
