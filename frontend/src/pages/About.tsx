import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Zap, 
  Users, 
  Target, 
  Lightbulb, 
  Cpu, 
  Database, 
  Lock,
  Globe,
  TrendingUp,
  CheckCircle,
  ExternalLink
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Blockchain Engineer",
      bio: "Expert in smart contracts and DeFi protocols with 5+ years experience"
    },
    {
      name: "Sarah Johnson",
      role: "AI/ML Engineer", 
      bio: "Specializes in predictive analytics and machine learning optimization"
    },
    {
      name: "Mike Rodriguez",
      role: "Full Stack Developer",
      bio: "Frontend and backend development with focus on retail solutions"
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      bio: "Product strategy and user experience for enterprise applications"
    }
  ];

  const technologies = [
    {
      category: "Blockchain",
      items: [
        { name: "Ethereum", description: "Smart contracts and immutable records" },
        { name: "Solidity", description: "Smart contract development" },
        { name: "Web3.js", description: "Blockchain integration" },
        { name: "IPFS", description: "Decentralized file storage" }
      ]
    },
    {
      category: "AI & Machine Learning",
      items: [
        { name: "TensorFlow", description: "Predictive inventory models" },
        { name: "Python", description: "AI algorithm development" },
        { name: "Chainlink", description: "Oracle network integration" },
        { name: "Apache Kafka", description: "Real-time data streaming" }
      ]
    },
    {
      category: "Frontend & Backend",
      items: [
        { name: "React", description: "User interface development" },
        { name: "TypeScript", description: "Type-safe development" },
        { name: "Node.js", description: "Backend API services" },
        { name: "PostgreSQL", description: "Traditional data storage" }
      ]
    }
  ];

  const walmartBenefits = [
    "Reduce inventory waste by up to 40% through AI-powered demand prediction",
    "Eliminate counterfeit products with blockchain-verified authenticity",
    "Streamline returns process, reducing processing time by 60%",
    "Provide customers with complete product transparency and traceability",
    "Automate compliance reporting for regulatory requirements",
    "Enable real-time inventory optimization across thousands of locations"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ChainTrust
            </h1>
            <Zap className="h-8 w-8 text-accent" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionizing retail operations through AI-powered blockchain solutions for 
            smart inventory management, product transparency, and secure warranty handling.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To empower enterprise retailers with cutting-edge blockchain and AI technologies 
                that ensure complete transparency, optimize inventory management, and build 
                unshakeable customer trust through verifiable product authenticity.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-accent" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A future where every product has a complete, verifiable history from source to 
                consumer, where inventory management is perfectly optimized by AI, and where 
                returns and warranties are seamlessly handled through blockchain technology.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              Technology Stack
            </CardTitle>
            <p className="text-muted-foreground">
              Built with cutting-edge technologies for enterprise-scale operations
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {tech.category === "Blockchain" && <Lock className="w-5 h-5 text-primary" />}
                    {tech.category === "AI & Machine Learning" && <Zap className="w-5 h-5 text-accent" />}
                    {tech.category === "Frontend & Backend" && <Database className="w-5 h-5 text-green-600" />}
                    {tech.category}
                  </h3>
                  <div className="space-y-3">
                    {tech.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border rounded-lg p-3">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Walmart Use Case */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Walmart Use Case
            </CardTitle>
            <p className="text-muted-foreground">
              How ChainTrust transforms operations for retail giants like Walmart
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Key Benefits
                </h3>
                <div className="space-y-3">
                  {walmartBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Scale & Impact</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">10,500+</div>
                      <div className="text-muted-foreground">Walmart Stores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">270M</div>
                      <div className="text-muted-foreground">Weekly Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">100M+</div>
                      <div className="text-muted-foreground">Products Tracked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">$611B</div>
                      <div className="text-muted-foreground">Annual Revenue</div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-2 text-primary">ROI Projection</h4>
                  <p className="text-sm text-muted-foreground">
                    Conservative estimates show 300%+ ROI within the first year through 
                    reduced waste, improved efficiency, and enhanced customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              Our Team
            </CardTitle>
            <p className="text-muted-foreground">
              Expert developers and strategists bringing ChainTrust to life
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hackathon Note */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Built for Innovation</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              ChainTrust was developed as a comprehensive demonstration of how blockchain technology 
              and AI can revolutionize enterprise retail operations. This hackathon project showcases 
              real-world solutions that can be implemented at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Source Code
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:team@chaintrust.demo">
                  Contact Team
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;