// Mock data for ChainTrust demo

export const inventoryData = [
  {
    id: "P001",
    name: "Organic Apples",
    category: "Fresh Produce",
    stock: {
      chennai: 245,
      delhi: 189,
      mumbai: 312,
      total: 746
    },
    aiPrediction: "Restock Chennai in 3 days",
    status: "optimal",
    lastUpdated: "2024-01-13T10:30:00Z"
  },
  {
    id: "P002",
    name: "Basmati Rice 5kg",
    category: "Grains",
    stock: {
      chennai: 89,
      delhi: 245,
      mumbai: 156,
      total: 490
    },
    aiPrediction: "Low stock alert - Chennai",
    status: "low",
    lastUpdated: "2024-01-13T09:15:00Z"
  },
  {
    id: "P003",
    name: "LED TV 55inch",
    category: "Electronics",
    stock: {
      chennai: 23,
      delhi: 45,
      mumbai: 31,
      total: 99
    },
    aiPrediction: "Normal demand expected",
    status: "optimal",
    lastUpdated: "2024-01-13T08:45:00Z"
  },
  {
    id: "P004",
    name: "Cotton T-Shirts",
    category: "Apparel",
    stock: {
      chennai: 445,
      delhi: 623,
      mumbai: 378,
      total: 1446
    },
    aiPrediction: "High demand surge predicted",
    status: "surplus",
    lastUpdated: "2024-01-13T11:00:00Z"
  }
];

export const productTraceabilityData = {
  "P001": {
    name: "Organic Apples",
    authenticity: "Verified",
    co2Impact: "Low (2.1 kg CO₂)",
    ethicalSourcing: "Fair Trade Certified",
    journey: [
      {
        stage: "Farm",
        location: "Punjab, India",
        date: "2024-01-05",
        details: "Organic farm certified by USDA",
        verified: true
      },
      {
        stage: "Processing",
        location: "Delhi Processing Center",
        date: "2024-01-07",
        details: "Quality inspection and packaging",
        verified: true
      },
      {
        stage: "Distribution",
        location: "Regional Warehouse",
        date: "2024-01-09",
        details: "Temperature-controlled storage",
        verified: true
      },
      {
        stage: "Store",
        location: "Walmart Chennai",
        date: "2024-01-11",
        details: "Available for purchase",
        verified: true
      }
    ]
  },
  "P002": {
    name: "Basmati Rice 5kg",
    authenticity: "Verified",
    co2Impact: "Medium (5.8 kg CO₂)",
    ethicalSourcing: "Sustainable Farming",
    journey: [
      {
        stage: "Farm",
        location: "Haryana, India",
        date: "2023-11-15",
        details: "Traditional basmati cultivation",
        verified: true
      },
      {
        stage: "Mill",
        location: "Punjab Rice Mill",
        date: "2023-12-20",
        details: "Processing and quality control",
        verified: true
      },
      {
        stage: "Distribution",
        location: "Central Warehouse",
        date: "2024-01-03",
        details: "Bulk distribution to stores",
        verified: true
      },
      {
        stage: "Store",
        location: "Walmart Delhi",
        date: "2024-01-08",
        details: "Ready for sale",
        verified: true
      }
    ]
  }
};

export const warrantyData = [
  {
    id: "W001",
    productId: "P003",
    productName: "LED TV 55inch",
    purchaseDate: "2024-01-10",
    warrantyPeriod: "24 months",
    status: "Active",
    coverage: "Manufacturing defects, parts replacement",
    ownershipLog: [
      {
        owner: "John Doe",
        address: "123 Main St, Chennai",
        purchaseDate: "2024-01-10",
        verified: true
      }
    ],
    returnEligible: true,
    serialNumber: "TV55LED240110001"
  },
  {
    id: "W002",
    productId: "P004",
    productName: "Cotton T-Shirts",
    purchaseDate: "2024-01-12",
    warrantyPeriod: "6 months",
    status: "Active",
    coverage: "Fabric quality, color fastness",
    ownershipLog: [
      {
        owner: "Jane Smith",
        address: "456 Park Ave, Mumbai",
        purchaseDate: "2024-01-12",
        verified: true
      }
    ],
    returnEligible: true,
    serialNumber: "CT240112001"
  }
];

export const aiPredictions = [
  {
    type: "restock",
    priority: "high",
    message: "Chennai store needs apple restock in 3 days",
    confidence: 94,
    action: "Auto-order 200 units"
  },
  {
    type: "demand_surge",
    priority: "medium",
    message: "T-shirt demand may increase by 40% next week",
    confidence: 87,
    action: "Consider promotion"
  },
  {
    type: "seasonal",
    priority: "low",
    message: "Winter clothing demand declining",
    confidence: 76,
    action: "Plan clearance sale"
  }
];