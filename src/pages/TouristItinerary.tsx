import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  Route, 
  User, 
  Clock,
  CheckCircle,
  Circle,
  Navigation,
  Camera,
  Info,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import PanicButton from "@/components/PanicButton";

const TouristItinerary = () => {
  // Mock itinerary data
  const itinerary = [
    {
      id: 1,
      destination: "Tawang Monastery",
      description: "Ancient Buddhist monastery with stunning mountain views",
      time: "9:00 AM - 12:00 PM",
      date: "Day 1 - Today",
      status: "completed",
      coordinates: "27.5858° N, 91.8656° E",
      safetyNotes: "Well-monitored tourist zone with local guides available"
    },
    {
      id: 2,
      destination: "Sela Pass",
      description: "High altitude mountain pass with pristine lakes",
      time: "2:00 PM - 5:00 PM", 
      date: "Day 1 - Today",
      status: "current",
      coordinates: "27.3669° N, 92.0635° E",
      safetyNotes: "Weather dependent - carry warm clothing"
    },
    {
      id: 3,
      destination: "Bomdila View Point",
      description: "Panoramic views of the Himalayas and valleys below",
      time: "10:00 AM - 1:00 PM",
      date: "Day 2 - Tomorrow",
      status: "upcoming",
      coordinates: "27.2378° N, 92.4158° E",
      safetyNotes: "Designated safe zone with emergency facilities"
    },
    {
      id: 4,
      destination: "Kaziranga National Park",
      description: "Famous wildlife sanctuary and UNESCO World Heritage site",
      time: "8:00 AM - 6:00 PM",
      date: "Day 3",
      status: "upcoming",
      coordinates: "26.5775° N, 93.1714° E",
      safetyNotes: "Guided safari tours only - follow park guidelines"
    },
    {
      id: 5,
      destination: "Majuli Island",
      description: "World's largest river island with unique culture",
      time: "9:00 AM - 4:00 PM",
      date: "Day 4",
      status: "upcoming",
      coordinates: "26.9510° N, 94.2224° E",
      safetyNotes: "Ferry crossing required - life jackets mandatory"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "current":
        return <Circle className="w-6 h-6 text-primary animate-pulse-glow" />;
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "current":
        return <Badge className="bg-primary text-primary-foreground animate-pulse">Current</Badge>;
      default:
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">SafeTravel</h1>
            </div>
            <Link to="/tourist/dashboard">
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Journey Header */}
        <Card className="shadow-elevation animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Route className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Your Journey</CardTitle>
            <p className="text-muted-foreground">
              Arunachal Pradesh & Assam Heritage Tour - 5 Days
            </p>
          </CardHeader>
        </Card>

        {/* Progress Overview */}
        <Card className="animate-slide-up">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Journey Progress</h3>
              <span className="text-sm text-muted-foreground">2 of 5 destinations</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-primary h-2 rounded-full transition-all duration-500" style={{ width: '40%' }} />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Start</span>
              <span>40% Complete</span>
              <span>Finish</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="space-y-4 animate-slide-up">
          {itinerary.map((item, index) => (
            <Card key={item.id} className={`${
              item.status === "current" ? "ring-2 ring-primary shadow-primary" : ""
            } transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Timeline Connector */}
                  <div className="flex flex-col items-center">
                    {getStatusIcon(item.status)}
                    {index < itinerary.length - 1 && (
                      <div className={`w-0.5 h-16 mt-2 ${
                        item.status === "completed" ? "bg-success" : "bg-muted"
                      }`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{item.destination}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Navigation className="w-4 h-4 text-primary" />
                        <span>{item.coordinates}</span>
                      </div>
                    </div>

                    {/* Safety Information */}
                    <div className="p-3 bg-success-light rounded-lg border border-success/20 mb-4">
                      <div className="flex items-start space-x-2">
                        <Info className="w-4 h-4 text-success mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-success">Safety Information</p>
                          <p className="text-sm text-success/80">{item.safetyNotes}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {item.status === "current" && (
                        <Button size="sm" className="bg-gradient-primary">
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      )}
                      {item.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          View Photos
                        </Button>
                      )}
                      {item.status === "upcoming" && (
                        <Button variant="outline" size="sm">
                          <Info className="w-4 h-4 mr-2" />
                          More Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Journey Summary */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Journey Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Destinations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">1</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">1</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-muted-foreground">3</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Panic Button */}
      <PanicButton />

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden">
        <div className="flex items-center justify-around py-2">
          <Link to="/tourist/dashboard" className="flex flex-col items-center p-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/tourist/itinerary" className="flex flex-col items-center p-2 text-primary">
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

export default TouristItinerary;