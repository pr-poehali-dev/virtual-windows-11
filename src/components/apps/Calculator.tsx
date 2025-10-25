import { useState } from 'react';
import WindowFrame from '@/components/WindowFrame';
import { Button } from '@/components/ui/button';

interface CalculatorProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

const Calculator = ({ onClose, onMinimize, onMaximize, isMaximized }: CalculatorProps) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercent = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
  };

  const handleNegate = () => {
    const current = parseFloat(display);
    setDisplay(String(-current));
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonStyle = (btn: string) => {
    if (btn === '=') return 'bg-primary text-primary-foreground hover:bg-primary/90 col-span-2';
    if (['+', '-', '×', '÷'].includes(btn)) return 'bg-accent hover:bg-accent/80';
    if (['C', '±', '%'].includes(btn)) return 'bg-muted hover:bg-muted/80';
    return 'bg-card hover:bg-accent/50';
  };

  const handleClick = (btn: string) => {
    if (btn === 'C') handleClear();
    else if (btn === '±') handleNegate();
    else if (btn === '%') handlePercent();
    else if (btn === '=') handleEquals();
    else if (['+', '-', '×', '÷'].includes(btn)) handleOperation(btn);
    else if (btn === '.') handleDecimal();
    else handleNumber(btn);
  };

  return (
    <WindowFrame
      title="Калькулятор"
      icon="Calculator"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
    >
      <div className="h-full flex flex-col bg-background p-6">
        <div className="bg-card rounded-xl border border-border p-6 mb-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground h-6 mb-1">
              {operation && previousValue !== null ? `${previousValue} ${operation}` : ''}
            </div>
            <div className="text-4xl font-semibold tracking-tight truncate">
              {display}
            </div>
          </div>
        </div>

        <div className="flex-1 grid gap-2">
          {buttons.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-2">
              {row.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  className={`h-16 text-lg font-medium rounded-lg transition-all ${getButtonStyle(btn)}`}
                  variant="outline"
                >
                  {btn}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
};

export default Calculator;
