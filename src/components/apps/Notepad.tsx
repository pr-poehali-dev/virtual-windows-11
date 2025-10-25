import { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface NotepadProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

const Notepad = ({ onClose, onMinimize, onMaximize, isMaximized }: NotepadProps) => {
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const applyFormatting = (command: string) => {
    document.execCommand(command, false);
    switch(command) {
      case 'bold': setIsBold(!isBold); break;
      case 'italic': setIsItalic(!isItalic); break;
      case 'underline': setIsUnderline(!isUnderline); break;
    }
  };

  return (
    <WindowFrame
      title="Блокнот"
      icon="FileText"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-1 p-2 border-b border-border bg-card/50">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="FileText" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Save" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
  );
};

export default Notepad;
