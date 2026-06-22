import React, { useState, useMemo } from "react";
import { 
  Clipboard, 
  Download, 
  Plus, 
  Trash2, 
  CheckSquare, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Map, 
  Lightbulb, 
  HelpCircle,
  Sparkles,
  BarChart2
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const templates = {
  fitnessBand: {
    productName: "PulseBand Student v1.0",
    valueProp: "Helping students balance academic workload and physical wellness through AI-driven sleep, stress, and study-time correlation.",
    targetAudience: "College and high school students who experience frequent burnout",
    category: "AI Wearable Wearable Device",
    uniqueBenefit: "correlates cognitive study fatigue with physical biomarkers to recommend optimized stress breaks",
    competitor: "Fitbit Charge & Apple Watch",
    swot: {
      strengths: ["Highly affordable $89 price tier for students", "Unique focus on study fatigue modeling", "Lightweight hypoallergenic build"],
      weaknesses: ["Low brand recognition compared to giants", "No offline internal GPS", "Limited app store ecosystem"],
      opportunities: ["Strategic partnerships with university health centers", "Gamifed group fitness challenges", "Bulk campus bookstore merchandising"],
      threats: ["Rapid feature copycats by major tech incumbents", "Strict hardware materials inflation", "Academic data-privacy regulations"]
    },
    fixedCosts: 150000,
    variableCost: 35,
    sellingPrice: 89,
    channels: [
      { name: "Instagram Shop & Reels", type: "Paid/Social", partner: "Meta Ads", cost: 12000, reach: "500,000" },
      { name: "Campus Brand Ambassador Network", type: "Owned / Offline", partner: "Student Unions", cost: 4000, reach: "80,000" },
      { name: "Subreddit communities (r/college, r/productivity)", type: "Earned", partner: "Reddit Organic", cost: 0, reach: "120,000" }
    ],
    funnel: { impressions: 100000, clickRate: 4, leadRate: 20, saleRate: 15 },
    tasks: [
      { week: "Week 1-2", task: "Direct student cohort focus group research and competitive pricing audits", done: true },
      { week: "Week 3-4", task: "Distribute 80 beta test hardware bands across 3 partner Universities", done: true },
      { week: "Week 5-6", task: "Rollout Study Break challenge influencer campaigns on TikTok & Instagram", done: false },
      { week: "Week 7", task: "Official digital launch event with student discount vouchers", done: false },
      { week: "Week 8", task: "Harvest postlaunch consumer feedback and calculate initial CAC margins", done: false }
    ],
    kpis: { targetAcq: 2500, targetCac: 25, targetConv: 2.5, targetCsat: 88 }
  },
  resumeBuilder: {
    productName: "ResumeBot AI",
    valueProp: "Generating recruiter-vetted, ATS-optimized markdown resumes in 10 seconds for recent college applicants.",
    targetAudience: "Recent college graduates Entering a highly competitive job market",
    category: "Generative Career SaaS",
    uniqueBenefit: "automatically translates academic course lists into impact-oriented bullet points based on target job listings",
    competitor: "Standard Word Templates / Novoresume",
    swot: {
      strengths: ["Proprietary recruiter parsing feedback loop", "Instant PDF & Markdown formats", "Very affordable price-point"],
      weaknesses: ["Requires active internet access", "Template diversity is initially narrow", "Heavy dependence on target API uptimes"],
      opportunities: ["Integration with university career fair services", "Partnering with bootcamps & online certification portals", "B2B sales to recruitment agency networks"],
      threats: ["Free feature rollouts on general tools", "Changes in LinkedIn data extraction rules", "Apathetic user retention post-hiring"]
    },
    fixedCosts: 40000,
    variableCost: 2,
    sellingPrice: 19,
    channels: [
      { name: "YouTube Tutorials (Career Advice)", type: "Earned Content", partner: "Career Influencers", cost: 3500, reach: "220,000" },
      { name: "LinkedIn Career Ads", type: "Paid Search", partner: "LinkedIn Campaign", cost: 9000, reach: "110,000" },
      { name: "University Job Boards & Portals", type: "Owned Linkages", partner: "Career Centers", cost: 1500, reach: "45,000" }
    ],
    funnel: { impressions: 80000, clickRate: 6, leadRate: 35, saleRate: 22 },
    tasks: [
      { week: "Week 1-2", task: "Compile database of top 500 ATS parser patterns and rulesets", done: true },
      { week: "Week 3-4", task: "Launch free public alpha for feedback on landing pages", done: true },
      { week: "Week 5-6", task: "Sponsor career advice podcasts and secure backlink articles", done: false },
      { week: "Week 7", task: "Graduation season release campaign kickoff", done: false },
      { week: "Week 8", task: "Analyze click-through ratios and user resume generation speeds", done: false }
    ],
    kpis: { targetAcq: 5000, targetCac: 8, targetConv: 4.8, targetCsat: 93 }
  }
};

export default function GTMBuilder() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<"custom" | "fitnessBand" | "resumeBuilder">("fitnessBand");

  // Editable GTM Variables (Initialized with smart fitness band preset)
  const [productName, setProductName] = useState(templates.fitnessBand.productName);
  const [valueProp, setValueProp] = useState(templates.fitnessBand.valueProp);
  const [targetAudience, setTargetAudience] = useState(templates.fitnessBand.targetAudience);
  const [category, setCategory] = useState(templates.fitnessBand.category);
  const [uniqueBenefit, setUniqueBenefit] = useState(templates.fitnessBand.uniqueBenefit);
  const [competitor, setCompetitor] = useState(templates.fitnessBand.competitor);

  // SWOT States
  const [swot, setSwot] = useState(templates.fitnessBand.swot);
  const [newSwotItem, setNewSwotItem] = useState("");
  const [swotSelect, setSwotSelect] = useState<"strengths" | "weaknesses" | "opportunities" | "threats">("strengths");

  // Pricing & Finance Simulator
  const [fixedCosts, setFixedCosts] = useState(templates.fitnessBand.fixedCosts);
  const [variableCost, setVariableCost] = useState(templates.fitnessBand.variableCost);
  const [sellingPrice, setSellingPrice] = useState(templates.fitnessBand.sellingPrice);

  // Channels
  const [channelsList, setChannelsList] = useState(templates.fitnessBand.channels);
  const [newChannel, setNewChannel] = useState({ name: "", type: "Paid", partner: "", cost: 1000, reach: "50,000" });

  // Funnel
  const [funnel, setFunnel] = useState(templates.fitnessBand.funnel);

  // Gantt Tasks
  const [tasks, setTasks] = useState(templates.fitnessBand.tasks);

  // Targets
  const [kpis, setKpis] = useState(templates.fitnessBand.kpis);

  // Load Template preset helper
  const handleTemplateChange = (preset: "custom" | "fitnessBand" | "resumeBuilder") => {
    setSelectedTemplate(preset);
    if (preset === "custom") {
      setProductName("");
      setValueProp("");
      setTargetAudience("");
      setCategory("");
      setUniqueBenefit("");
      setCompetitor("");
      setSwot({ strengths: [], weaknesses: [], opportunities: [], threats: [] });
      setFixedCosts(25000);
      setVariableCost(10);
      setSellingPrice(50);
      setChannelsList([]);
      setFunnel({ impressions: 10000, clickRate: 2, leadRate: 10, saleRate: 5 });
      setTasks([
        { week: "Week 1-2", task: "Direct market research study & baseline audits", done: false },
        { week: "Week 3-4", task: "Complete minimum prototype beta launches", done: false },
        { week: "Week 5-6", task: "Launch high-reach targeted paid channel optimization tests", done: false },
        { week: "Week 7", task: "Main public launch with promotional code campaigns", done: false },
        { week: "Week 8", task: "Harvest actual core conversion metrics and retention reviews", done: false }
      ]);
      setKpis({ targetAcq: 1000, targetCac: 15, targetConv: 2.0, targetCsat: 85 });
    } else {
      const data = templates[preset];
      setProductName(data.productName);
      setValueProp(data.valueProp);
      setTargetAudience(data.targetAudience);
      setCategory(data.category);
      setUniqueBenefit(data.uniqueBenefit);
      setCompetitor(data.competitor);
      setSwot(data.swot);
      setFixedCosts(data.fixedCosts);
      setVariableCost(data.variableCost);
      setSellingPrice(data.sellingPrice);
      setChannelsList(data.channels);
      setFunnel(data.funnel);
      setTasks(data.tasks);
      setKpis(data.kpis);
    }
  };

  // derived calculations on step 5
  const breakEvenUnits = useMemo(() => {
    const margin = sellingPrice - variableCost;
    if (margin <= 0) return 999999;
    return Math.ceil(fixedCosts / margin);
  }, [fixedCosts, variableCost, sellingPrice]);

  // Pricing simulator data for charting
  const breakEvenChartData = useMemo(() => {
    const totalLines = 10;
    const interval = Math.max(Math.ceil((breakEvenUnits * 1.5) / totalLines), 10);
    const chart = [];
    for (let i = 0; i <= totalLines; i++) {
      const units = i * interval;
      const totalRevenue = units * sellingPrice;
      const totalCosts = fixedCosts + units * variableCost;
      chart.push({
        Units: units,
        "Total Costs ($)": totalCosts,
        "Cumulative Revenue ($)": totalRevenue
      });
    }
    return chart;
  }, [breakEvenUnits, fixedCosts, variableCost, sellingPrice]);

  // Derived funnel math
  const funnelMetrics = useMemo(() => {
    const clicks = Math.round(funnel.impressions * (funnel.clickRate / 100));
    const leads = Math.round(clicks * (funnel.leadRate / 100));
    const conversions = Math.round(leads * (funnel.saleRate / 100));
    const totalRevenue = conversions * sellingPrice;
    return { clicks, leads, conversions, totalRevenue };
  }, [funnel, sellingPrice]);

  // SWOT management helpers
  const handleAddSwot = () => {
    if (!newSwotItem.trim()) return;
    setSwot({
      ...swot,
      [swotSelect]: [...swot[swotSelect], newSwotItem.trim()]
    });
    setNewSwotItem("");
  };

  const handleRemoveSwot = (section: keyof typeof swot, idx: number) => {
    const list = [...swot[section]];
    list.splice(idx, 1);
    setSwot({ ...swot, [section]: list });
  };

  // Gantt checklist toggler
  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const totalCompletedTasks = tasks.filter(t => t.done).length;
  const launchProgressPct = Math.round((totalCompletedTasks / tasks.length) * 100);

  // Markdown strategy file compilation string
  const compileMarkdownDoc = () => {
    return `# Go-To-Market (GTM) Executive Strategy Document
## Project: ${productName || "Product Idea Draft"}
### Target Industry segment: ${category || "General Classification"}

---

### 1. Unified Value Proposition Statement
> "${valueProp || "Define core product purpose statement."}"

### 2. Operational Customer Segment & Positioning
* **Target Audience:** ${targetAudience || "Add Segment"}
* **Product Category:** ${category || "Add Category"}
* **Premium Unique Benefit:** ${uniqueBenefit || "Explain primary functional advantage"}
* **Primary Incumbent Competitor:** ${competitor || "Benchmark rival"}

**Positional Synthesis Formula:**
"For **${targetAudience}**, our product **${productName}** is the **${category}** that dynamically **${uniqueBenefit}**, unlike standard options provided by **${competitor}**."

---

### 3. Competitor Benchmarking (SWOT Matrix)
#### Strengths (Internal Core Assets)
${swot.strengths.map(s => `* [x] ${s}`).join("\n") || "* No strengths inputted."}

#### Weaknesses (Internal Gaps)
${swot.weaknesses.map(w => `* [ ] ${w}`).join("\n") || "* No weaknesses inputted."}

#### Opportunities (External Catalysts)
${swot.opportunities.map(o => `* [ ] ${o}`).join("\n") || "* No opportunities inputted."}

#### Threats (Competitive Pressure)
${swot.threats.map(t => `* [ ] ${t}`).join("\n") || "* No threats inputted."}

---

### 4. Pricing & Strategic Financial Baseline
* **Single Product Selling Price:** $${sellingPrice}
* **Variable Production Cost Per Unit:** $${variableCost}
* **Estimated Initial Fixed Outlays:** $${fixedCosts.toLocaleString()}
* **Calculated Units Required to Break-Even:** **${breakEvenUnits.toLocaleString()} units**
* **Projected Initial Margin:** ${sellingPrice > 0 ? Math.round(((sellingPrice - variableCost) / sellingPrice) * 100) : 0}%

---

### 5. Multi-channel Customer Activation Campaigns
${channelsList.map((c, i) => `${i + 1}. **${c.name}** [Type: *${c.type}*] | Platform/Partner: ${c.partner} | Budget Cost: $${c.cost} | Reach: ${c.reach}`).join("\n") || "* No channels specified."}

---

### 6. Interactive Acquisition Funnel projections
* **Estimated Campaign Impressions:** ${funnel.impressions.toLocaleString()}
* **Assumed Click-Through Rate (CTR):** ${funnel.clickRate}%
* **Calculated User Clicks:** ${funnelMetrics.clicks.toLocaleString()}
* **Calculated Prospect Leads:** ${funnelMetrics.leads.toLocaleString()}
* **Concluded Cohort Conversions:** **${funnelMetrics.conversions.toLocaleString()} paying customers**
* **Projected Initial Batch Revenue Capture:** **$${funnelMetrics.totalRevenue.toLocaleString()}**

---

### 7. Gantt Milestone Schedule & Target OKRs
${tasks.map(t => `* [${t.done ? "x" : " "}] ${t.week}: ${t.task}`).join("\n")}

#### Target launch KPIs
* **Assumed Customer Capture Goal:** ${kpis.targetAcq} users
* **Allowable Target Customer Acquisition Cost (CAC):** $${kpis.targetCac}
* **Expected Page Conversion Target:** ${kpis.targetConv}%
* **Target Post-Launch Satisfaction (CSAT):** ${kpis.targetCsat}%

*Compiled on GTM Strategy Portal (AI Studio Applet)*`;
  };

  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(compileMarkdownDoc());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([compileMarkdownDoc()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GTM_Strategy_Report_${productName.replace(/\s+/g, "_")}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid gap-6 md:grid-cols-12" id="gtm-blueprint-creator">
      
      {/* LEFT COLUMN: Steps Tracker & Template Selector */}
      <div className="md:col-span-4 bg-dark-panel border border-border-subtle rounded-xl p-5 space-y-6 md:sticky md:top-24 shadow-md">
        
        {/* Template Quick Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">Choose Workspace Plan</label>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleTemplateChange("fitnessBand")}
              className={`py-2 px-3 text-left rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedTemplate === "fitnessBand"
                  ? "bg-gold border-gold text-black font-bold shadow-md"
                  : "bg-[#161616] hover:bg-[#202020] text-white/70 border-border-subtle"
              }`}
            >
              🚀 Preload: Smart Fitness Band
            </button>
            <button
              onClick={() => handleTemplateChange("resumeBuilder")}
              className={`py-2 px-3 text-left rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedTemplate === "resumeBuilder"
                  ? "bg-gold border-gold text-black font-bold shadow-md"
                  : "bg-[#161616] hover:bg-[#202020] text-white/70 border-border-subtle"
              }`}
            >
              🤖 Preload: AI Resume Builder SaaS
            </button>
            <button
              onClick={() => handleTemplateChange("custom")}
              className={`py-2 px-3 text-left rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedTemplate === "custom"
                  ? "bg-gold border-gold text-black font-bold shadow-md"
                  : "bg-[#161616] hover:bg-[#202020] text-white/70 border-border-subtle"
              }`}
            >
              ✍️ Clear Sheet: Custom Outline
            </button>
          </div>
          <span className="text-[10px] text-white/40 block leading-tight">Preloading instant-fills all steps to demonstrate professional calculations instantly!</span>
        </div>

        {/* Vertical Steps Selector */}
        <div className="space-y-2 border-t border-[#ffffff10] pt-4">
          <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">Launch planning Checklist</label>
          <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
            {[
              "1. Value Prop Definition",
              "2. Customer Segment",
              "3. Competitor SWOT Grid",
              "4. Positioning Statement",
              "5. Pricing Break-Even",
              "6. Channels Plan",
              "7. Marketing Funnel",
              "8. Timeline & Gantt",
              "9. Target KPIs",
              "10. Compile Final PDF"
            ].map((stepLabel, idx) => {
              const stepNum = idx + 1;
              return (
                <button
                  key={stepNum}
                  onClick={() => setActiveStep(stepNum)}
                  className={`w-full text-left py-2 px-3 rounded text-xs transition-all flex items-center justify-between cursor-pointer ${
                    activeStep === stepNum
                      ? "bg-white/5 text-gold font-bold border-l-4 border-gold"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{stepLabel}</span>
                  {activeStep > stepNum && <span className="text-[10px] font-mono text-emerald-400 font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Active Workbook Panel */}
      <div className="md:col-span-8 bg-dark-panel border border-border-subtle rounded-xl p-6 shadow-md min-h-[480px] flex flex-col justify-between text-[#e5e5e5]">
        
        {/* Step Content Shell */}
        <div className="space-y-6">
          
          {/* STEP 1: Product & Value prop details */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 01</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Define Core Product & Value Proposition</h3>
                <p className="text-xs text-white/40">What are we launching, why are we launching it, and who yields rewards from it?</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-white/80">Product Launch Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. FitCore Student Wearable"
                    className="w-full border border-border-subtle bg-[#161616] p-2.5 text-white rounded focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white/80">Value Proposition Statement (1-line hook)</label>
                  <textarea
                    rows={2}
                    value={valueProp}
                    onChange={(e) => setValueProp(e.target.value)}
                    placeholder="e.g. Empowering college students to measure wellness vectors simply..."
                    className="w-full border border-border-subtle bg-[#161616] p-2.5 text-white rounded focus:border-gold focus:outline-none resize-none"
                  />
                  <p className="text-[10px] text-white/40">Focus on the exact pain-point we resolve.</p>
                </div>
              </div>
              
              <div className="rounded-lg bg-emerald-950/10 border border-emerald-500/20 p-4 font-sans text-xs text-emerald-300 space-y-1">
                <strong className="text-emerald-400 block font-serif italic text-sm">Example Student Formula:</strong>
                "Smart Fitness Band for Students – tracks study time, stress, and sleep patterns. Helping students balance study and health with AI-powered wellness tracking."
              </div>
            </div>
          )}

          {/* STEP 2: Customer Personas */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 02</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Identify Target Segmentation Cohorts</h3>
                <p className="text-xs text-white/40">Specify details about our early-adopter beachhead segment.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-white/80">Who is our Beachhead Target Audience?</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Busy Career switchers or Tech-savvy Gen Z students"
                    className="w-full border border-border-subtle bg-[#161616] p-2.5 text-white rounded focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white/80">Product Operational Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Enterprise CRM, IoT Health Wearable, Generative SaaS"
                    className="w-full border border-border-subtle bg-[#161616] p-2.5 text-white rounded focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SWOT Matrix */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 03</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Interactive Competitor SWOT Analysis</h3>
                <p className="text-xs text-white/40">Benchmark properties to find defensive advantages.</p>
              </div>

              {/* SWOT bullet insert form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
                <div className="text-xs">
                  <label className="block text-white/40 mb-1">Select Pillar</label>
                  <select
                    value={swotSelect}
                    onChange={(e) => setSwotSelect(e.target.value as any)}
                    className="w-full border border-border-subtle rounded p-2 bg-[#161616] text-[#e5e5e5] text-xs focus:border-gold focus:outline-none"
                  >
                    <option value="strengths" className="bg-[#111]">Strength (Internal Assets)</option>
                    <option value="weaknesses" className="bg-[#111]">Weakness (Gaps)</option>
                    <option value="opportunities" className="bg-[#111]">Opportunity (External Catalysts)</option>
                    <option value="threats" className="bg-[#111]">Threat (Incumbents)</option>
                  </select>
                </div>
                <div className="sm:col-span-2 flex gap-1.5 text-xs">
                  <input
                    type="text"
                    value={newSwotItem}
                    onChange={(e) => setNewSwotItem(e.target.value)}
                    placeholder="Insert bullet observation..."
                    className="w-full border border-[#ffffff10] bg-[#161616] rounded p-2 text-white focus:outline-none focus:border-gold text-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSwot();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSwot}
                    className="bg-gold text-black font-bold px-4 py-2 rounded text-xs shrink-0 cursor-pointer shadow-md"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Beautiful McKinsey 2x1 grid themed */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono">
                {/* S */}
                <div className="border border-emerald-500/20 rounded bg-emerald-950/10 p-3 space-y-1 h-32 overflow-y-auto">
                  <span className="font-bold text-emerald-400 uppercase text-[10px]">Strengths</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 pl-1">
                    {swot.strengths.map((item, idx) => (
                      <li key={idx} className="group relative justify-between gap-1 items-start">
                        <span>{item}</span>
                        <button type="button" onClick={() => handleRemoveSwot("strengths", idx)} className="text-red-400 opacity-0 group-hover:opacity-100 ml-1 font-sans">×</button>
                      </li>
                    ))}
                    {swot.strengths.length === 0 && <span className="text-white/30 block text-[9px]">None added.</span>}
                  </ul>
                </div>

                {/* W */}
                <div className="border border-red-500/20 rounded bg-red-950/10 p-3 space-y-1 h-32 overflow-y-auto">
                  <span className="font-bold text-red-400 uppercase text-[10px]">Weaknesses</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 pl-1">
                    {swot.weaknesses.map((item, idx) => (
                      <li key={idx} className="group relative justify-between gap-1 items-start">
                        <span>{item}</span>
                        <button type="button" onClick={() => handleRemoveSwot("weaknesses", idx)} className="text-red-400 opacity-0 group-hover:opacity-100 ml-1 font-sans">×</button>
                      </li>
                    ))}
                    {swot.weaknesses.length === 0 && <span className="text-white/30 block text-[9px]">None added.</span>}
                  </ul>
                </div>

                {/* O */}
                <div className="border border-indigo-500/20 rounded bg-indigo-950/10 p-3 space-y-1 h-32 overflow-y-auto">
                  <span className="font-bold text-indigo-400 uppercase text-[10px]">Opportunities</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 pl-1">
                    {swot.opportunities.map((item, idx) => (
                      <li key={idx} className="group relative justify-between gap-1 items-start">
                        <span>{item}</span>
                        <button type="button" onClick={() => handleRemoveSwot("opportunities", idx)} className="text-red-400 opacity-0 group-hover:opacity-100 ml-1 font-sans">×</button>
                      </li>
                    ))}
                    {swot.opportunities.length === 0 && <span className="text-white/30 block text-[9px]">None added.</span>}
                  </ul>
                </div>

                {/* T */}
                <div className="border border-gold/20 rounded bg-gold-muted/10 p-3 space-y-1 h-32 overflow-y-auto">
                  <span className="font-bold text-gold uppercase text-[10px]">Threats</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 pl-1">
                    {swot.threats.map((item, idx) => (
                      <li key={idx} className="group relative justify-between gap-1 items-start">
                        <span>{item}</span>
                        <button type="button" onClick={() => handleRemoveSwot("threats", idx)} className="text-red-400 opacity-0 group-hover:opacity-100 ml-1 font-sans">×</button>
                      </li>
                    ))}
                    {swot.threats.length === 0 && <span className="text-white/30 block text-[9px]">None added.</span>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Positioning Template */}
          {activeStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 04</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Structure Positioning & Brand Narrative</h3>
                <p className="text-xs text-white/40">Use standard business positioning formulas to distinguish your brand.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-white/80">Premium Differentiation Advantage</label>
                  <input
                    type="text"
                    value={uniqueBenefit}
                    onChange={(e) => setUniqueBenefit(e.target.value)}
                    placeholder="e.g. tracks academic stress fatigue metrics natively"
                    className="w-full border border-border-subtle bg-[#161616] p-2.5 text-white rounded focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-white/80">Nearest Direct Competitor</label>
                  <input
                    type="text"
                    value={competitor}
                    onChange={(e) => setCompetitor(e.target.value)}
                    placeholder="e.g. Fitbit, Apple Watch, generic tools"
                    className="w-full border border-border-subtle bg-[#161616] p-2.5 text-white rounded focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic synthesized statement preview */}
              <div className="rounded-xl border border-dashed border-[#ffffff10] bg-[#1a1a1a] p-5 space-y-3">
                <span className="text-[9px] font-mono uppercase text-gold font-bold tracking-wider">FORMULA POSITIONING STATEMENT PREVIEW</span>
                <p className="font-sans text-base text-white/90 leading-relaxed italic">
                  "For <strong className="text-white font-semibold">{targetAudience || "[Target Audience]"}</strong>, our product <strong className="text-white font-semibold">{productName || "[Product Name]"}</strong> is the <strong className="text-white font-semibold">{category || "[Category]"}</strong> that dynamically <strong className="text-gold font-semibold">{uniqueBenefit || "[Differentiation Advantage]"}</strong>, unlike competitors like <strong className="text-white font-semibold">{competitor || "[Competitor Name]"}</strong>."
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Pricing Strategy & Break Even Line Chart */}
          {activeStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 05</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Pricing Model & Break-Even Simulation</h3>
                <p className="text-xs text-white/40">Calculate single-unit margin rules and capital recoverability.</p>
              </div>

              {/* Dynamic Input Simulator */}
              <div className="grid gap-3 sm:grid-cols-3 bg-[#161616] p-4 border border-border-subtle rounded-lg text-xs font-mono">
                <div className="space-y-1">
                  <label className="block text-white/50">Fixed Cost outlays ($)</label>
                  <input
                    type="number"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(Number(e.target.value))}
                    className="w-full p-2 border border-border-subtle rounded bg-[#222] font-mono text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-white/50">Variable unit cost ($)</label>
                  <input
                    type="number"
                    value={variableCost}
                    onChange={(e) => setVariableCost(Number(e.target.value))}
                    className="w-full p-2 border border-border-subtle rounded bg-[#222] font-mono text-white focus:outline-none focus:border-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-white/50">Selling price ($)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full p-2 border border-border-subtle rounded bg-[#222] font-mono text-white focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Math calculation outcome */}
              <div className="grid grid-cols-2 gap-4 text-center py-2.5">
                <div className="border border-border-subtle rounded-lg p-3 bg-white/5 shadow-md">
                  <span className="text-[10px] font-mono text-white/40 block">BREAK-EVEN VOLUME</span>
                  <span className="text-xl font-mono font-bold text-gold">
                    {breakEvenUnits.toLocaleString()} units
                  </span>
                </div>
                <div className="border border-border-subtle rounded-lg p-3 bg-white/5 shadow-md">
                  <span className="text-[10px] font-mono text-white/40 block">UNIT CONTRIBUTION MARGIN</span>
                  <span className="text-xl font-mono font-bold text-emerald-400">
                    ${(sellingPrice - variableCost) > 0 ? (sellingPrice - variableCost) : 0}
                  </span>
                </div>
              </div>

              {/* Interactive Break Even Line Chart */}
              <div className="h-52 border border-border-subtle rounded-lg p-3 bg-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={breakEvenChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="Units" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 9, fill: "#ffffff60" }} />
                    <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 9, fill: "#ffffff60" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }} formatter={(value) => [`$${value.toLocaleString()}`]} />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Line type="monotone" dataKey="Cumulative Revenue ($)" stroke="#c5a059" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Total Costs ($)" stroke="rgba(255,255,255,0.4)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* STEP 6: Distribution channels plan */}
          {activeStep === 6 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 06</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Multi-Channel Distribution Strategy</h3>
                <p className="text-xs text-white/40">Map owned, earned, and paid marketing pipelines.</p>
              </div>

              {/* Dynamic channel table insert form */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end text-xs">
                <div className="sm:col-span-2">
                  <label className="text-white/50 mb-1 block">Channel Outlet</label>
                  <input
                    type="text"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                    placeholder="e.g LinkedIn Organic Reels"
                    className="p-2 border border-[#ffffff10] bg-[#161616] text-white w-full rounded focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-white/50 mb-1 block">Platform/Partner</label>
                  <input
                    type="text"
                    value={newChannel.partner}
                    onChange={(e) => setNewChannel({ ...newChannel, partner: e.target.value })}
                    placeholder="e.g Meta Ads"
                    className="p-2 border border-[#ffffff10] bg-[#161616] text-white w-full rounded focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-white/50 mb-1 block">Est. Cost ($)</label>
                  <input
                    type="number"
                    value={newChannel.cost}
                    onChange={(e) => setNewChannel({ ...newChannel, cost: Number(e.target.value) })}
                    className="p-2 border border-[#ffffff10] bg-[#161616] text-white w-full rounded focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newChannel.name.trim()) return;
                      setChannelsList([...channelsList, newChannel]);
                      setNewChannel({ name: "", type: "Paid", partner: "", cost: 1000, reach: "50,000" });
                    }}
                    className="bg-gold text-black font-bold px-3 py-2 rounded text-xs w-full cursor-pointer shadow-md"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Channels Grid display */}
              <div className="border border-border-subtle rounded-lg overflow-x-auto text-[11px] font-sans">
                <table className="w-full text-left">
                  <thead className="bg-[#1c1c1c] font-mono text-[9px] uppercase tracking-wider border-b border-border-subtle text-white/50">
                    <tr>
                      <th className="p-2 pl-3">Outlet Channel</th>
                      <th className="p-2">Partner Platform</th>
                      <th className="p-2 text-right">Cost ($)</th>
                      <th className="p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffffff03]">
                    {channelsList.map((ch, idx) => (
                      <tr key={idx} className="hover:bg-[#ffffff02]">
                        <td className="p-2 pl-3 font-semibold text-white">{ch.name}</td>
                        <td className="p-2 text-white/60">{ch.partner || "Direct Organic"}</td>
                        <td className="p-2 text-right font-mono text-gold">${ch.cost.toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...channelsList];
                              list.splice(idx, 1);
                              setChannelsList(list);
                            }}
                            className="text-red-400 hover:bg-white/10 p-1.5 rounded cursor-pointer font-sans"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                    {channelsList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-white/30 italic">No channels added yet. Click parameters above to insert custom outlets.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STEP 7: Marketing Funnel with live SVG visualization */}
          {activeStep === 7 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 07</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Interactive Marketing Funnel Visualizer</h3>
                <p className="text-xs text-white/40">Simulate leads progression down the standard conversion pipeline.</p>
              </div>

              {/* Slicers inputs */}
              <div className="grid gap-3 sm:grid-cols-4 text-xs font-mono bg-[#161616] p-3 rounded-lg border border-border-subtle">
                <div className="space-y-1">
                  <label className="text-white/50">Impressions</label>
                  <input
                    type="number"
                    step="1000"
                    value={funnel.impressions}
                    onChange={(e) => setFunnel({...funnel, impressions: Number(e.target.value)})}
                    className="p-1.5 border border-[#ffffff10] rounded w-full bg-[#222] text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/50">CTR %</label>
                  <input
                    type="number"
                    step="0.5"
                    value={funnel.clickRate}
                    onChange={(e) => setFunnel({...funnel, clickRate: Number(e.target.value)})}
                    className="p-1.5 border border-[#ffffff10] rounded w-full bg-[#222] text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/50">Lead Conv. %</label>
                  <input
                    type="number"
                    step="1"
                    value={funnel.leadRate}
                    onChange={(e) => setFunnel({...funnel, leadRate: Number(e.target.value)})}
                    className="p-1.5 border border-[#ffffff10] rounded w-full bg-[#222] text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/50">Close Conv. %</label>
                  <input
                    type="number"
                    step="1"
                    value={funnel.saleRate}
                    onChange={(e) => setFunnel({...funnel, saleRate: Number(e.target.value)})}
                    className="p-1.5 border border-[#ffffff10] rounded w-full bg-[#222] text-white font-mono"
                  />
                </div>
              </div>

              {/* Graphic SVG Funnel display */}
              <div className="relative border border-border-subtle rounded-xl bg-white/5 p-4 flex flex-col md:flex-row items-center justify-around gap-4 shadow-md">
                
                {/* SVG Visual */}
                <div className="w-56 shrink-0">
                  <svg viewBox="0 0 100 80" className="w-full h-auto drop-shadow-sm">
                    {/* Top block */}
                    <polygon points="5,5 95,5 80,22 20,22" fill="#c5a059" opacity="0.9" />
                    {/* Clicks block */}
                    <polygon points="21,24 79,24 65,41 35,41" fill="#c5a059" opacity="0.75" />
                    {/* Leads block */}
                    <polygon points="36,43 64,43 53,60 47,60" fill="#c5a059" opacity="0.5" />
                    {/* conversions block */}
                    <polygon points="48,62 52,62 51,78 49,78" fill="#22c55e" opacity="0.95" />
                  </svg>
                </div>

                {/* Stat bullet explanations */}
                <div className="space-y-2 text-xs font-mono w-full">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/40">1. Impressions (Awareness)</span>
                    <strong className="text-white">{funnel.impressions.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-white/80">
                    <span>2. Clicks ({funnel.clickRate}% CTR)</span>
                    <strong className="text-white">{funnelMetrics.clicks.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-indigo-300">
                    <span>3. Leads ({funnel.leadRate}% Rate)</span>
                    <strong className="text-white">{funnelMetrics.leads.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-emerald-400">
                    <span>4. Sales ({funnel.saleRate}% Closes)</span>
                    <strong className="text-[#22c55e] border-b border-emerald-500/20 font-bold">{funnelMetrics.conversions.toLocaleString()} customers</strong>
                  </div>
                  
                  <div className="bg-gold text-black rounded p-3 text-center font-serif font-bold text-sm shadow-md">
                    PROJECTED SEGMENT REVENUE: ${funnelMetrics.totalRevenue.toLocaleString()}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 8: Gantt timeline checklist */}
          {activeStep === 8 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 08</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Operational GTM Roadmap Timeline</h3>
                <p className="text-xs text-white/40">Check tasks off to simulate launch readiness margins.</p>
              </div>

              {/* Progress feedback banner */}
              <div className="bg-white/5 border border-border-subtle rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                  <span>Project Launch Roadmap Completion</span>
                  <span className="font-bold text-gold">{launchProgressPct}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a] h-2.5 rounded overflow-hidden">
                  <div className="h-full bg-gold transition-all duration-500 shadow-[0_0_10px_rgba(197,160,89,0.2)]" style={{ width: `${launchProgressPct}%` }} />
                </div>
              </div>

              {/* Checklist list */}
              <div className="space-y-2 text-xs">
                {tasks.map((task, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      task.done 
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300 font-semibold shadow-sm"
                        : "bg-[#ffffff02] border-[#ffffff10] hover:bg-white/5 text-white/70"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(idx)}
                      className="rounded accent-gold h-4 w-4 shrink-0"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 items-center w-full">
                      <span className="sm:col-span-3 font-mono text-[10px] uppercase text-white/40 font-semibold">{task.week}</span>
                      <span className="sm:col-span-9">{task.task}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: KPI Target metrics Setting */}
          {activeStep === 9 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 09</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">GTM Target Success Metrics (OKRs)</h3>
                <p className="text-xs text-white/40">Set key targets to validate product launch post-launch health of campaigns.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs font-mono">
                <div className="space-y-1 p-3 bg-[#161616] border border-border-subtle rounded-lg">
                  <label className="text-white/50 block">Customer Acq. Goal</label>
                  <input
                    type="number"
                    value={kpis.targetAcq}
                    onChange={(e) => setKpis({ ...kpis, targetAcq: Number(e.target.value) })}
                    className="w-full p-2 border border-border-subtle bg-[#222] text-white font-mono rounded"
                  />
                  <p className="text-[10px] text-white/30">Total paying users targeted.</p>
                </div>
                
                <div className="space-y-1 p-3 bg-[#161616] border border-border-subtle rounded-lg">
                  <label className="text-white/50 block">Target Permissible CAC ($)</label>
                  <input
                    type="number"
                    value={kpis.targetCac}
                    onChange={(e) => setKpis({ ...kpis, targetCac: Number(e.target.value) })}
                    className="w-full p-2 border border-border-subtle bg-[#222] text-white font-mono rounded"
                  />
                  <p className="text-[10px] text-white/30">Max customer boarding cost.</p>
                </div>

                <div className="space-y-1 p-3 bg-[#161616] border border-border-subtle rounded-lg">
                  <label className="text-white/50 block">Lead Conversion Target (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={kpis.targetConv}
                    onChange={(e) => setKpis({ ...kpis, targetConv: Number(e.target.value) })}
                    className="w-full p-2 border border-border-subtle bg-[#222] text-white font-mono rounded"
                  />
                  <p className="text-[10px] text-white/30">Optimal landing conversion metric.</p>
                </div>

                <div className="space-y-1 p-3 bg-[#161616] border border-border-subtle rounded-lg">
                  <label className="text-white/50 block">Target CSAT Feedback (%)</label>
                  <input
                    type="number"
                    value={kpis.targetCsat}
                    onChange={(e) => setKpis({ ...kpis, targetCsat: Number(e.target.value) })}
                    className="w-full p-2 border border-border-subtle bg-[#222] text-white font-mono rounded"
                  />
                  <p className="text-[10px] text-white/30">Customer sentiment tracker index.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: Compilation & MD Downloader */}
          {activeStep === 10 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-[#ffffff10] pb-2">
                <span className="text-[10px] font-mono uppercase bg-gold text-black font-semibold rounded px-1.5 py-0.5">Step 10</span>
                <h3 className="font-serif font-bold text-white text-lg mt-1">Review & Compile Strategy Plan</h3>
                <p className="text-xs text-white/40">Your inputs have been compiled into a professional Markdown document, ready for download.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 bg-gold text-black font-bold rounded px-4 py-2.5 text-xs hover:bg-gold-hover cursor-pointer shadow-md transition-all duration-300"
                >
                  <Clipboard className="h-4 w-4" /> {copied ? "Copied Strategy! ✓" : "Copy Markdown Strategy"}
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1.5 border border-border-subtle rounded px-4 py-2.5 text-xs font-semibold text-[#e5e5e5] hover:bg-white/5 cursor-pointer"
                >
                  <Download className="h-4 w-4" /> Download Markdown File
                </button>
              </div>

              {/* Document Text Box preview */}
              <div className="bg-[#0c0c0c] text-[#d4d4d4] font-mono text-[10px] rounded-xl p-4 h-64 overflow-y-auto border border-border-subtle leading-normal whitespace-pre-wrap select-all">
                {compileMarkdownDoc()}
              </div>

            </div>
          )}

        </div>

        {/* BOTTOM STEP CONTROLS BAR */}
        <div className="flex items-center justify-between border-t border-[#ffffff10] pt-4 mt-6">
          <button
            onClick={() => setActiveStep(Math.max(activeStep - 1, 1))}
            disabled={activeStep === 1}
            className="px-4 py-1.5 border border-border-subtle rounded text-xs font-semibold text-white/70 hover:bg-white/5 disabled:opacity-30 cursor-pointer"
          >
            ← Back
          </button>
          
          <div className="text-[11px] font-mono text-white/40">
            Progress step {activeStep} of 10
          </div>

          {activeStep === 10 ? (
            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded text-xs cursor-pointer shadow-md"
            >
              Export Report ✓
            </button>
          ) : (
            <button
              onClick={() => setActiveStep(Math.min(activeStep + 1, 10))}
              className="px-4 py-1.5 bg-gold hover:bg-gold-hover text-black font-bold rounded text-xs cursor-pointer shadow-md"
            >
              Continue →
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
