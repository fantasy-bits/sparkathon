import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { 
  Shield, 
  Zap, 
  QrCode, 
  TrendingUp, 
  Verified, 
  Globe, 
  ArrowRight,
  CheckCircle,
  BarChart3,
  Scan,
  RotateCcw
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Smart Inventory & AI Oracle",
      description: "AI-powered inventory management with predictive analytics for optimal stock levels across all locations.",
      link: "/inventory"
    },
    {
      icon: <Scan className="h-8 w-8 text-primary" />,
      title: "Product Traceability & QR Scan",
      description: "Complete product journey tracking from farm to store with blockchain-verified authenticity.",
      link: "/traceability"
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-primary" />,
      title: "Blockchain-Based Warranty & Returns",
      description: "Secure, transparent warranty management with immutable ownership records and easy returns.",
      link: "/returns"
    }
  ];

  const benefits = [
    "Reduce inventory waste by 40%",
    "100% product authenticity verification",
    "Streamlined returns process",
    "Real-time supply chain visibility",
    "Enhanced customer trust",
    "Automated compliance reporting"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🚀 Powering Enterprise Retail
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ChainTrust
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              AI-powered blockchain solution for <span className="text-primary font-semibold">smart inventory management</span>, 
              <span className="text-primary font-semibold"> product transparency</span>, and 
              <span className="text-primary font-semibold"> secure warranty handling</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/inventory">
                  Explore Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for enterprises like Walmart, ChainTrust combines AI intelligence with blockchain security 
              to revolutionize retail operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button variant="ghost" asChild className="group-hover:text-primary">
                    <Link to={feature.link}>
                      Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why ChainTrust?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Transform your retail operations with cutting-edge technology that ensures transparency, 
                efficiency, and customer satisfaction.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-card p-8 rounded-lg shadow-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Global Scale Ready</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Designed to handle enterprise-level operations with millions of products 
                  and thousands of locations worldwide.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-primary/10 rounded">
                    <div className="font-bold text-lg text-primary">99.9%</div>
                    <div className="text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded">
                    <div className="font-bold text-lg text-primary">10M+</div>
                    <div className="text-muted-foreground">Products Tracked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the future of retail with ChainTrust's comprehensive blockchain solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link to="/inventory">
                  Start Demo <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link to="/about">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ChainTrust</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 ChainTrust. Built for hackathon demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
