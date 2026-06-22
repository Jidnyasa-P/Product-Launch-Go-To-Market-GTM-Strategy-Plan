import React, { useState } from "react";
import { FolderTree, Linkedin, Github, Clipboard, Check, Share2, Compass, Award, ExternalLink } from "lucide-react";

export default function GTMShowcase() {
  const [activeTab, setActiveTab] = useState<"github" | "linkedin">("github");
  const [linkedinTone, setLinkedinTone] = useState<"professional" | "student">("professional");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);

  // Folder tree text structure
  const folderStructureText = `my-gtm-portfolio-project/
├── data/
│   └── raw_gtm_dataset_100rows.csv    # The 100+ row dataset exported from this hub
├── reports/
│   ├── gtm_strategy_report.pdf        # Your compiled PDF strategy outline
│   ├── competitor_benchmark_table.xlsx # Pricing metrics & break-even calculations
│   └── customer_persona_profiles.pdf  # Student focus-cohort breakdowns
├── dashboards/
│   ├── executive_gtm_dashboard.pbix   # PowerBI or Tableau backup file
│   └── dashboard_screenshots.png       # Visual walkthrough screenshots
├── LICENSE
└── README.md                         # Portfolio entry point and executive summary`;

  // Dynamic README template text
  const readmeContent = `# Product Launch Go-To-Market (GTM) Strategy Plan
[![Role: Business Analyst](https://img.shields.io/badge/Role-Business_Analyst-blue.svg)](https://shield.io)
[![Topic: Product launch](https://img.shields.io/badge/Topic-Launch_Planning-green.svg)](https://shield.io)

## Executive Summary
This portfolio project implements a fully structured Go-To-Market (GTM) launch strategy framework. Using business analysis techniques, competitor benchmarking, and pricing simulators, I modeled customer acquisition dynamics to solve launch-risk objectives.

### Project Deliverables
* **Interactive Dashboard:** Built to aggregate critical KPIs (Revenue, CAC, Conversion Rate)
* **Pricing Calculator:** Built to simulate contributor margins and determine break-even limits
* **Checklist Gantt:** Managed week-by-week timeline parameters from Pre-Launch to Post-Launch Review

### Core Metrics Achieved
1. **Weighted Demand Score:** 84% average consumer desirability rating
2. **Dynamic Conversion Target:** 3.4% average across target cohorts
3. **Allowable CAC Constraint:** Under $35 relative to initial purchase budgets 

---
*Created on GTM Portfolio Accelerator Hub.*`;

  // LinkedIn text options
  const linkedinCaptions = {
    professional: `🚀 I'm thrilled to share a new addition to my professional portfolio: a comprehensive "Product Launch Go-To-Market (GTM) Strategy Strategy Plan"!

As a Business Analyst, product launch failures (which hit nearly 30-40% globally) represent one of the highest corporate costs. In this case, I modeled a data-driven blueprint covering:

✅ Competitor SWOT Benchmarking & Pricing Sensitivity
✅ Interactive Multi-Channel Customer Activation maps
✅ High-Fidelity Dashboard modeling Leads-to-Sales conversions
✅ Financial Break-Even simulator formulas

Through structured planning, I simulated and reduced critical launch risks by establishing clear CSAT goals and allowable CAC thresholds. 

Check out my full GitHub repository below to explore the Tableau/PowerBI dashboard backups and Excel break-even models!

#BusinessAnalysis #ProductManagement #GoToMarket #SaaSTrends #DataAnalytics`,
    student: `🎓 Applying university classes to real-world business challenges is how we build true industry readiness. Today, I published my complete "Product Launch Go-To-Market (GTM) Strategy Plan"!

This non-coding project replicates the active deliverables executed by product strategy teams at premium consulting firms like McKinsey & BCG. 

I generated and mapped a realistic 100+ row customer segment dataset, calculated break-even targets for hardware/SaaS lines, and designed an interactive Gantt launch checklist.

Here is what I learned:
💡 GTM is an operational alignment mechanism, not just a marketing layout.
💡 Pricing Sensitivity correlates directly to competitor features and USPs.
💡 Funnels help teams allocate spend efficiently before firing dollars.

I've uploaded the entire codebase, CSV databases, and report metrics to GitHub! Let me know your thoughts in the comments.

#GoToMarket #ProductStrategy #CareerReady #BusinessAnalyst #Startups`
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(linkedinCaptions[linkedinTone]);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="gtm-showcase-view">
      
      {/* SECTION SELECTOR HEADER */}
      <div className="border border-border-subtle rounded-xl p-4 bg-dark-panel shadow-md flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[#e5e5e5]">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-gold" />
          <h2 className="font-serif font-bold text-white text-sm">Portfolio Showcase Channels</h2>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveTab("github")}
            className={`py-1.5 px-3.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "github"
                ? "bg-gold text-black shadow-sm"
                : "bg-white/5 border border-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Github className="h-3.5 w-3.5" /> GitHub Guide
          </button>
          <button
            onClick={() => setActiveTab("linkedin")}
            className={`py-1.5 px-3.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "linkedin"
                ? "bg-gold text-black shadow-sm"
                : "bg-white/5 border border-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn Caption Generator
          </button>
        </div>
      </div>

      {/* GITHUB TAB CONTENT */}
      {activeTab === "github" && (
        <div className="grid gap-6 md:grid-cols-12 animate-fade-in">
          
          {/* Recommended Folder Tree (5-cols) */}
          <div className="md:col-span-5 bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-md space-y-4 text-[#e5e5e5]">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-white text-sm flex items-center gap-1.5">
                <FolderTree className="h-4 w-4 text-gold" /> Professional Directory Layout
              </h3>
              <p className="text-[11px] text-white/40">Organize files correctly to impress recruiters screening your GitHub.</p>
            </div>

            <div className="bg-[#0a0a0a] text-emerald-400 font-mono text-[10px] rounded-lg p-4 overflow-x-auto whitespace-pre leading-normal border border-border-subtle">
              {folderStructureText}
            </div>
            
            <span className="text-[10px] text-gold/60 block font-mono">Tip: Upload Tableau .twbx files or PowerBI templates inside dashboards/</span>
          </div>

          {/* Readme generator content (7-cols) */}
          <div className="md:col-span-7 bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-md flex flex-col justify-between text-[#e5e5e5]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#ffffff05] pb-2">
                <div>
                  <h3 className="font-serif font-bold text-white text-sm">Dynamic README.md Template</h3>
                  <p className="text-[11px] text-white/40">Every stellar project needs a top-tier landing description pages on GitHub.</p>
                </div>
                
                <button
                  onClick={handleCopyReadme}
                  className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-gold hover:text-white cursor-pointer"
                >
                  {copiedReadme ? <span className="text-emerald-400">Copied!</span> : <><Clipboard className="h-3 w-3 text-gold" /> Copy Markdown</>}
                </button>
              </div>

              <div className="bg-[#0a0a0a] text-white/80 font-mono text-[10px] rounded-lg p-4 h-60 overflow-y-auto border border-border-subtle whitespace-pre-wrap select-all">
                {readmeContent}
              </div>
            </div>

            <p className="text-white/55 text-[11px] mt-4 leading-relaxed font-sans">
              🌟 <strong className="text-white font-serif">Recruiter advice:</strong> Keeping your readmes dense, structured with markdown tables, and decorated with svg badges proves you have polished documentation habits and deep analyst pride.
            </p>
          </div>

        </div>
      )}

      {/* LINKEDIN TAB CONTENT */}
      {activeTab === "linkedin" && (
        <div className="grid gap-6 md:grid-cols-12 animate-fade-in">
          
          {/* Tone Toggle left panel (4-cols) */}
          <div className="md:col-span-4 bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-md space-y-4 text-[#e5e5e5]">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-white text-sm">Configure Outreach Tone</h3>
              <p className="text-[11px] text-white/40">Adjust captions to match your current career phase.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setLinkedinTone("professional")}
                className={`py-2 px-3 text-left rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  linkedinTone === "professional"
                    ? "bg-[#1a1a1a] border-gold text-gold font-bold"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-white/60"
                }`}
              >
                💼 Professional Analyst style
              </button>
              <button
                onClick={() => setLinkedinTone("student")}
                className={`py-2 px-3 text-left rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  linkedinTone === "student"
                    ? "bg-[#1a1a1a] border-gold text-gold font-bold"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-white/60"
              }`}
              >
                🎓 Academic / Student learner tone
              </button>
            </div>

            <button
              onClick={handleCopyCaption}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gold hover:bg-gold-hover text-black rounded-lg text-xs font-bold transition-colors uppercase cursor-pointer shadow-md"
            >
              {copiedLink ? "Caption Copied!" : "Copy Full Caption Text"}
            </button>
          </div>

          {/* LinkedIn mock feed preview (8-cols) */}
          <div className="md:col-span-8 bg-[#111] rounded-xl p-4 border border-border-subtle font-sans">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block mb-2 text-right">LinkedIn Feed mockup Preview</span>
            
            <div className="bg-dark-panel rounded-xl border border-border-subtle p-5 space-y-4 shadow-md text-[#e5e5e5]">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-full bg-[#161616] shrink-0 border border-gold-muted/30 flex items-center justify-center font-bold text-gold">
                  ME
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Your Portfolio Name</h4>
                  <p className="text-[10px] text-white/50 leading-none mt-0.5">Business Strategy Analyst | Candidate seeking roles</p>
                  <p className="text-[9px] text-white/30 mt-0.5">Just now • 🌐 Edited</p>
                </div>
              </div>

              {/* Feed Text */}
              <p className="text-[11px] text-white/80 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto border-l border-gold-muted/20 pl-3">
                {linkedinCaptions[linkedinTone]}
              </p>

              {/* Media Card Preview */}
              <div className="border border-border-subtle rounded-lg overflow-hidden bg-[#0c0c0c]">
                <div className="h-28 bg-[#161616] flex flex-col items-center justify-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white text-center p-4">
                    <Compass className="h-8 w-8 text-gold mb-1 animate-spin" style={{ animationDuration: '6s' }} />
                    <h5 className="font-serif font-bold text-xs text-gold">PORTFOLIO PROJECT CASE STUDY</h5>
                    <p className="text-[8px] text-white/75 mt-0.5">Go-To-Market strategy dashboard modeling</p>
                  </div>
                </div>
                <div className="p-3 border-t border-[#ffffff05] bg-[#0c0c0c] flex justify-between items-center text-[10px] font-mono">
                  <div>
                    <span className="font-semibold text-white block truncate max-w-sm">GitHub - Product-Launch-GTM-Strategy-Plan</span>
                    <span className="text-white/40 text-[8px]">github.com/my-portfolio-gtm</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-white/40 shrink-0" />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
