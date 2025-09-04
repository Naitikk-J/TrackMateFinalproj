import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  Users,
  Activity,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";
import TouristRoster from "@/components/TouristRoster";
import PoliceMap from "@/components/PoliceMap";

const PoliceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTourist, setSelectedTourist] = useState<any>(null);

  // Mock dashboard statistics
  const stats = {
    totalTourists: 24,
    activeTourists: 18,
    alertsToday: 2,
    safeZoneBreaches: 1
  };

  return (
    <div className="min-h-screen bg-dashboard text-dashboard-foreground">
      {/* Header */}
      <header className="bg-dashboard-accent border-b border-dashboard-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-dashboard-foreground">SafeTravel Authority Portal</h1>
                <p className="text-sm text-dashboard-foreground/70">Tourist Safety & Monitoring Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Officer on Duty</p>
                <p className="text-xs text-dashboard-foreground/70">Badge #12345</p>
              </div>
              <Button variant="outline" className="border-dashboard-border">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-dashboard-accent border-dashboard-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dashboard-foreground/70">Total Tourists</p>
                  <p className="text-2xl font-bold text-dashboard-foreground">{stats.totalTourists}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dashboard-accent border-dashboard-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dashboard-foreground/70">Active Now</p>
                  <p className="text-2xl font-bold text-success">{stats.activeTourists}</p>
                </div>
                <Activity className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dashboard-accent border-dashboard-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dashboard-foreground/70">Alerts Today</p>
                  <p className="text-2xl font-bold text-danger">{stats.alertsToday}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-danger" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dashboard-accent border-dashboard-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dashboard-foreground/70">Safe Zone Breaches</p>
                  <p className="text-2xl font-bold text-warning">{stats.safeZoneBreaches}</p>
                </div>
                <Shield className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Panel - Tourist Roster */}
          <div className="lg:col-span-2">
            <Card className="bg-dashboard-accent border-dashboard-border shadow-elevation h-[calc(100vh-280px)]">
              <CardHeader className="border-b border-dashboard-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-dashboard-foreground flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Tourist Roster
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-dashboard-border">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dashboard-foreground/50" />
                  <Input
                    placeholder="Search by name or Blockchain ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-dashboard border-dashboard-border text-dashboard-foreground placeholder:text-dashboard-foreground/50"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <TouristRoster 
                  searchTerm={searchTerm}
                  onTouristSelect={setSelectedTourist}
                  selectedTourist={selectedTourist}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Map & Details */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Map */}
              <Card className="bg-dashboard-accent border-dashboard-border shadow-elevation">
                <CardHeader className="border-b border-dashboard-border">
                  <CardTitle className="text-dashboard-foreground flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Live Tourist Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <PoliceMap selectedTourist={selectedTourist} />
                </CardContent>
              </Card>

              {/* Tourist Details */}
              {selectedTourist && (
                <Card className="bg-dashboard-accent border-dashboard-border shadow-elevation animate-slide-up">
                  <CardHeader className="border-b border-dashboard-border">
                    <CardTitle className="text-dashboard-foreground flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Tourist Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-dashboard-foreground border-b border-dashboard-border pb-2">
                          Personal Information
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-dashboard-foreground/70 uppercase tracking-wide">Full Name</p>
                            <p className="text-dashboard-foreground font-medium">{selectedTourist.name}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-dashboard-foreground/70 uppercase tracking-wide">Blockchain ID</p>
                            <p className="text-dashboard-foreground font-mono text-sm">{selectedTourist.blockchainId}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-dashboard-foreground/70 uppercase tracking-wide">ID Type</p>
                              <p className="text-dashboard-foreground">{selectedTourist.idType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-dashboard-foreground/70 uppercase tracking-wide">ID Number</p>
                              <p className="text-dashboard-foreground">{selectedTourist.idNumber}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Emergency & Actions */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-dashboard-foreground border-b border-dashboard-border pb-2">
                          Emergency Contacts
                        </h3>
                        
                        <div className="space-y-2">
                          {selectedTourist.emergencyContacts?.map((contact: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-dashboard rounded border border-dashboard-border">
                              <div>
                                <p className="text-dashboard-foreground font-medium text-sm">{contact.name}</p>
                                <p className="text-dashboard-foreground/70 text-xs">{contact.phone}</p>
                              </div>
                              <Button size="sm" variant="outline" className="border-dashboard-border">
                                <Phone className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-dashboard-border">
                          <h4 className="font-medium text-dashboard-foreground mb-3">Quick Actions</h4>
                          <div className="space-y-2">
                            <Button className="w-full bg-danger hover:bg-danger/90 text-danger-foreground">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Send Alert to Tourist
                            </Button>
                            <Button variant="outline" className="w-full border-dashboard-border">
                              <Phone className="w-4 h-4 mr-2" />
                              Contact Tourist
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Itinerary */}
                    <div className="mt-6 pt-6 border-t border-dashboard-border">
                      <h3 className="font-semibold text-dashboard-foreground mb-4">Current Itinerary</h3>
                      <div className="space-y-2">
                        {selectedTourist.itinerary?.map((item: any, index: number) => (
                          <div key={index} className="flex items-center space-x-3 p-2 bg-dashboard rounded border border-dashboard-border">
                            {item.status === "current" ? (
                              <CheckCircle className="w-4 h-4 text-success" />
                            ) : (
                              <Clock className="w-4 h-4 text-dashboard-foreground/50" />
                            )}
                            <div className="flex-1">
                              <p className="text-dashboard-foreground font-medium text-sm">{item.destination}</p>
                              <p className="text-dashboard-foreground/70 text-xs">{item.time}</p>
                            </div>
                            {item.status === "current" && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;