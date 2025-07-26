import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { inventoryData, aiPredictions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Truck, 
  RotateCcw,
  Brain,
  MapPin
} from "lucide-react";

const Inventory = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-600 bg-green-100";
      case "low": return "text-red-600 bg-red-100";
      case "surplus": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStockPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  const simulateShipment = (productId: string, from: string, to: string) => {
    toast({
      title: "Shipment Initiated",
      description: `Simulating shipment of ${productId} from ${from} to ${to}`,
    });
  };

  const simulateRestock = (productId: string) => {
    toast({
      title: "Restock Order Placed",
      description: `AI-powered restock order placed for ${productId}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Smart Inventory Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              AI-powered inventory management across all locations
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            AI Oracle Active
          </Badge>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* AI Predictions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiPredictions.map((prediction, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {prediction.priority === "high" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      {prediction.priority === "medium" && <TrendingUp className="w-4 h-4 text-yellow-500" />}
                      {prediction.priority === "low" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      <Badge variant="outline" className="text-xs">
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {prediction.message}
                    </p>
                    <Button size="sm" variant="ghost" className="text-xs h-8">
                      {prediction.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Inventory Table */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Chennai</TableHead>
                        <TableHead>Delhi</TableHead>
                        <TableHead>Mumbai</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryData.map((product) => (
                        <TableRow 
                          key={product.id}
                          className={selectedProduct === product.id ? "bg-muted/50" : ""}
                        >
                          <TableCell className="font-medium">
                            <div>
                              <div>{product.name}</div>
                              <div className="text-xs text-muted-foreground">{product.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{product.stock.chennai}</div>
                              <Progress 
                                value={getStockPercentage(product.stock.chennai, product.stock.total)} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{product.stock.delhi}</div>
                              <Progress 
                                value={getStockPercentage(product.stock.delhi, product.stock.total)} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{product.stock.mumbai}</div>
                              <Progress 
                                value={getStockPercentage(product.stock.mumbai, product.stock.total)} 
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">{product.stock.total}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => simulateShipment(product.id, "Mumbai", "Chennai")}
                              >
                                <Truck className="w-3 h-3 mr-1" />
                                Ship
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => simulateRestock(product.id)}
                              >
                                <RotateCcw className="w-3 h-3 mr-1" />
                                Restock
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Locations</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Products Tracked</p>
                      <p className="text-2xl font-bold">{inventoryData.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AI Accuracy</p>
                      <p className="text-2xl font-bold">94%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;