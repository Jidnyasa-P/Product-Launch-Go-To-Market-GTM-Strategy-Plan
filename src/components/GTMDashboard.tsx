import React, { useState, useMemo } from "react";
import { GTMRecord } from "../data/gtmDataset";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { DollarSign, ShieldAlert, Sparkles, Filter, RefreshCw, BarChart2, CheckCircle, Flame, Calendar, Activity } from "lucide-react";

interface GTMDashboardProps {
  records: GTMRecord[];
  onResetFilters?: () => void;
}

export default function GTMDashboard({ records }: GTMDashboardProps) {
  // Slicer States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedPhase, setSelectedPhase] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(1300);

  // Available options
  const filterOptions = useMemo(() => {
    return {
      categories: ["All", "SaaS", "Hardware", "Consumer Goods", "EdTech", "FinTech", "HealthTech"],
      regions: ["All", "North America", "Europe", "Asia-Pacific", "Latin America"],
      phases: ["All", "Pre-Launch", "Beta Testing", "Launch Event", "Post-Launch"],
      statuses: ["All", "On Track", "Delayed", "Completed", "At Risk"]
    };
  }, []);

  // Filter Logic
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchCat = selectedCategory === "All" || r.category === selectedCategory;
      const matchReg = selectedRegion === "All" || r.region === selectedRegion;
      const matchPhase = selectedPhase === "All" || r.launchPhase === selectedPhase;
      const matchStatus = selectedStatus === "All" || r.gtmStatus === selectedStatus;
      const matchPrice = r.productPrice <= maxPrice;
      return matchCat && matchReg && matchPhase && matchStatus && matchPrice;
    });
  }, [records, selectedCategory, selectedRegion, selectedPhase, selectedStatus, maxPrice]);

  // Aggregate Metrics for Top Level Cards
  const kpis = useMemo(() => {
    const totalRevenue = filteredRecords.reduce((sum, r) => sum + r.revenueForecast, 0);
    const totalBudget = filteredRecords.reduce((sum, r) => sum + r.campaignBudget, 0);
    const totalLeads = filteredRecords.reduce((sum, r) => sum + r.expectedLeads, 0);
    const totalConversions = filteredRecords.reduce((sum, r) => sum + r.expectedConversions, 0);

    const avgDemand = filteredRecords.length > 0
      ? Math.round(filteredRecords.reduce((sum, r) => sum + r.marketDemandScore, 0) / filteredRecords.length)
      : 0;

    const avgReadiness = filteredRecords.length > 0
      ? Math.round(filteredRecords.reduce((sum, r) => sum + r.productReadinessScore, 0) / filteredRecords.length)
      : 0;

    // CAC = Budget / Conversions
    const avgCac = totalConversions > 0 ? Math.round(totalBudget / totalConversions) : 0;

    // Conversion rate
    const convRate = totalLeads > 0 ? parseFloat(((totalConversions / totalLeads) * 100).toFixed(2)) : 0;

    return {
      totalRevenue,
      totalBudget,
      totalLeads,
      totalConversions,
      avgDemand,
      avgReadiness,
      avgCac,
      convRate,
      count: filteredRecords.length
    };
  }, [filteredRecords]);

  // Data aggregators for Recharts
  const customerSegData = useMemo(() => {
    const map: Record<string, { name: string; ExpectedRevenue: number; ExpectedConversions: number }> = {};
    filteredRecords.forEach((r) => {
      const seg = r.customerSegment;
      if (!map[seg]) {
        map[seg] = { name: seg, ExpectedRevenue: 0, ExpectedConversions: 0 };
      }
      map[seg].ExpectedRevenue += r.revenueForecast;
      map[seg].ExpectedConversions += r.expectedConversions;
    });
    return Object.values(map).slice(0, 8); // top 8 segments
  }, [filteredRecords]);

  const channelRoiData = useMemo(() => {
    const map: Record<string, { channel: string; Budget: number; Revenue: number }> = {};
    filteredRecords.forEach((r) => {
      const chan = r.marketingChannel;
      if (!map[chan]) {
        map[chan] = { channel: chan, Budget: 0, Revenue: 0 };
      }
      map[chan].Budget += r.campaignBudget;
      map[chan].Revenue += r.revenueForecast;
    });
    return Object.values(map).map((item) => {
      const roi = item.Budget > 0 ? parseFloat(((item.Revenue / item.Budget) * 100).toFixed(0)) : 0;
      return {
        name: item.channel,
        "Spend Budget ($)": item.Budget,
        "ROI (%)": roi
      };
    });
  }, [filteredRecords]);

  const competitorPriceData = useMemo(() => {
    return filteredRecords.slice(0, 10).map((r) => ({
      name: r.productName,
      "Our Price ($)": r.productPrice,
      "Competitor Price ($)": r.competitorPrice
    }));
  }, [filteredRecords]);

  const phaseDistribution = useMemo(() => {
    const counts: Record<string, number> = { "Pre-Launch": 0, "Beta Testing": 0, "Launch Event": 0, "Post-Launch": 0 };
    filteredRecords.forEach((r) => {
      if (counts[r.launchPhase] !== undefined) {
        counts[r.launchPhase]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredRecords]);

  const COLORS = ["#c5a059", "#818cf8", "#34d399", "#fdba74"];

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedRegion("All");
    setSelectedPhase("All");
    setSelectedStatus("All");
    setMaxPrice(1300);
  };

  return (
    <div className="grid gap-6 md:grid-cols-12 items-start" id="gtm-dashboard-root">
      
      {/* SIDEBAR SECTION: Filters and Slicers (3-cols on desktop) */}
      <div className="md:col-span-3 bg-dark-panel border border-border-subtle rounded-xl p-5 space-y-6 md:sticky md:top-24 shadow-md">
        <div className="flex items-center justify-between border-b border-[#ffffff10] pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold" />
            <h3 className="font-serif font-bold text-white text-sm">Interactive Slicers</h3>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-mono text-white/40 hover:text-[#e5e5e5] transition-colors uppercase cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" /> Reset
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">Product Category</label>
          <div className="grid grid-cols-2 gap-1.5">
            {filterOptions.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-2.5 rounded text-left text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? "bg-gold text-black shadow-md font-bold"
                    : "bg-[#161616] border border-[#ffffff05] hover:bg-[#202020] text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">Target Region</label>
          <div className="flex flex-wrap gap-1">
            {filterOptions.regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`py-1 px-2.5 text-xs font-semibold rounded cursor-pointer transition-all ${
                  selectedRegion === reg
                    ? "bg-gold text-black shadow-md font-bold"
                    : "bg-[#161616] border border-[#ffffff05] hover:bg-[#202020] text-white/70"
                }`}
              >
                {reg === "All" ? "Global" : reg}
              </button>
            ))}
          </div>
        </div>

        {/* Launch Phase */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">Launch Phase</label>
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="w-full text-xs rounded-lg border border-border-subtle bg-[#161616] p-2 text-white/90 focus:outline-none focus:border-gold"
          >
            {filterOptions.phases.map((ph) => (
              <option key={ph} value={ph} className="bg-[#161616] text-[#e5e5e5]">
                {ph === "All" ? "All Phases" : ph}
              </option>
            ))}
          </select>
        </div>

        {/* GTM Status */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">GTM Operational Status</label>
          <div className="flex flex-col gap-1.5">
            {filterOptions.statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`w-full py-1.5 px-3 rounded text-left text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                  selectedStatus === st
                    ? "bg-gold text-black shadow-md font-bold"
                    : "bg-[#161616] border border-[#ffffff05] hover:bg-[#202020] text-white/70"
                }`}
              >
                <span>{st}</span>
                {st === "On Track" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"/>}
                {st === "Delayed" && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block"/>}
                {st === "Completed" && <span className="h-1.5 w-1.5 rounded-full bg-blue-400 inline-block"/>}
                {st === "At Risk" && <span className="h-1.5 w-1.5 rounded-full bg-red-400 inline-block"/>}
              </button>
            ))}
          </div>
        </div>

        {/* Price slider */}
        <div className="space-y-2 pt-2 border-t border-[#ffffff10]">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/40">Max Market Price</label>
            <span className="text-xs font-mono font-bold text-gold">${maxPrice}</span>
          </div>
          <input
            type="range"
            min="10"
            max="1300"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-gold h-1.5 bg-[#1a1a1a] rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-white/40 block text-right">Filters out premium outlier prices.</span>
        </div>

        {/* Quick summary check */}
        <div className="rounded-lg bg-white/5 p-3 border border-border-subtle space-y-1">
          <div className="text-[10px] font-mono text-white/40">Record Pool Size</div>
          <div className="text-xl font-serif italic text-gold font-bold">{filteredRecords.length} / {records.length}</div>
          <div className="text-[9px] text-[#e5e5e5]/40 font-sans">Dynamic subset matched based on slicers.</div>
        </div>
      </div>

      {/* RIGHT MAIN SECTION: Analytics Content (9-cols on desktop) */}
      <div className="md:col-span-9 space-y-6">
        
        {/* TOP SECTION: KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Revenue Forecast KPI */}
          <div className="bg-dark-panel border border-border-subtle rounded-xl p-4 shadow-sm space-y-1.5 relative overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-[3px] bg-gold" />
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[9px] font-mono uppercase tracking-wider">Revenue Forecast</span>
              <DollarSign className="h-4 w-4 text-gold group-hover:text-gold-hover transition-colors" />
            </div>
            <div className="text-lg md:text-xl font-mono font-bold text-white">
              ${kpis.totalRevenue.toLocaleString()}
            </div>
            <p className="text-[9px] text-white/40 leading-none">Expected absolute yield</p>
          </div>

          {/* Market Demand Score KPI */}
          <div className="bg-dark-panel border border-[#ffffff10] rounded-xl p-4 shadow-sm space-y-1.5 relative overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500" />
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[9px] font-mono uppercase tracking-wider">Demand Score</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-lg md:text-xl font-mono font-bold text-emerald-400">
              {kpis.avgDemand} <span className="text-xs font-normal text-white/40">/ 100</span>
            </div>
            <p className="text-[9px] text-white/40 leading-none">Weighted product desirability</p>
          </div>

          {/* CAC KPI */}
          <div className="bg-dark-panel border border-[#ffffff10] rounded-xl p-4 shadow-sm space-y-1.5 relative overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-[3px] bg-indigo-500" />
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[9px] font-mono uppercase tracking-wider">Average CAC</span>
              <Flame className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="text-lg md:text-xl font-mono font-bold text-indigo-400">
              ${kpis.avgCac}
            </div>
            <p className="text-[9px] text-white/40 leading-none">Marketing spend per conversion</p>
          </div>

          {/* Conversion Rate KPI */}
          <div className="bg-dark-panel border border-[#ffffff10] rounded-xl p-4 shadow-sm space-y-1.5 relative overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-[3px] bg-amber-500" />
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[9px] font-mono uppercase tracking-wider">Conversion Rate</span>
              <BarChart2 className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-lg md:text-xl font-mono font-bold text-amber-400">
              {kpis.convRate}%
            </div>
            <p className="text-[9px] text-white/40 leading-none">Lead-to-paying conversion</p>
          </div>

          {/* GTM Readiness KPI */}
          <div className="bg-dark-panel border border-[#ffffff10] rounded-xl col-span-2 md:col-span-1 p-4 shadow-sm space-y-1.5 relative overflow-hidden group">
            <span className="absolute top-0 left-0 w-full h-[3px] bg-violet-500" />
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[9px] font-mono uppercase tracking-wider">GTM Readiness</span>
              <CheckCircle className="h-4 w-4 text-violet-400" />
            </div>
            <div className="text-lg md:text-xl font-mono font-bold text-violet-400">
              {kpis.avgReadiness}%
            </div>
            <p className="text-[9px] text-white/40 leading-none">Ready launch parameters</p>
          </div>
        </div>

        {/* EMPTY STATE ALERT */}
        {filteredRecords.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#ffffff15] bg-[#111] p-12 text-center space-y-4">
            <ShieldAlert className="h-10 w-10 text-white/30 mx-auto" />
            <div className="space-y-1 animate-pulse">
              <h3 className="font-serif italic font-bold text-white text-lg">No Matching GTM Datasets</h3>
              <p className="text-sm text-white/50">Simplify your sidebar filter options or increase the maximum price slider limits.</p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gold text-black rounded-lg text-xs font-bold hover:bg-gold-hover cursor-pointer shadow-md"
            >
              Reset Slicer Metrics
            </button>
          </div>
        )}

        {filteredRecords.length > 0 && (
          <>
            {/* MIDDLE SECTION: Customer segment & competitor charts */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Customer Segment expected revenue bar chart */}
              <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffffff05] pb-2">
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">Customer Segment Capture</h4>
                    <p className="text-[11px] text-white/40">Projected aggregate revenue forecasts by segment cohort</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-white/60">Top Categories</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customerSegData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#ffffff60" }} stroke="rgba(255,255,255,0.15)" />
                      <YAxis tick={{ fontSize: 9, fill: "#ffffff60" }} stroke="rgba(255,255,255,0.15)" />
                      <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }} formatter={(value) => [`$${value.toLocaleString()}`, 'Expected Revenue']} />
                      <Bar dataKey="ExpectedRevenue" fill="#c5a059" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Marketing Channel Spend & ROI comparison path */}
              <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffffff05] pb-2">
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">Marketing Channel Spend vs ROI</h4>
                    <p className="text-[11px] text-white/40">Compares capital allocation budgets against yield multiplier efficiency</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-gold/10 text-[9px] font-mono text-gold border border-gold/25">Efficiency Index</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelRoiData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#ffffff60" }} stroke="rgba(255,255,255,0.15)" />
                      <YAxis yAxisId="left" orientation="left" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 9, fill: "#ffffff60" }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#c5a059" tick={{ fontSize: 9, fill: "#c5a059" }} />
                      <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }} />
                      <Legend wrapperStyle={{ fontSize: 9 }} />
                      <Bar yAxisId="left" dataKey="Spend Budget ($)" fill="rgba(255,255,255,0.35)" radius={[2, 2, 0, 0]} />
                      <Bar yAxisId="right" dataKey="ROI (%)" fill="#c5a059" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* SECOND CHART DUO: Pricing benchmarks & Phase Allocation */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Product vs Competitor Price benchmarks line */}
              <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffffff05] pb-2">
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">Product Price Benchmarking</h4>
                    <p className="text-[11px] text-white/40">Comparing our pricing architecture against nearest competitor pricing</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-gold border border-gold/15">Pricing Moat</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={competitorPriceData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fontSize: 8, fill: "#ffffff60" }} stroke="rgba(255,255,255,0.15)" />
                      <YAxis tick={{ fontSize: 9, fill: "#ffffff60" }} stroke="rgba(255,255,255,0.15)" />
                      <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }} />
                      <Legend wrapperStyle={{ fontSize: 9 }} />
                      <Line type="monotone" dataKey="Our Price ($)" stroke="#c5a059" strokeWidth={2.5} dot={{ r: 3, fill: "#c5a059" }} />
                      <Line type="monotone" dataKey="Competitor Price ($)" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} strokeDasharray="5 5" dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Launch Phase Allocation (Pie) */}
              <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffffff05] pb-2">
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">Launch Phase Allocation</h4>
                    <p className="text-[11px] text-white/40">Division of active initiatives throughout operational steps</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-white/60">Product Count</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center">
                  <div className="h-60 sm:col-span-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={phaseDistribution}
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {phaseDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="sm:col-span-4 space-y-2 text-xs">
                    {phaseDistribution.map((entry, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-[#ffffff05] pb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                          <span className="truncate text-white/70 font-medium text-[11px]">{entry.name}</span>
                        </div>
                        <span className="font-mono text-gold font-bold">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM DUAL SECTION: Risk matrix & Timeline */}
            <div className="grid gap-6 md:grid-cols-12">
              
              {/* Product positioning / Risk matrix */}
              <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-sm md:col-span-5 space-y-4">
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">Demand vs Readiness Risks</h4>
                  <p className="text-[11px] text-white/40">Mapping items onto BCG-style planning quadrants</p>
                </div>
                
                <div className="relative border border-[#ffffff10] rounded-lg bg-[#ffffff03] p-4 font-mono text-[9px]">
                  {/* Quadrant display */}
                  <div className="grid grid-cols-2 gap-2 h-44">
                    {/* Top Left: Underpowered */}
                    <div className="border border-indigo-500/20 bg-indigo-950/20 rounded p-1.5 flex flex-col justify-between">
                      <span className="font-bold text-indigo-300">Underpowered Innovation</span>
                      <p className="text-[8px] text-indigo-400">High Readiness but lower consumer demand scores</p>
                    </div>
                    {/* Top Right: Ready to scale */}
                    <div className="border border-gold/20 bg-gold-muted/10 rounded p-1.5 flex flex-col justify-between">
                      <span className="font-bold text-gold">Ready to Scale</span>
                      <p className="text-[8px] text-gold/80">High demand metrics & high readiness parameter scores</p>
                    </div>
                    {/* Bottom Left: Low priority */}
                    <div className="border border-white/10 bg-white/5 rounded p-1.5 flex flex-col justify-between">
                      <span className="font-bold text-white/60">Low Priority/Review</span>
                      <p className="text-[8px] text-white/40">Lagging scores on both interest & engineering metrics</p>
                    </div>
                    {/* Bottom Right: Urgent revamp */}
                    <div className="border border-red-500/20 bg-red-950/20 rounded p-1.5 flex flex-col justify-between">
                      <span className="font-bold text-red-300">High Friction / Revamp</span>
                      <p className="text-[8px] text-red-400">Strong market desire but engineering metrics need catchup</p>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-[9px] text-white/40">
                    Calculated using Market Demand vs Product Readiness Indexes
                  </div>
                </div>
              </div>

              {/* Dynamic GTM Launch Roadmap dashboard */}
              <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-sm md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-white text-sm">Launch Timeline Priorities</h4>
                    <p className="text-[11px] text-white/40">Active product schedules sorted by current phase</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-gold/10 border border-gold/20 text-gold rounded px-2 py-0.5">
                    <Calendar className="h-3 w-3" /> Gantt Overview
                  </span>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {filteredRecords.slice(0, 5).map((r, idx) => {
                    let pct = "40%";
                    let color = "bg-white/40";
                    if (r.launchPhase === "Pre-Launch") { pct = "25%"; color = "bg-amber-400"; }
                    else if (r.launchPhase === "Beta Testing") { pct = "50%"; color = "bg-indigo-400"; }
                    else if (r.launchPhase === "Launch Event") { pct = "75%"; color = "bg-gold"; }
                    else if (r.launchPhase === "Post-Launch") { pct = "100%"; color = "bg-emerald-400"; }

                    return (
                      <div key={idx} className="border border-border-subtle rounded-lg p-2.5 bg-[#ffffff02] space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif font-semibold text-white truncate max-w-xs">{r.productName}</span>
                          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                            {r.region} | {r.marketingChannel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-[#1c1c1c] h-1.5 rounded overflow-hidden">
                            <div className={`h-full ${color} transition-all duration-500`} style={{ width: pct }} />
                          </div>
                          <span className="font-mono text-[10px] text-white/40 whitespace-nowrap">{r.launchPhase}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </>
        )}
      </div>

    </div>
  );
}
