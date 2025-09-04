import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone
} from "lucide-react";

interface Tourist {
  id: string;
  name: string;
  blockchainId: string;
  status: "safe" | "alert" | "inactive";
  contactNumber: string;
  lastSeen: string;
  currentLocation: string;
  idType: string;
  idNumber: string;
  emergencyContacts: Array<{
    name: string;
    phone: string;
  }>;
  itinerary: Array<{
    destination: string;
    time: string;
    status: string;
  }>;
}

interface TouristRosterProps {
  searchTerm: string;
  onTouristSelect: (tourist: Tourist) => void;
  selectedTourist: Tourist | null;
}

const TouristRoster = ({ searchTerm, onTouristSelect, selectedTourist }: TouristRosterProps) => {
  // Mock tourist data
  const [tourists] = useState<Tourist[]>([
    {
      id: "1",
      name: "John Doe",
      blockchainId: "BC1234567890ABC",
      status: "alert",
      contactNumber: "+91 98765 43210",
      lastSeen: "2 minutes ago",
      currentLocation: "Sela Pass",
      idType: "Aadhaar",
      idNumber: "****-****-1234",
      emergencyContacts: [
        { name: "Jane Doe", phone: "+91 98765 43211" },
        { name: "Tourist Helpline", phone: "+91 98765 43212" }
      ],
      itinerary: [
        { destination: "Tawang Monastery", time: "9:00 AM", status: "completed" },
        { destination: "Sela Pass", time: "2:00 PM", status: "current" }
      ]
    },
    {
      id: "2",
      name: "Alice Smith",
      blockchainId: "BC2345678901DEF",
      status: "safe",
      contactNumber: "+91 98765 43213",
      lastSeen: "5 minutes ago",
      currentLocation: "Tawang Monastery",
      idType: "Passport",
      idNumber: "A1234567",
      emergencyContacts: [
        { name: "Bob Smith", phone: "+91 98765 43214" }
      ],
      itinerary: [
        { destination: "Tawang Monastery", time: "10:00 AM", status: "current" }
      ]
    },
    {
      id: "3",
      name: "Robert Johnson",
      blockchainId: "BC3456789012GHI",
      status: "safe",
      contactNumber: "+91 98765 43215",
      lastSeen: "1 minute ago",
      currentLocation: "Bomdila View Point",
      idType: "Aadhaar",
      idNumber: "****-****-5678",
      emergencyContacts: [
        { name: "Mary Johnson", phone: "+91 98765 43216" }
      ],
      itinerary: [
        { destination: "Bomdila View Point", time: "11:00 AM", status: "current" }
      ]
    },
    {
      id: "4",
      name: "Emily Davis",
      blockchainId: "BC4567890123JKL",
      status: "inactive",
      contactNumber: "+91 98765 43217",
      lastSeen: "30 minutes ago",
      currentLocation: "Kaziranga National Park",
      idType: "Passport",
      idNumber: "B9876543",
      emergencyContacts: [
        { name: "David Davis", phone: "+91 98765 43218" }
      ],
      itinerary: [
        { destination: "Kaziranga National Park", time: "8:00 AM", status: "current" }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      case "safe":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "inactive":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "alert":
        return <Badge className="bg-danger text-danger-foreground text-xs">Alert</Badge>;
      case "safe":
        return <Badge className="bg-success text-success-foreground text-xs">Safe</Badge>;
      case "inactive":
        return <Badge className="bg-warning text-warning-foreground text-xs">Inactive</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const filteredTourists = tourists.filter(tourist =>
    tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.blockchainId.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    // Priority: alerts first, then by last seen
    if (a.status === "alert" && b.status !== "alert") return -1;
    if (b.status === "alert" && a.status !== "alert") return 1;
    return 0;
  });

  return (
    <ScrollArea className="h-[calc(100vh-350px)]">
      <div className="p-1">
        {filteredTourists.length === 0 ? (
          <div className="text-center py-8 text-dashboard-foreground/50">
            <p>No tourists found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTourists.map((tourist) => (
              <div
                key={tourist.id}
                onClick={() => onTouristSelect(tourist)}
                className={`
                  p-4 border border-dashboard-border rounded-lg cursor-pointer transition-all duration-200
                  ${selectedTourist?.id === tourist.id 
                    ? "bg-primary/10 border-primary shadow-primary" 
                    : "bg-dashboard hover:bg-dashboard-accent"
                  }
                  ${tourist.status === "alert" ? "ring-1 ring-danger/50" : ""}
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(tourist.status)}
                    <h4 className="font-medium text-dashboard-foreground truncate">{tourist.name}</h4>
                  </div>
                  {getStatusBadge(tourist.status)}
                </div>

                {/* Blockchain ID */}
                <p className="text-xs font-mono text-dashboard-foreground/70 mb-2 truncate">
                  {tourist.blockchainId}
                </p>

                {/* Contact & Location */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2 text-dashboard-foreground/70">
                    <Phone className="w-3 h-3" />
                    <span>{tourist.contactNumber}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-dashboard-foreground/70">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{tourist.currentLocation}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-dashboard-foreground/50">
                    <Clock className="w-3 h-3" />
                    <span>Last seen: {tourist.lastSeen}</span>
                  </div>
                </div>

                {/* Alert Indicator for High Priority */}
                {tourist.status === "alert" && (
                  <div className="mt-3 p-2 bg-danger/10 border border-danger/20 rounded text-xs">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-3 h-3 text-danger animate-bounce-subtle" />
                      <span className="text-danger font-medium">
                        Immediate attention required
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default TouristRoster;