import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  User, 
  CreditCard, 
  Phone, 
  Calendar, 
  MapPin, 
  Route, 
  Edit,
  CheckCircle,
  Copy
} from "lucide-react";
import { Link } from "react-router-dom";
import PanicButton from "@/components/PanicButton";
import { useToast } from "@/hooks/use-toast";

const TouristProfile = () => {
  const { toast } = useToast();

  // Mock user data
  const tourist = {
    name: "John Doe",
    blockchainId: "BC1234567890ABC",
    idType: "Aadhaar",
    idNumber: "****-****-1234",
    phoneNumber: "+91 98765 43210",
    tripStartDate: "2024-01-15",
    tripEndDate: "2024-01-22",
    currentLocation: "Tawang, Arunachal Pradesh"
  };

  const emergencyContacts = [
    { id: 1, name: "Emergency Contact 1", phone: "+91 98765 43210", relation: "Family" },
    { id: 2, name: "Local Tourism Office", phone: "+91 98765 43211", relation: "Official" }
  ];

  const copyBlockchainId = () => {
    navigator.clipboard.writeText(tourist.blockchainId);
    toast({
      title: "Copied!",
      description: "Blockchain ID copied to clipboard",
    });
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
        {/* Profile Header */}
        <Card className="shadow-elevation animate-slide-up">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-2xl">{tourist.name}</CardTitle>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Badge className="bg-success text-success-foreground">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Traveler
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                <Input value={tourist.name} disabled className="mt-1" />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Blockchain ID</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input value={tourist.blockchainId} disabled className="flex-1" />
                  <Button onClick={copyBlockchainId} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">ID Type</Label>
                  <Input value={tourist.idType} disabled className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">ID Number</Label>
                  <Input value={tourist.idNumber} disabled className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                <Input value={tourist.phoneNumber} disabled className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Trip Information */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Trip Start</Label>
                  <Input value={tourist.tripStartDate} disabled className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Trip End</Label>
                  <Input value={tourist.tripEndDate} disabled className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Current Location</Label>
                <Input value={tourist.currentLocation} disabled className="mt-1" />
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Trip Validity</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Valid from {tourist.tripStartDate} to {tourist.tripEndDate}
                </p>
              </div>
              
              <Link to="/tourist/itinerary" className="block">
                <Button variant="outline" className="w-full">
                  <Route className="w-4 h-4 mr-2" />
                  View Full Itinerary
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-danger" />
              Emergency Contacts
            </CardTitle>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {contact.relation}
                    </Badge>
                    <Button variant="outline" size="sm" className="ml-2">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-dashed">
                <Phone className="w-4 h-4 mr-2" />
                Add Emergency Contact
              </Button>
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
          <Link to="/tourist/itinerary" className="flex flex-col items-center p-2 text-muted-foreground">
            <Route className="w-5 h-5" />
            <span className="text-xs">Journey</span>
          </Link>
          <Link to="/tourist/profile" className="flex flex-col items-center p-2 text-primary">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TouristProfile;