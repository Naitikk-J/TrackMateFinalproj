import { useEffect, useState } from "react";
import { MapPin, Users, AlertTriangle, Shield, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PoliceMapProps {
  selectedTourist: any;
}

const PoliceMap = ({ selectedTourist }: PoliceMapProps) => {
  const [viewMode, setViewMode] = useState<"standard" | "satellite" | "heatmap">("standard");
  const [showSafeZones, setShowSafeZones] = useState(true);

  // Mock tourist locations
  const touristLocations = [
    { id: "1", name: "John Doe", lat: 27.5858, lng: 91.8656, status: "alert", location: "Sela Pass" },
    { id: "2", name: "Alice Smith", lat: 27.5900, lng: 91.8600, status: "safe", location: "Tawang Monastery" },
    { id: "3", name: "Robert Johnson", lat: 27.2378, lng: 92.4158, status: "safe", location: "Bomdila View Point" },
    { id: "4", name: "Emily Davis", lat: 26.5775, lng: 93.1714, status: "inactive", location: "Kaziranga National Park" }
  ];

  // Safe zones coordinates
  const safeZones = [
    { name: "Tawang Monastery Zone", lat: 27.5900, lng: 91.8600, radius: 2 },
    { name: "Sela Pass Zone", lat: 27.3669, lng: 92.0635, radius: 1.5 },
    { name: "Bomdila Zone", lat: 27.2378, lng: 92.4158, radius: 3 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert": return "text-danger bg-danger";
      case "safe": return "text-success bg-success";
      case "inactive": return "text-warning bg-warning";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="relative w-full h-96 bg-dashboard rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className={`absolute inset-0 ${
        viewMode === "satellite" ? "bg-gradient-to-br from-amber-900/20 via-emerald-900/20 to-blue-900/20" :
        viewMode === "heatmap" ? "bg-gradient-to-br from-danger/10 via-warning/10 to-success/10" :
        "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100"
      }`} />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--dashboard-border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--dashboard-border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Safe Zones */}
      {showSafeZones && safeZones.map((zone, index) => (
        <div
          key={index}
          className="absolute border-2 border-success/30 bg-success/5 rounded-full"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`,
            width: `${zone.radius * 60}px`,
            height: `${zone.radius * 60}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-4 h-4 text-success mx-auto mb-1" />
              <div className="text-xs text-success font-medium bg-white/90 px-2 py-1 rounded">
                {zone.name.split(' ')[0]}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Tourist Location Pins */}
      {touristLocations.map((tourist, index) => (
        <div
          key={tourist.id}
          className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 ${
            selectedTourist?.id === tourist.id ? "scale-125 z-20" : "z-10"
          }`}
          style={{
            left: `${25 + index * 20}%`,
            top: `${40 + index * 12}%`
          }}
          onClick={() => {}}
        >
          {/* Pin */}
          <div className="relative">
            <div className={`w-6 h-6 rounded-full shadow-lg ${getStatusColor(tourist.status)} 
              flex items-center justify-center border-2 border-white
              ${tourist.status === "alert" ? "animate-bounce-subtle" : ""}
            `}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            
            {/* Pulsing ring for alerts */}
            {tourist.status === "alert" && (
              <div className="absolute inset-0 w-6 h-6 bg-danger/30 rounded-full animate-ping" />
            )}
            
            {/* Tourist Info Popup */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 
              bg-dashboard-accent border border-dashboard-border rounded-lg p-2 shadow-lg min-w-32 text-center
              ${selectedTourist?.id === tourist.id ? "block" : "hidden"}
            `}>
              <p className="text-xs font-medium text-dashboard-foreground">{tourist.name}</p>
              <p className="text-xs text-dashboard-foreground/70">{tourist.location}</p>
              <div className="flex items-center justify-center mt-1">
                {getStatusColor(tourist.status).includes("danger") && <AlertTriangle className="w-3 h-3 text-danger mr-1" />}
                <span className={`text-xs capitalize ${
                  tourist.status === "alert" ? "text-danger" :
                  tourist.status === "safe" ? "text-success" : "text-warning"
                }`}>
                  {tourist.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <div className="bg-dashboard-accent border border-dashboard-border rounded-lg p-1">
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant={viewMode === "standard" ? "default" : "ghost"}
              onClick={() => setViewMode("standard")}
              className="h-8 px-2 text-xs"
            >
              Standard
            </Button>
            <Button
              size="sm"
              variant={viewMode === "heatmap" ? "default" : "ghost"}
              onClick={() => setViewMode("heatmap")}
              className="h-8 px-2 text-xs"
            >
              Heatmap
            </Button>
          </div>
        </div>
        
        <Button
          size="sm"
          variant={showSafeZones ? "default" : "ghost"}
          onClick={() => setShowSafeZones(!showSafeZones)}
          className="justify-start h-8 text-xs bg-dashboard-accent border-dashboard-border"
        >
          <Layers className="w-3 h-3 mr-1" />
          Safe Zones
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-dashboard-accent border border-dashboard-border rounded-lg p-3">
        <h4 className="text-xs font-medium text-dashboard-foreground mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-dashboard-foreground/70">Safe</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <span className="text-dashboard-foreground/70">Alert</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-dashboard-foreground/70">Inactive</span>
          </div>
        </div>
      </div>

      {/* Statistics Overlay */}
      <div className="absolute top-4 right-4 bg-dashboard-accent border border-dashboard-border rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-dashboard-foreground">Live Overview</span>
        </div>
        <div className="space-y-1 text-xs text-dashboard-foreground/70">
          <div>Total: {touristLocations.length} tourists</div>
          <div>Safe: {touristLocations.filter(t => t.status === "safe").length}</div>
          <div>Alerts: {touristLocations.filter(t => t.status === "alert").length}</div>
        </div>
      </div>
    </div>
  );
};

export default PoliceMap;