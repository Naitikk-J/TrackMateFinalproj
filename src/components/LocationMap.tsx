import { useEffect, useState } from "react";
import { MapPin, Navigation, Shield } from "lucide-react";

const LocationMap = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 27.5858,
    lng: 91.8656,
    name: "Tawang Monastery"
  });

  // Mock location update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight location changes (GPS drift)
      setCurrentLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 bg-muted rounded-lg border relative overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-success-light via-primary/5 to-success-light opacity-20" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Safe Zone Indicator */}
      <div className="absolute inset-4 border-2 border-success border-dashed rounded-lg bg-success-light/20 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-sm font-medium text-success">Safe Zone</p>
          <p className="text-xs text-success/70">Geo-fenced Area</p>
        </div>
      </div>
      
      {/* Current Location Pin */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Pulsing Circle */}
          <div className="absolute inset-0 w-8 h-8 bg-primary/30 rounded-full animate-ping" />
          
          {/* Location Pin */}
          <div className="relative w-8 h-8 bg-primary rounded-full shadow-primary flex items-center justify-center animate-bounce-subtle">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
        
        {/* Location Info */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-32 text-center border">
          <p className="text-xs font-medium text-foreground">{currentLocation.name}</p>
          <p className="text-xs text-muted-foreground">
            {currentLocation.lat.toFixed(4)}°, {currentLocation.lng.toFixed(4)}°
          </p>
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded shadow-md border hover:bg-muted transition-colors">
          <Navigation className="w-4 h-4 text-foreground" />
        </button>
      </div>
      
      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t p-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-success font-medium">GPS Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-3 h-3 text-success" />
            <span className="text-success">In Safe Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;