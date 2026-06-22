import React, { useState } from "react";
import { BookOpen, AlertTriangle, Lightbulb, Users, GraduationCap, TrendingUp, Compass, Target, ArrowRight } from "lucide-react";

export default function GTMOverview() {
  const [activeRole, setActiveRole] = useState<string>("BA");

  const roles = [
    {
      id: "BA",
      name: "Business Analyst",
      salary: "$85k - $115k",
      influence: "High - Data Orchestration",
      description: "Owns market opportunity quantification, competitor benchmarking tables, pricing model simulations, and active metrics tracking dashboards.",
      skills: ["Data Modeling", "SQL/Excel Tools", "Market Sizing (TAM/SAM)", "Financial Forecasting"]
    },
    {
      id: "PM",
      name: "Product Manager",
      salary: "$110k - $145k",
      influence: "Critical - Value Prop Owner",
      description: "Defines the core product features, value propositions, customer persona matching, and release phases. Directs crossfunctional launch calendars.",
      skills: ["Product Strategy", "User Persona Framing", "Launch Phase Scheduling", "Feasibility Audits"]
    },
    {
      id: "SA",
      name: "Strategy Analyst",
      salary: "$95k - $130k",
      influence: "High - Growth Strategy",
      description: "Navigates pricing architectures, market entry barriers, growth modeling, and competitive moat generation. Often consults leadership directly.",
      skills: ["SWOT Frameworks", "Competitive Moats", "Pricing Sensitivity", "Risk Mitigation"]
    },
    {
      id: "MM",
      name: "Marketing Manager",
      salary: "$80k - $110k",
      influence: "High - Campaign Execution",
      description: "Directs channel allocations, marketing funnels (Awareness to Conversion), marketing budgets, influencer campaigns, and media schedules.",
      skills: ["Digital Acquisition", "Funnel Optimizations", "Campaign ROI Metrics", "Content/SEO Strategy"]
    }
  ];

  const frameworks = [
    {
      title: "Product-Led Growth (PLG)",
      focus: "Self-serve signup & Virality",
      description: "The product itself drives customer acquisition and expansion. Famously used by Slack, Figma, and Zoom.",
      suitability: "High transaction volume, low price points, simple onboarding.",
      color: "border-emerald-500/20 bg-emerald-50/50 text-emerald-800"
    },
    {
      title: "Sales-Led Growth (SLG)",
      focus: "High-touch outbound operations",
      description: "Dedicated account executives cultivate relationships to secure multi-year enterprise contracts. Famously used by Salesforce and Snowflake.",
      suitability: "High price tier, complex setups, substantial corporate integrations.",
      color: "border-indigo-500/20 bg-indigo-50/50 text-indigo-800"
    },
    {
      title: "Marketing-Led / Hybrid",
      focus: "Inbound content & targeted paid channels",
      description: "Educates customer cohorts via webinars, content hubs, and events, guiding them into self-serve free trials or sales calls.",
      suitability: "Mid-market SaaS, niche hardware, organic consumer launches.",
      color: "border-amber-500/20 bg-amber-50/50 text-amber-800"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="gtm-overview-view">
      {/* Hero Banner Grid */}
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-dark-panel p-8 md:p-12 shadow-md custom-grid">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold text-black uppercase tracking-wider font-mono">
            STRATEGY FRAMEWORK PORTAL
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white md:text-5xl">
            Product Launch <span className="text-gold italic underline decoration-gold decoration-2 underline-offset-6">Go-To-Market (GTM)</span> Strategy Plan
          </h1>
          <p className="text-base text-white/70 leading-relaxed font-sans max-w-2xl">
            A Go-to-Market (GTM) strategy is a structured roadmap detailing how a company introduces a new product to market, acquires first-wave customers, and builds a defensible business model.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="rounded-lg border border-border-subtle bg-white/5 px-4 py-2 text-xs text-[#e5e5e5]">
              <span className="font-serif italic font-bold text-gold text-sm mr-1">30–40%</span> Less Failed Launches
            </div>
            <div className="rounded-lg border border-border-subtle bg-white/5 px-4 py-2 text-xs text-[#e5e5e5]">
              <span className="font-serif italic font-bold text-gold text-sm mr-1">$50B+</span> Market Size by 2030
            </div>
            <div className="rounded-lg border border-border-subtle bg-white/5 px-4 py-2 text-xs text-[#e5e5e5]">
              <span className="font-serif italic font-bold text-gold text-sm mr-1">Zero Code</span> Execution Focus
            </div>
          </div>
        </div>
      </div>

      {/* Structural Foundation Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border-subtle bg-dark-panel p-6 shadow-xs">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold border border-gold/25">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-semibold text-white text-lg">What a GTM Strategy Is</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed font-sans">
            It functions as an operational Blueprint. It ensures every department of an enterprise—marketing, product, sales, finance—is synchronized with consistent positioning, pricing models, channels, and targeted milestones.
          </p>
        </div>

        <div className="rounded-xl border border-border-subtle bg-dark-panel p-6 shadow-xs">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 text-red-400 border border-red-500/20">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-semibold text-white text-lg">Why Product Launches Fail</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed font-sans">
            The primary drivers are <strong className="text-gold font-medium">Poor Market Timing, Misaligned Pricing</strong>, launching features customers don't actually care about, targeting incorrect segments, or burning marketing budgets on non-ROI channels.
          </p>
        </div>

        <div className="rounded-xl border border-border-subtle bg-dark-panel p-6 shadow-xs">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-500/20">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h3 className="font-serif font-semibold text-white text-lg">Why Planning Matters</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed font-sans">
            Rigorous GTM analysis replaces guesswork with real, quantifiably modeled expectations. It establishes exact customer acquisition cost bounds, expected conversion margins, revenue models, and readiness criteria.
          </p>
        </div>
      </div>

      {/* GTM Frameworks segment */}
      <div className="rounded-xl border border-border-subtle bg-dark-panel p-6 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-white">How Companies Use GTM Frameworks</h2>
          <p className="text-xs text-white/40 mt-1">Select the operational approach that aligns with your product economics and contract size.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {frameworks.map((fw, index) => {
            let badgeBg = "bg-gold-muted/50 text-gold border-gold/20";
            if (index === 1) badgeBg = "bg-white/10 text-white border-white/20";
            if (index === 2) badgeBg = "bg-amber-500/10 text-amber-400 border-amber-500/20";
            return (
              <div key={index} className="rounded-lg border border-border-subtle bg-[#141414] p-5 space-y-3">
                <h4 className="font-serif italic font-semibold text-gold text-base">{fw.title}</h4>
                <div>
                  <span className={`text-[9px] font-mono uppercase rounded px-1.5 py-0.5 border ${badgeBg}`}>Focus</span>
                  <p className="text-xs font-semibold text-white/80 mt-1.5">{fw.focus}</p>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans">{fw.description}</p>
                <div className="border-t border-[#ffffff08] pt-2 text-[11px] font-sans">
                  <strong className="text-gold">Suitable For: </strong><span className="text-white/70">{fw.suitability}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Corporate Roles tab section */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="rounded-xl border border-border-subtle bg-dark-panel p-6 shadow-xs md:col-span-4 space-y-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Who executes a GTM?</h3>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-mono">Select to dynamic browse deliverables.</p>
          </div>
          
          <div className="flex flex-col gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`flex items-center justify-between rounded-lg px-4 py-3 text-left text-xs font-semibold transition-all cursor-pointer ${
                  activeRole === r.id
                    ? "bg-gold text-black shadow-md font-bold"
                    : "bg-[#151515] text-white/70 hover:bg-[#1f1f1f] border border-border-subtle"
                }`}
              >
                <span>{r.name}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border-subtle bg-[#121212] p-6 shadow-xs md:col-span-8 flex flex-col justify-between">
          {roles.filter(r => r.id === activeRole).map((r) => (
            <div key={r.id} className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ffffff10] pb-3">
                  <span className="font-serif text-lg font-bold text-white">{r.name}</span>
                  <div className="flex gap-2">
                    <span className="rounded bg-gold/10 px-2 py-0.5 text-[10px] font-mono font-medium text-gold border border-gold/20">
                      Average Base Salary: {r.salary}
                    </span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono font-medium text-white/70 border border-white/10">
                      Influence: {r.influence}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {r.description}
                </p>

                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono uppercase tracking-wider text-white/40">Core Market Capabilities</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {r.skills.map((s, idx) => (
                      <span key={idx} className="rounded bg-[#1a1a1a] px-2.5 py-1 text-xs text-[#e5e5e5] border border-border-subtle">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-gold/5 border border-gold/20 p-4">
                <div className="flex gap-3">
                  <GraduationCap className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-serif font-bold text-white italic">Student Takeaway</h5>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      Completing this structured business analysis case in your portfolio replicates exactly what high-paying employers search for. It demonstrates that you understand the entire journey from raw telemetry to market strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter Call To Action Card */}
      <div className="rounded-xl border border-border-subtle bg-[#0e0e0e] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1b1b1b] border border-[#ffffff10] text-gold">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-white text-base">Explore the Interactive App Sections</h4>
            <p className="text-xs text-white/60">Filters are persistent: any change in categories or status applies to real-time math instantly.</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-gold bg-gold/10 border border-gold/20 rounded px-3 py-1">
          Designed with Playfair & Space Grotesk
        </div>
      </div>
    </div>
  );
}
