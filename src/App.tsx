import React, { useState } from "react";
import { generateInitialRecords, GTMRecord } from "./data/gtmDataset";
import GTMOverview from "./components/GTMOverview";
import GTMDashboard from "./components/GTMDashboard";
import GTMHub from "./components/GTMHub";
import GTMBuilder from "./components/GTMBuilder";

import { 
  Compass, 
  BarChart3, 
  Database, 
  FileText, 
  GraduationCap 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "dashboard" | "grid" | "builder">("overview");
  const [records, setRecords] = useState<GTMRecord[]>(() => generateInitialRecords());

  // Record CRUD/Update actions to propagate changes in real-time
  const handleUpdateRecord = (id: string, updatedFields: Partial<GTMRecord>) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedFields } : r))
    );
  };

  const handleAddRecord = (newFields: Omit<GTMRecord, "id" | "conversionRate" | "cac" | "revenueForecast">) => {
    setRecords((prev) => {
      // Find the next ID integer sequence
      const numericIds = prev.map((r) => parseInt(r.id.replace("GTM-", ""), 10)).filter((val) => !isNaN(val));
      const nextNum = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
      const nextId = `GTM-${String(nextNum).padStart(3, "0")}`;

      const leads = newFields.expectedLeads || 1;
      const conversions = newFields.expectedConversions || 0;
      const budget = newFields.campaignBudget || 0;
      const price = newFields.productPrice || 0;

      const conversionRate = parseFloat(((conversions / leads) * 100).toFixed(1));
      const cac = conversions > 0 ? Math.round(budget / conversions) : 0;
      const revenueForecast = Math.round(conversions * price);

      const addedRecord: GTMRecord = {
        id: nextId,
        ...newFields,
        conversionRate,
        cac,
        revenueForecast
      };

      return [addedRecord, ...prev];
    });
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-bg text-[#e5e5e5] font-sans flex flex-col antialiased">
      
      {/* Top Professional Corporate Banner Header */}
      <header className="sticky top-0 z-50 bg-[#0c0c0c] border-b border-border-subtle shadow-md" id="gtm-main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gold flex items-center justify-center text-black font-serif font-black italic text-lg tracking-wider shadow-lg">
              GT
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-white tracking-widest leading-none">
                GTM PORTFOLIO ACCELERATOR
              </h1>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gold mt-1 block">
                Business Strategy Suite • v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold border border-gold/30">
              <GraduationCap className="h-3.5 w-3.5 text-gold animate-pulse" /> RECRUITER APPROVED
            </span>
            <div className="text-[11px] font-mono text-white/60 bg-[#1e1e1e] px-3 py-1 rounded-lg border border-[#ffffff10]">
              Live Simulation Session
            </div>
          </div>
        </div>

        {/* Global Navigation Tabs Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto pb-px" aria-label="Tabs">
            {[
              { id: "overview", label: "Overview & Theory", icon: Compass },
              { id: "dashboard", label: "Exec Dashboard", icon: BarChart3 },
              { id: "grid", label: "Dataset Hub", icon: Database },
              { id: "builder", label: "Strategy Planner", icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-3 border-b-2 font-display text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "border-gold text-gold"
                      : "border-transparent text-white/50 hover:text-white/80 hover:border-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && <GTMOverview />}
        {activeTab === "dashboard" && <GTMDashboard records={records} />}
        {activeTab === "grid" && (
          <GTMHub 
            records={records}
            onUpdateRecord={handleUpdateRecord}
            onAddRecord={handleAddRecord}
            onDeleteRecord={handleDeleteRecord}
          />
        )}
        {activeTab === "builder" && <GTMBuilder />}
      </main>

      {/* Footer Branding Line */}
      <footer className="bg-[#0c0c0c] border-t border-border-subtle py-6 text-center text-xs text-white/40 font-mono tracking-wide">
        Product Launch Go-To-Market (GTM) Strategy Plan Suite • Developed in Google AI Studio • No-Code BA Portfolio
      </footer>

    </div>
  );
}
