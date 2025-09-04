import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  Route, 
  User, 
  AlertTriangle, 
  CheckCircle,
  Bluetooth,
  Navigation,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import PanicButton from "@/components/PanicButton";
import LocationMap from "@/components/LocationMap";

const TouristDashboard = () => {
  const [safeZoneStatus, setSafeZoneStatus] = useState<"safe" | "warning">("safe");
  const [deviceConnected, setDeviceConnected] = useState(false);

  // Mock tourist data
  const tourist = {
    name: "John Doe",
    blockchainId: "BC1234567890ABC",
    currentLocation: "Tawang Monastery, Arunachal Pradesh",
    nextDestination: "Sela Pass"
  };

  const upcomingItinerary = [
    { id: 1, name: "Tawang Monastery", status: "current", time: "9:00 AM - 12:00 PM" },
    { id: 2, name: "Sela Pass", status: "next", time: "2:00 PM - 5:00 PM" },
    { id: 3, name: "Bomdila View Point", status: "pending", time: "Tomorrow 10:00 AM" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">SafeTravel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {tourist.name}</span>
              <Link to="/tourist/profile">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Safety Status Banner */}
        <Card className={`${safeZoneStatus === "safe" ? "border-success bg-success-light" : "border-danger bg-danger-light"} animate-slide-up`}>
          <CardContent className="flex items-center space-x-4 py-4">
            {safeZoneStatus === "safe" ? (
              <CheckCircle className="w-8 h-8 text-success" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-danger animate-bounce-subtle" />
            )}
            <div>
              <h3 className="font-semibold text-lg">
                {safeZoneStatus === "safe" ? "You are in a Safe Zone" : "Alert: You have left the Safe Zone"}
              </h3>
              <p className="text-sm opacity-80">
                {safeZoneStatus === "safe" 
                  ? "Continue enjoying your journey safely" 
                  : "Please return to the designated safe area or contact authorities"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Map Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Live Location Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationMap />
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Current: {tourist.currentLocation}</span>
                  <Badge variant="outline" className="text-success border-success">
                    <Navigation className="w-3 h-3 mr-1" />
                    GPS Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/tourist/itinerary" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Route className="w-4 h-4 mr-2" />
                    My Itinerary
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setDeviceConnected(!deviceConnected)}
                >
                  <Bluetooth className="w-4 h-4 mr-2" />
                  {deviceConnected ? "Disconnect Device" : "Connect Smart Band"}
                </Button>
                {deviceConnected && (
                  <div className="text-sm text-success flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Smart Band Connected
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Today's Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingItinerary.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === "current" ? "bg-primary animate-pulse-glow" :
                      item.status === "next" ? "bg-warning" : "bg-muted"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    {item.status === "current" && (
                      <Badge className="bg-primary text-primary-foreground">Current</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-danger">
              <CardHeader>
                <CardTitle className="text-lg text-danger flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-danger text-danger hover:bg-danger hover:text-danger-foreground">
                  Call Tourist Helpline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Panic Button */}
      <PanicButton />

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden">
        <div className="flex items-center justify-around py-2">
          <Link to="/tourist/dashboard" className="flex flex-col items-center p-2 text-primary">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/tourist/itinerary" className="flex flex-col items-center p-2 text-muted-foreground">
            <Route className="w-5 h-5" />
            <span className="text-xs">Journey</span>
          </Link>
          <Link to="/tourist/profile" className="flex flex-col items-center p-2 text-muted-foreground">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TouristDashboard;