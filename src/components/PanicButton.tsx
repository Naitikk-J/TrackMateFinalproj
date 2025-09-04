import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  let holdTimer: NodeJS.Timeout;
  let progressTimer: NodeJS.Timeout;

  const startHold = () => {
    if (isPressed) return;
    
    setIsHolding(true);
    setProgress(0);
    
    // Progress animation
    progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + (100 / 30); // 3 seconds = 30 intervals of 100ms
      });
    }, 100);
    
    // Hold timer for 3 seconds
    holdTimer = setTimeout(() => {
      setIsPressed(true);
      setIsHolding(false);
      setProgress(100);
      
      toast({
        title: "Emergency Alert Sent!",
        description: "Your location has been shared with the nearest police unit.",
        className: "bg-danger text-danger-foreground border-danger"
      });
      
      // Reset after showing success
      setTimeout(() => {
        setIsPressed(false);
        setProgress(0);
      }, 2000);
    }, 3000);
  };

  const stopHold = () => {
    if (isPressed) return;
    
    setIsHolding(false);
    setProgress(0);
    clearTimeout(holdTimer);
    clearInterval(progressTimer);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="relative">
        {/* Progress Ring */}
        {isHolding && (
          <div className="absolute inset-0 w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--danger-light))"
                strokeWidth="4"
                className="opacity-30"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--danger))"
                strokeWidth="4"
                strokeDasharray="175.93"
                strokeDashoffset={175.93 - (175.93 * progress) / 100}
                className="transition-all duration-100 ease-linear"
              />
            </svg>
          </div>
        )}
        
        {/* Panic Button */}
        <Button
          size="lg"
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          className={`
            w-16 h-16 rounded-full shadow-danger transition-all duration-200
            ${isPressed 
              ? "bg-gradient-success shadow-success animate-bounce-subtle" 
              : "bg-gradient-danger hover:shadow-glow animate-pulse-glow"
            }
            ${isHolding ? "scale-110" : "scale-100"}
          `}
        >
          {isPressed ? (
            <Check className="w-8 h-8 text-success-foreground" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-danger-foreground" />
          )}
        </Button>
        
        {/* Hold Instructions */}
        {isHolding && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-danger text-danger-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap animate-fade-in">
            Hold for {Math.ceil(3 - (progress / 100) * 3)}s
          </div>
        )}
      </div>
    </div>
  );
};

export default PanicButton;