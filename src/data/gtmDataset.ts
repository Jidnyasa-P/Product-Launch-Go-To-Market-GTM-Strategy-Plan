export interface GTMRecord {
  id: string;
  productName: string;
  category: "SaaS" | "Hardware" | "Consumer Goods" | "EdTech" | "FinTech" | "HealthTech";
  targetMarket: string;
  customerSegment: string;
  region: "North America" | "Europe" | "Asia-Pacific" | "Latin America";
  competitorName: string;
  competitorPrice: number;
  productPrice: number;
  marketingChannel: "SEO & Content" | "Paid Ads" | "Social Media" | "Influencer Marketing" | "Cold Outreach" | "Event Marketing";
  campaignBudget: number;
  expectedLeads: number;
  expectedConversions: number;
  conversionRate: number; // calculated: (Conversions/Leads) * 100 %
  cac: number; // calculated: Budget/Conversions
  revenueForecast: number; // calculated: Conversions * Price
  marketDemandScore: number; // 0-100
  productReadinessScore: number; // 0-100
  launchPhase: "Pre-Launch" | "Beta Testing" | "Launch Event" | "Post-Launch";
  gtmStatus: "On Track" | "Delayed" | "Completed" | "At Risk";
}

// Generate 105 realistic, high-fidelity records across different sectors
const seedData = [
  {
    productName: "PulseBand Student",
    category: "Hardware",
    targetMarket: "Students & Academia",
    customerSegment: "Tech-Savvy Gen Z",
    region: "North America",
    competitorName: "Apple Watch SE",
    competitorPrice: 249,
    productPrice: 129,
    marketingChannel: "Influencer Marketing",
    campaignBudget: 15000,
    expectedLeads: 25000,
    expectedConversions: 850,
    marketDemandScore: 88,
    productReadinessScore: 92,
    launchPhase: "Beta Testing",
    gtmStatus: "On Track"
  },
  {
    productName: "ResumeBot AI Pro",
    category: "SaaS",
    targetMarket: "Recent Graduates",
    customerSegment: "Career Starters",
    region: "Europe",
    competitorName: "Novoresume Premium",
    competitorPrice: 40,
    productPrice: 19,
    marketingChannel: "SEO & Content",
    campaignBudget: 8000,
    expectedLeads: 12000,
    expectedConversions: 1100,
    marketDemandScore: 94,
    productReadinessScore: 95,
    launchPhase: "Launch Event",
    gtmStatus: "Completed"
  },
  {
    productName: "EduLMS Micro-Academy",
    category: "EdTech",
    targetMarket: "Corporate HR & SMBs",
    customerSegment: "Corporate Trainers",
    region: "Asia-Pacific",
    competitorName: "Docebo Enterprise",
    competitorPrice: 1200,
    productPrice: 650,
    marketingChannel: "Cold Outreach",
    campaignBudget: 22000,
    expectedLeads: 4500,
    expectedConversions: 180,
    marketDemandScore: 75,
    productReadinessScore: 80,
    launchPhase: "Pre-Launch",
    gtmStatus: "Delayed"
  },
  {
    productName: "CoinFlow Ledger",
    category: "FinTech",
    targetMarket: "SMEs & Freelancers",
    customerSegment: "Gig Economy Workers",
    region: "Latin America",
    competitorName: "QuickBooks Self-Employed",
    competitorPrice: 150,
    productPrice: 79,
    marketingChannel: "Paid Ads",
    campaignBudget: 12500,
    expectedLeads: 14000,
    expectedConversions: 780,
    marketDemandScore: 82,
    productReadinessScore: 88,
    launchPhase: "Launch Event",
    gtmStatus: "On Track"
  },
  {
    productName: "TherapySync Portal",
    category: "HealthTech",
    targetMarket: "Private Practices",
    customerSegment: "Mental Health Therapists",
    region: "North America",
    competitorName: "SimplePractice",
    competitorPrice: 900,
    productPrice: 590,
    marketingChannel: "SEO & Content",
    campaignBudget: 18000,
    expectedLeads: 3200,
    expectedConversions: 140,
    marketDemandScore: 91,
    productReadinessScore: 78,
    launchPhase: "Beta Testing",
    gtmStatus: "At Risk"
  },
  {
    productName: "EcoHarvest IoT Sensor",
    category: "Hardware",
    targetMarket: "Boutique Vineyards",
    customerSegment: "Organic Growers",
    region: "Europe",
    competitorName: "Arable Pulse",
    competitorPrice: 450,
    productPrice: 320,
    marketingChannel: "Event Marketing",
    campaignBudget: 35000,
    expectedLeads: 1800,
    expectedConversions: 155,
    marketDemandScore: 80,
    productReadinessScore: 85,
    launchPhase: "Pre-Launch",
    gtmStatus: "On Track"
  },
  {
    productName: "SignaFlow eSign Suite",
    category: "SaaS",
    targetMarket: "Commercial Real Estate",
    customerSegment: "Legal Departments",
    region: "Asia-Pacific",
    competitorName: "DocuSign",
    competitorPrice: 480,
    productPrice: 280,
    marketingChannel: "Paid Ads",
    campaignBudget: 25000,
    expectedLeads: 6500,
    expectedConversions: 320,
    marketDemandScore: 86,
    productReadinessScore: 90,
    launchPhase: "Post-Launch",
    gtmStatus: "Completed"
  },
  {
    productName: "NutriMeal AI Guide",
    category: "HealthTech",
    targetMarket: "Busy Professionals",
    customerSegment: "Wellness Envoys",
    region: "North America",
    competitorName: "MyFitnessPal Premium",
    competitorPrice: 80,
    productPrice: 45,
    marketingChannel: "Social Media",
    campaignBudget: 9000,
    expectedLeads: 19000,
    expectedConversions: 1400,
    marketDemandScore: 89,
    productReadinessScore: 94,
    launchPhase: "Post-Launch",
    gtmStatus: "Completed"
  },
  {
    productName: "CodeQuest Gamified",
    category: "EdTech",
    targetMarket: "High Schools & K-12",
    customerSegment: "Code Instructors",
    region: "Europe",
    competitorName: "Tynker for Schools",
    competitorPrice: 350,
    productPrice: 210,
    marketingChannel: "Social Media",
    campaignBudget: 6000,
    expectedLeads: 5500,
    expectedConversions: 340,
    marketDemandScore: 78,
    productReadinessScore: 89,
    launchPhase: "Beta Testing",
    gtmStatus: "On Track"
  },
  {
    productName: "MicroSettle Gateway",
    category: "FinTech",
    targetMarket: "E-commerce Shops",
    customerSegment: "Shopify Sellers",
    region: "Asia-Pacific",
    competitorName: "Stripe Connect",
    competitorPrice: 450,
    productPrice: 199,
    marketingChannel: "Cold Outreach",
    campaignBudget: 14000,
    expectedLeads: 8000,
    expectedConversions: 450,
    marketDemandScore: 85,
    productReadinessScore: 82,
    launchPhase: "Launch Event",
    gtmStatus: "On Track"
  },
  {
    productName: "FreshCrate Organic Del.",
    category: "Consumer Goods",
    targetMarket: "Urban Households",
    customerSegment: "Health-Conscious Parents",
    region: "North America",
    competitorName: "HelloFresh Premium",
    competitorPrice: 120,
    productPrice: 85,
    marketingChannel: "Influencer Marketing",
    campaignBudget: 30000,
    expectedLeads: 45000,
    expectedConversions: 2400,
    marketDemandScore: 95,
    productReadinessScore: 98,
    launchPhase: "Post-Launch",
    gtmStatus: "Completed"
  }
];

const categories: Array<"SaaS" | "Hardware" | "Consumer Goods" | "EdTech" | "FinTech" | "HealthTech"> = [
  "SaaS", "Hardware", "Consumer Goods", "EdTech", "FinTech", "HealthTech"
];
const regions: Array<"North America" | "Europe" | "Asia-Pacific" | "Latin America"> = [
  "North America", "Europe", "Asia-Pacific", "Latin America"
];
const channels: Array<"SEO & Content" | "Paid Ads" | "Social Media" | "Influencer Marketing" | "Cold Outreach" | "Event Marketing"> = [
  "SEO & Content", "Paid Ads", "Social Media", "Influencer Marketing", "Cold Outreach", "Event Marketing"
];
const phases: Array<"Pre-Launch" | "Beta Testing" | "Launch Event" | "Post-Launch"> = [
  "Pre-Launch", "Beta Testing", "Launch Event", "Post-Launch"
];
const statuses: Array<"On Track" | "Delayed" | "Completed" | "At Risk"> = [
  "On Track", "Delayed", "Completed", "At Risk"
];

const productNamesByCategory: Record<string, string[]> = {
  SaaS: ["TaskGrid flow", "Synthetix API", "Bento CRM Lite", "Optima Docs", "SecureVault Auth", "LocateSentry", "VibeSlack Booster", "Draftify AI", "CloudArch Planner", "SyncFlow Workspace", "Sprintly Business", "HostDash Console"],
  Hardware: ["ThermoNest Mini", "SoundWave ANC Buds", "FitCore Active Watch", "AeroDry HairJet", "Dronix MapFlyer", "PureAir Home", "KeyGlow Mechanical", "VoltCharge PowerBlock", "OptiPrint 3D", "TrackTag SmartFinder"],
  "Consumer Goods": ["KetoCrunch Energy", "HydroSip Infuser", "DriftSleep Mattress", "RoastBean Club", "CleanSprout Detergent", "SoleMate Orthotics", "ZenGardens Kit", "VelvetShave Kit", "Spicewise Set", "ThermaCoat active"],
  EdTech: ["LingoSprint App", "MathPlay Kids", "SkillUp Bootcamp", "EduRead Library", "GradPrep Ultimate", "HistoryQuest VR", "KidCoder Blocks", "LessonPlan Guru", "TalentForge Hub", "UniQuest College advisory"],
  FinTech: ["StockPulse Tracker", "TaxSnap Quick", "CredCheck Pro", "Invoicer Express", "SplitBills Ultimate", "PayStream Micro", "SecureBanc Vault", "YieldForce Robo", "CryptoSafeguard", "SettleDirect"],
  HealthTech: ["GlucoSense Patch", "MindSpa Headband", "DentalStat Cam", "SymptomSearch AI", "OxyPeak Pulse", "DermaScan Mobile", "SleepCycle Pad", "PostureRect Brace", "CalmPulse Breathe", "TeleDoc Urgent"]
};

const customerSegments: Record<string, string[]> = {
  SaaS: ["Solo Consultants", "Agile Tech Startups", "Mid-market Agency owners", "Enterprise Analysts", "Independent Developers", "Freelance Designers"],
  Hardware: ["Gadget Enthusiasts", "Remote Work Professionals", "Biohackers", "Budget-Conscious Techies", "Creative Content Creators"],
  "Consumer Goods": ["Eco-Conscious Millennials", "Busy Working Moms", "Fitness Enthusiasts", "Coffee Lovers", "Urban Minimalists"],
  EdTech: ["Self-Directed Learners", "High-Schoolers", "Career Switchers", "K-12 Parents", "Primary School Districts"],
  FinTech: ["E-commerce Entrepreneurs", "Freelancers & Contractors", "Gen Z First-time Investors", "Crypto Hobbyists", "SMB Accountants"],
  HealthTech: ["Diabetic Patients", "Chronic Stress Sufferers", "Yoga & Meditation Fans", "Geriatric Caretakers", "Fitness-obsessed Gen-Z"]
};

const competitors: Record<string, string[]> = {
  SaaS: ["Trello Pro", "Slack Enterprise", "Salesforce CRM", "Google Drive Enterprise", "Auth0 standard", "Asana Lite"],
  Hardware: ["Ring Camera", "AirPods Apple", "Fitbit Charge", "Dyson Supersonic", "DJI Mini Drone", "Philips Humidifier"],
  "Consumer Goods": ["Quest Bar", "Yeti Tumbler", "Casper Bedding", "Blue Bottle Subscription", "Tide Pods", "Gillette Labs"],
  EdTech: ["Duolingo Plus", "Kahoot Premium", "Coursera Career", "Epic Library", "Magoosh GRE", "Google Classroom"],
  FinTech: ["Robinhood Platinum", "TurboTax Deluxe", "Experian Premium", "FreshBooks Pro", "Splitwise Premium", "PayPal Business"],
  HealthTech: ["Dexcom G6", "Muse 2 Band", "Quip Toothbrush", "Ada Health app", "iHealth Pulse", "Ada DermaScan"]
};

// Generate high quality, consistent, deterministic mock records to reach exactly 105 rows
export function generateInitialRecords(): GTMRecord[] {
  const records: GTMRecord[] = [];

  // Add the initial predefined records first for high-fidelity realism
  seedData.forEach((sd, index) => {
    const leads = sd.expectedLeads;
    const conversions = sd.expectedConversions;
    const convRate = parseFloat(((conversions / leads) * 100).toFixed(1));
    const cac = Math.round(sd.campaignBudget / conversions);
    const revForecast = Math.round(conversions * sd.productPrice);

    records.push({
      id: `GTM-${String(index + 1).padStart(3, "0")}`,
      productName: sd.productName,
      category: sd.category as any,
      targetMarket: sd.targetMarket,
      customerSegment: sd.customerSegment,
      region: sd.region as any,
      competitorName: sd.competitorName,
      competitorPrice: sd.competitorPrice,
      productPrice: sd.productPrice,
      marketingChannel: sd.marketingChannel as any,
      campaignBudget: sd.campaignBudget,
      expectedLeads: leads,
      expectedConversions: conversions,
      conversionRate: convRate,
      cac,
      revenueForecast: revForecast,
      marketDemandScore: sd.marketDemandScore,
      productReadinessScore: sd.productReadinessScore,
      launchPhase: sd.launchPhase as any,
      gtmStatus: sd.gtmStatus as any
    });
  });

  // Now, dynamically generate the rest up to 105 rows
  let currentId = records.length + 1;
  while (currentId <= 105) {
    const category = categories[currentId % categories.length];
    const region = regions[currentId % regions.length];
    const channel = channels[currentId % channels.length];
    const phase = phases[currentId % phases.length];
    const status = statuses[currentId % statuses.length];

    const relativeCategoryProducts = productNamesByCategory[category];
    const rawName = relativeCategoryProducts[currentId % relativeCategoryProducts.length];
    const productName = `${rawName} v${(currentId % 3) + 1}.0`;

    const segmentList = customerSegments[category];
    const customerSegment = segmentList[currentId % segmentList.length];

    const competitorList = competitors[category];
    const competitorName = competitorList[currentId % competitorList.length];

    const basePrice = 20 + (currentId * 7) % 350;
    const productPrice = Math.round(basePrice * 0.85); // 15% discount for penetrative pricing
    const competitorPrice = basePrice;

    const campaignBudget = 5000 + ((currentId * 450) % 45000);
    const expectedLeads = Math.round(campaignBudget * (1.5 + (currentId % 5) * 0.4));
    const expectedConversions = Math.round(expectedLeads * (0.015 + (currentId % 10) * 0.007));

    const convRate = parseFloat(((expectedConversions / expectedLeads) * 100).toFixed(1));
    const cac = expectedConversions > 0 ? Math.round(campaignBudget / expectedConversions) : 0;
    const revenueForecast = Math.round(expectedConversions * productPrice);

    const marketDemandScore = 40 + ((currentId * 13) % 58);
    const productReadinessScore = 50 + ((currentId * 17) % 49);

    records.push({
      id: `GTM-${String(currentId).padStart(3, "0")}`,
      productName,
      category,
      targetMarket: `${category} Adaptability`,
      customerSegment,
      region,
      competitorName,
      competitorPrice,
      productPrice,
      marketingChannel: channel,
      campaignBudget,
      expectedLeads,
      expectedConversions,
      conversionRate: convRate,
      cac,
      revenueForecast,
      marketDemandScore,
      productReadinessScore,
      launchPhase: phase,
      gtmStatus: status
    });

    currentId++;
  }

  return records;
}
