import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface VolumeControlProps {
  onClose: () => void;
}

const VolumeControl = ({ onClose }: VolumeControlProps) => {
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume[0] === 0) return 'VolumeX';
    if (volume[0] < 30) return 'Volume';
    if (volume[0] < 70) return 'Volume1';
    return 'Volume2';
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <Card className="fixed bottom-20 right-4 w-72 z-50 p-4 backdrop-blur-xl bg-card/95 border-border/50 animate-scale-in">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-10"
              >
                <Icon name={getVolumeIcon()} size={20} />
              </Button>
              <span className="text-sm font-medium">Громкость</span>
            </div>
            <span className="text-sm text-muted-foreground">{volume[0]}%</span>
          </div>

          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
          />

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Icon name="Music" size={18} className="text-muted-foreground" />
                <span className="text-sm">Мультимедиа</span>
              </div>
              <span className="text-sm text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default VolumeControl;
