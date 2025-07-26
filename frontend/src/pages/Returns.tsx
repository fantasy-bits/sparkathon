import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { warrantyData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Search, 
  CheckCircle, 
  Clock, 
  User, 
  FileText, 
  RotateCcw,
  Calendar,
  AlertCircle
} from "lucide-react";

const Returns = () => {
  const [selectedWarranty, setSelectedWarranty] = useState<typeof warrantyData[0] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [claimForm, setClaimForm] = useState({
    issue: "",
    description: "",
    priority: "medium"
  });
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const { toast } = useToast();

  const searchWarranty = () => {
    const found = warrantyData.find(
      w => w.productId === searchValue || w.serialNumber === searchValue || w.id === searchValue
    );
    
    if (found) {
      setSelectedWarranty(found);
      toast({
        title: "Warranty Found",
        description: `Loaded warranty information for ${found.productName}`,
      });
    } else {
      toast({
        title: "Warranty Not Found",
        description: "Please check the product ID, serial number, or warranty ID",
        variant: "destructive"
      });
      setSelectedWarranty(null);
    }
  };

  const submitClaim = () => {
    if (!selectedWarranty || !claimForm.issue || !claimForm.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Claim Submitted Successfully",
      description: `Your warranty claim for ${selectedWarranty.productName} has been submitted. Reference: WC${Date.now()}`,
    });
    
    setIsClaimDialogOpen(false);
    setClaimForm({ issue: "", description: "", priority: "medium" });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRemainingWarranty = (purchaseDate: string, warrantyPeriod: string) => {
    const purchase = new Date(purchaseDate);
    const months = parseInt(warrantyPeriod.split(" ")[0]);
    const expiry = new Date(purchase.setMonth(purchase.getMonth() + months));
    const now = new Date();
    const remaining = Math.max(0, Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    return remaining;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Warranty & Returns</h1>
          <p className="text-muted-foreground text-lg">
            Secure, blockchain-verified warranty management and returns processing
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Your Warranty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Product ID, Serial Number, or Warranty ID</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="search"
                    placeholder="Enter W001, P003, TV55LED240110001, etc."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={searchWarranty}>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <Select value={searchValue} onValueChange={setSearchValue}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Quick Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {warrantyData.map((warranty) => (
                      <SelectItem key={warranty.id} value={warranty.id}>
                        {warranty.id} - {warranty.productName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedWarranty && (
          <div className="space-y-6">
            {/* Warranty Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {selectedWarranty.productName}
                  </div>
                  <Badge className={getStatusColor(selectedWarranty.status)}>
                    {selectedWarranty.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">WARRANTY PERIOD</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{selectedWarranty.warrantyPeriod}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">PURCHASE DATE</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="font-medium">
                        {new Date(selectedWarranty.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">DAYS REMAINING</h3>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">
                        {getRemainingWarranty(selectedWarranty.purchaseDate, selectedWarranty.warrantyPeriod)} days
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">RETURN ELIGIBLE</h3>
                    <div className="flex items-center gap-2">
                      {selectedWarranty.returnEligible ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-600">Yes</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="font-medium text-red-600">No</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Coverage Details</h4>
                  <p className="text-sm text-muted-foreground">{selectedWarranty.coverage}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ownership History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Ownership History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedWarranty.ownershipLog.map((owner, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{owner.owner}</h4>
                          {owner.verified && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{owner.address}</p>
                        <p className="text-xs text-muted-foreground">
                          Purchased: {new Date(owner.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className={owner.verified ? "border-green-200 text-green-600" : ""}>
                        {owner.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Serial Number</h4>
                    <code className="text-sm bg-muted p-2 rounded block">
                      {selectedWarranty.serialNumber}
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Product ID</h4>
                    <code className="text-sm bg-muted p-2 rounded block">
                      {selectedWarranty.productId}
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Warranty ID</h4>
                    <code className="text-sm bg-muted p-2 rounded block">
                      {selectedWarranty.id}
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Blockchain Hash</h4>
                    <code className="text-xs bg-muted p-2 rounded block break-all">
                      0x{Math.random().toString(16).substr(2, 40)}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Available Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1" disabled={!selectedWarranty.returnEligible}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Submit Warranty Claim
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Submit Warranty Claim</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to submit a warranty claim for {selectedWarranty.productName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="issue">Issue Type</Label>
                          <Select value={claimForm.issue} onValueChange={(value) => setClaimForm(prev => ({ ...prev, issue: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="defect">Manufacturing Defect</SelectItem>
                              <SelectItem value="damage">Physical Damage</SelectItem>
                              <SelectItem value="malfunction">Product Malfunction</SelectItem>
                              <SelectItem value="return">Return Request</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe the issue in detail..."
                            value={claimForm.description}
                            onChange={(e) => setClaimForm(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>

                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select value={claimForm.priority} onValueChange={(value) => setClaimForm(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button onClick={submitClaim} className="w-full">
                          Submit Claim
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedWarranty && (
          <Card>
            <CardContent className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Warranty Selected</h3>
              <p className="text-muted-foreground">
                Search for a product to view warranty information and submit claims
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Returns;