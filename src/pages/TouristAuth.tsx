import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CreditCard, FileText, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const TouristAuth = () => {
  const [activeStep, setActiveStep] = useState("register");
  const [registrationData, setRegistrationData] = useState({
    idType: "",
    fullName: "",
    idNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [blockchainId, setBlockchainId] = useState("");
  const [loginData, setLoginData] = useState({
    blockchainId: "",
    password: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateBlockchainId = () => {
    return `BC${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  const handleRegistration = (idType: string) => {
    setRegistrationData({ ...registrationData, idType });
    setActiveStep("create-account");
  };

  const handleCreateAccount = () => {
    if (registrationData.password !== registrationData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    const newBlockchainId = generateBlockchainId();
    setBlockchainId(newBlockchainId);
    setActiveStep("registration-complete");
    
    toast({
      title: "Registration Successful!",
      description: "Your blockchain ID has been generated.",
    });
  };

  const copyBlockchainId = () => {
    navigator.clipboard.writeText(blockchainId);
    toast({
      title: "Copied!",
      description: "Blockchain ID copied to clipboard",
    });
  };

  const handleLogin = () => {
    // Simulate login validation
    if (loginData.blockchainId && loginData.password) {
      toast({
        title: "Login Successful",
        description: "Welcome to SafeTravel!",
      });
      navigate("/tourist/dashboard");
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your Blockchain ID and password.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">SafeTravel</h1>
          <p className="text-white/80">Secure Tourist Registration & Access</p>
        </div>

        {activeStep === "register" && (
          <Card className="shadow-elevation">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Register for Safe Travel</CardTitle>
              <CardDescription>Choose your identification method to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => handleRegistration("aadhaar")}
                className="w-full h-16 text-lg bg-gradient-success hover:shadow-success transition-all duration-300"
              >
                <CreditCard className="w-6 h-6 mr-3" />
                Register with Aadhaar
              </Button>
              <Button 
                onClick={() => handleRegistration("passport")}
                variant="outline"
                className="w-full h-16 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FileText className="w-6 h-6 mr-3" />
                Register with Passport
              </Button>
            </CardContent>
          </Card>
        )}

        {activeStep === "create-account" && (
          <Card className="shadow-elevation">
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>
                {registrationData.idType === "aadhaar" ? "Aadhaar" : "Passport"} verification completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={registrationData.fullName}
                  onChange={(e) => setRegistrationData({...registrationData, fullName: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="idNumber">
                  {registrationData.idType === "aadhaar" ? "Aadhaar Number" : "Passport Number"}
                </Label>
                <Input
                  id="idNumber"
                  value={registrationData.idNumber}
                  onChange={(e) => setRegistrationData({...registrationData, idNumber: e.target.value})}
                  placeholder={registrationData.idType === "aadhaar" ? "xxxx-xxxx-xxxx" : "A1234567"}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={registrationData.password}
                  onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
                  placeholder="Minimum 8 characters"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  8+ characters, one uppercase, one number required
                </p>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={registrationData.confirmPassword}
                  onChange={(e) => setRegistrationData({...registrationData, confirmPassword: e.target.value})}
                  placeholder="Confirm your password"
                />
              </div>
              <Button onClick={handleCreateAccount} className="w-full bg-gradient-primary">
                Create Account
              </Button>
            </CardContent>
          </Card>
        )}

        {activeStep === "registration-complete" && (
          <Card className="shadow-elevation border-success">
            <CardHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <CardTitle className="text-success">Registration Complete!</CardTitle>
              <CardDescription>Your unique Blockchain ID has been generated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-success-light rounded-lg border border-success">
                <Label className="text-sm font-medium">Your Blockchain ID:</Label>
                <div className="flex items-center justify-between mt-2">
                  <code className="text-lg font-mono bg-white px-3 py-2 rounded border flex-1 mr-2">
                    {blockchainId}
                  </code>
                  <Button onClick={copyBlockchainId} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={() => setActiveStep("login")} 
                  className="w-full bg-gradient-success"
                >
                  Proceed to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeStep === "login" && (
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register" onClick={() => setActiveStep("register")}>Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="shadow-elevation">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to access your SafeTravel dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="blockchainId">Blockchain ID</Label>
                    <Input
                      id="blockchainId"
                      value={loginData.blockchainId}
                      onChange={(e) => setLoginData({...loginData, blockchainId: e.target.value})}
                      placeholder="Enter your Blockchain ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button onClick={handleLogin} className="w-full bg-gradient-primary">
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default TouristAuth;