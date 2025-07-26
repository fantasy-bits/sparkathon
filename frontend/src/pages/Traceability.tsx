import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productTraceabilityData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { 
  QrCode, 
  Search, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Verified,
  Leaf,
  Truck,
  Store,
  Factory
} from "lucide-react";

type ProductId = keyof typeof productTraceabilityData;

const Traceability = () => {
  const [selectedProductId, setSelectedProductId] = useState<ProductId | null>(null);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const simulateQRScan = () => {
    const productIds = Object.keys(productTraceabilityData) as ProductId[];
    const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];
    setSelectedProductId(randomProduct);
    setInputValue(randomProduct);
    toast({
      title: "QR Code Scanned",
      description: `Product ${randomProduct} successfully scanned`,
    });
  };

  const searchProduct = () => {
    if (inputValue && inputValue in productTraceabilityData) {
      setSelectedProductId(inputValue as ProductId);
      toast({
        title: "Product Found",
        description: `Displaying traceability for ${inputValue}`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: "Please enter a valid product ID (P001, P002)",
        variant: "destructive"
      });
    }
  };

  const selectedProduct = selectedProductId ? productTraceabilityData[selectedProductId] : null;

  const getStageIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "farm": return <Leaf className="w-6 h-6 text-green-600" />;
      case "processing":
      case "mill": return <Factory className="w-6 h-6 text-blue-600" />;
      case "distribution": return <Truck className="w-6 h-6 text-orange-600" />;
      case "store": return <Store className="w-6 h-6 text-purple-600" />;
      default: return <MapPin className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Traceability</h1>
          <p className="text-muted-foreground text-lg">
            Track your product's complete journey from source to store
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Product Lookup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Product ID (P001, P002) or scan QR code"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={searchProduct}>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={simulateQRScan} variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
                <Select value={inputValue} onValueChange={setInputValue}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Quick Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(productTraceabilityData).map((id) => (
                      <SelectItem key={id} value={id}>
                        {id} - {productTraceabilityData[id as ProductId].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedProduct && (
          <div className="space-y-6">
            {/* Product Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Verified className="w-5 h-5 text-green-600" />
                  {selectedProduct.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">AUTHENTICITY</h3>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {selectedProduct.authenticity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">CO₂ IMPACT</h3>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {selectedProduct.co2Impact}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground">ETHICAL SOURCING</h3>
                    <div className="flex items-center gap-2">
                      <Verified className="w-5 h-5 text-blue-600" />
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedProduct.ethicalSourcing}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journey Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedProduct.journey.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Connector Line */}
                      {index < selectedProduct.journey.length - 1 && (
                        <div className="absolute left-8 top-16 w-0.5 h-12 bg-border"></div>
                      )}
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-background border-2 border-primary rounded-full">
                            {getStageIcon(step.stage)}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <Card className="border">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{step.stage}</h3>
                                    {step.verified && (
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>{step.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(step.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <Badge 
                                    variant={step.verified ? "default" : "secondary"}
                                    className={step.verified ? "bg-green-100 text-green-800" : ""}
                                  >
                                    {step.verified ? "Verified" : "Pending"}
                                  </Badge>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mt-3">
                                {step.details}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Verified className="w-5 h-5 text-primary" />
                  Blockchain Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Transaction Hash</h4>
                    <code className="text-xs bg-muted p-2 rounded block break-all">
                      0x742d35cc6572a0c26c48c9a3a8e8fd6e1c3b8e5f2a4d7c9b8a6e5f4d3c2b1a0
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Block Number</h4>
                    <div className="text-2xl font-mono">#18,542,315</div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Network</h4>
                    <Badge>Ethereum Mainnet</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Gas Used</h4>
                    <div className="text-lg">21,000 Wei</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedProduct && (
          <Card>
            <CardContent className="text-center py-12">
              <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Product Selected</h3>
              <p className="text-muted-foreground">
                Enter a product ID or scan a QR code to view traceability information
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Traceability;