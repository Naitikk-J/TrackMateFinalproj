import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, AlertTriangle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/60" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-white mr-4" />
            <h1 className="text-5xl font-bold text-white">SafeTravel</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Advanced Tourist Safety Monitoring System for Secure and Worry-Free Travel
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-300">
            <MapPin className="w-12 h-12 text-success mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-Time Tracking</h3>
            <p className="text-white/80">Live location monitoring with geo-fenced safe zones for enhanced security.</p>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-300">
            <AlertTriangle className="w-12 h-12 text-warning mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Emergency Response</h3>
            <p className="text-white/80">Instant SOS alerts with precise location sharing to authorities.</p>
          </Card>
          
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-300">
            <Users className="w-12 h-12 text-primary-glow mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Professional Monitoring</h3>
            <p className="text-white/80">24/7 surveillance by trained law enforcement professionals.</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="space-x-4">
            <Link to="/tourist">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevation text-lg px-8 py-4">
                Tourist Access
              </Button>
            </Link>
            <Link to="/police">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                Authorities Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-white/70 text-sm">
            Powered by blockchain technology and IoT integration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;