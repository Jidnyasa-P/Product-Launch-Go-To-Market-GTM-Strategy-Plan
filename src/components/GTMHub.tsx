import React, { useState, useMemo } from "react";
import { GTMRecord } from "../data/gtmDataset";
import { Search, Download, Clipboard, Plus, Trash2, Edit2, Check, X, SlidersHorizontal, ChevronLeft, ChevronRight, FileSpreadsheet } from "lucide-react";

interface GTMHubProps {
  records: GTMRecord[];
  onUpdateRecord: (id: string, updated: Partial<GTMRecord>) => void;
  onAddRecord: (record: Omit<GTMRecord, "id" | "conversionRate" | "cac" | "revenueForecast">) => void;
  onDeleteRecord: (id: string) => void;
}

export default function GTMHub({ records, onUpdateRecord, onAddRecord, onDeleteRecord }: GTMHubProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // New Record Dialog State
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "SaaS" as const,
    targetMarket: "",
    customerSegment: "",
    region: "North America" as const,
    competitorName: "",
    competitorPrice: 100,
    productPrice: 79,
    marketingChannel: "SEO & Content" as const,
    campaignBudget: 5000,
    expectedLeads: 10000,
    expectedConversions: 300,
    marketDemandScore: 75,
    productReadinessScore: 80,
    launchPhase: "Beta Testing" as const,
    gtmStatus: "On Track" as const
  });

  // Editing Row State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingFields, setEditingFields] = useState<Partial<GTMRecord>>({});

  // Filter & Search Logic
  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.customerSegment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.competitorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === "All" || r.category === categoryFilter;
      const matchStatus = statusFilter === "All" || r.gtmStatus === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [records, searchTerm, categoryFilter, statusFilter]);

  // Paginated Subset
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const currentSubset = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filtered.slice(startIndex, startIndex + rowsPerPage);
  }, [filtered, currentPage]);

  const handlePageChange = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      setCurrentPage(p);
    }
  };

  // CSV Export Logic
  const handleExportCSV = () => {
    const headers = [
      "Product ID", "Product Name", "Category", "Target Market", "Customer Segment", "Region",
      "Competitor Name", "Competitor Price", "Product Price", "Marketing Channel",
      "Campaign Budget", "Expected Leads", "Expected Conversions", "Conversion Rate %",
      "Customer Acquisition Cost (CAC)", "Expected Revenue Forecast", "Market Demand Score",
      "Product Readiness Score", "Launch Phase", "GTM Status"
    ];

    const rows = records.map((r) => [
      r.id, r.productName, r.category, r.targetMarket, r.customerSegment, r.region,
      r.competitorName, r.competitorPrice, r.productPrice, r.marketingChannel,
      r.campaignBudget, r.expectedLeads, r.expectedConversions, `${r.conversionRate}%`,
      r.cac, r.revenueForecast, r.marketDemandScore, r.productReadinessScore,
      r.launchPhase, r.gtmStatus
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((val) => `"${val}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "gtm_strategy_dataset_100plus.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clipboard Copier
  const handleCopyClipboard = () => {
    const headers = ["Product ID", "Name", "Category", "Price", "CAC", "Revenue Forecast"].join("\t");
    const rows = filtered.map((r) => [r.id, r.productName, r.category, `$${r.productPrice}`, `$${r.cac}`, `$${r.revenueForecast}`].join("\t"));
    navigator.clipboard.writeText([headers, ...rows].join("\n"));
    alert("Filtered dataset copied to clipboard successfully!");
  };

  // Start Edit Mode
  const startEditing = (record: GTMRecord) => {
    setEditingId(record.id);
    setEditingFields({
      productPrice: record.productPrice,
      campaignBudget: record.campaignBudget,
      expectedLeads: record.expectedLeads,
      expectedConversions: record.expectedConversions,
      gtmStatus: record.gtmStatus
    });
  };

  // Save Inline Edit
  const saveInlineEdit = (id: string) => {
    // Re-calculate derived fields
    const leads = editingFields.expectedLeads ?? 1;
    const con = editingFields.expectedConversions ?? 0;
    const budget = editingFields.campaignBudget ?? 0;
    const price = editingFields.productPrice ?? 0;

    const conversionRate = parseFloat(((con / leads) * 100).toFixed(1));
    const cac = con > 0 ? Math.round(budget / con) : 0;
    const revenueForecast = Math.round(con * price);

    onUpdateRecord(id, {
      ...editingFields,
      conversionRate,
      cac,
      revenueForecast
    });
    setEditingId(null);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord(newProduct);
    setIsAdding(false);
    // Reset fields
    setNewProduct({
      productName: "",
      category: "SaaS",
      targetMarket: "",
      customerSegment: "",
      region: "North America",
      competitorName: "",
      competitorPrice: 100,
      productPrice: 79,
      marketingChannel: "SEO & Content",
      campaignBudget: 5000,
      expectedLeads: 10000,
      expectedConversions: 300,
      marketDemandScore: 75,
      productReadinessScore: 80,
      launchPhase: "Beta Testing",
      gtmStatus: "On Track"
    });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6" id="gtm-hub-view">
      
      {/* SECTION TOP: Header + Download Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-md text-[#e5e5e5]">
        <div>
          <h2 className="font-serif text-lg font-bold text-white">Interactive GTM Data Grid</h2>
          <p className="text-xs text-white/40">Edit, add, or export the realistic 100+ row Business Analyst sample dataset below.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Exporters */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-semibold text-white/80 hover:bg-white/5 bg-[#161616] cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-gold" /> Export CSV
          </button>
          
          <button
            onClick={handleCopyClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle rounded-lg text-xs font-semibold text-white/80 hover:bg-white/5 bg-[#161616] cursor-pointer"
          >
            <Clipboard className="h-3.5 w-3.5 text-gold" /> Copy TSV
          </button>
          
          {/* Add triggers */}
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gold text-black rounded-lg text-xs font-bold hover:bg-gold-hover cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4 text-black" /> Add Product Row
          </button>
        </div>
      </div>

      {/* FILTER RAILS */}
      <div className="grid gap-3 sm:grid-cols-12 bg-dark-panel border border-border-subtle rounded-xl p-4 shadow-md">
        <div className="sm:col-span-6 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-white/30" />
          </span>
          <input
            type="text"
            placeholder="Search by product name, competitor, or segment..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border-subtle bg-[#161616] text-[#e5e5e5] placeholder-white/20 focus:outline-none focus:border-gold"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-1.5 px-3 text-xs border border-border-subtle rounded-lg bg-[#161616] text-[#e5e5e5] focus:outline-none focus:border-gold"
          >
            <option value="All" className="bg-[#111]">All Categories</option>
            <option value="SaaS" className="bg-[#111]">SaaS</option>
            <option value="Hardware" className="bg-[#111]">Hardware</option>
            <option value="Consumer Goods" className="bg-[#111]">Consumer Goods</option>
            <option value="EdTech" className="bg-[#111]">EdTech</option>
            <option value="FinTech" className="bg-[#111]">FinTech</option>
            <option value="HealthTech" className="bg-[#111]">HealthTech</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-1.5 px-3 text-xs border border-border-subtle rounded-lg bg-[#161616] text-[#e5e5e5] focus:outline-none focus:border-gold"
          >
            <option value="All" className="bg-[#111]">All Statuses</option>
            <option value="On Track" className="bg-[#111]">On Track</option>
            <option value="Delayed" className="bg-[#111]">Delayed</option>
            <option value="Completed" className="bg-[#111]">Completed</option>
            <option value="At Risk" className="bg-[#111]">At Risk</option>
          </select>
        </div>
      </div>

      {/* ADD ROW COLLAPSIBLE FORM */}
      {isAdding && (
        <form onSubmit={handleAddNew} className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-display font-bold text-slate-900 text-sm">Insert New GTM Record (Database Input)</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Product Name *</label>
              <input
                required
                type="text"
                placeholder="e.g., SleepPad Pro"
                value={newProduct.productName}
                onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Category *</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              >
                <option value="SaaS">SaaS</option>
                <option value="Hardware">Hardware</option>
                <option value="Consumer Goods">Consumer Goods</option>
                <option value="EdTech">EdTech</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Region *</label>
              <select
                value={newProduct.region}
                onChange={(e) => setNewProduct({ ...newProduct, region: e.target.value as any })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              >
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
                <option value="Latin America">Latin America</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Customer Segment *</label>
              <input
                required
                type="text"
                placeholder="e.g., Solo Founders"
                value={newProduct.customerSegment}
                onChange={(e) => setNewProduct({ ...newProduct, customerSegment: e.target.value })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Our Product Price ($) *</label>
              <input
                required
                type="number"
                min="1"
                value={newProduct.productPrice}
                onChange={(e) => setNewProduct({ ...newProduct, productPrice: Number(e.target.value) })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Near Competitor Name *</label>
              <input
                required
                type="text"
                placeholder="e.g., Apple Watch"
                value={newProduct.competitorName}
                onChange={(e) => setNewProduct({ ...newProduct, competitorName: e.target.value })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Competitor Price ($) *</label>
              <input
                required
                type="number"
                min="1"
                value={newProduct.competitorPrice}
                onChange={(e) => setNewProduct({ ...newProduct, competitorPrice: Number(e.target.value) })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Campaign Budget ($) *</label>
              <input
                required
                type="number"
                min="0"
                value={newProduct.campaignBudget}
                onChange={(e) => setNewProduct({ ...newProduct, campaignBudget: Number(e.target.value) })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Expected Leads *</label>
              <input
                required
                type="number"
                min="10"
                value={newProduct.expectedLeads}
                onChange={(e) => setNewProduct({ ...newProduct, expectedLeads: Number(e.target.value) })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Expected Conversions *</label>
              <input
                required
                type="number"
                min="1"
                value={newProduct.expectedConversions}
                onChange={(e) => setNewProduct({ ...newProduct, expectedConversions: Number(e.target.value) })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Marketing Channel *</label>
              <select
                value={newProduct.marketingChannel}
                onChange={(e) => setNewProduct({ ...newProduct, marketingChannel: e.target.value as any })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              >
                <option value="SEO & Content">SEO & Content</option>
                <option value="Paid Ads">Paid Ads</option>
                <option value="Social Media">Social Media</option>
                <option value="Influencer Marketing">Influencer Marketing</option>
                <option value="Cold Outreach">Cold Outreach</option>
                <option value="Event Marketing">Event Marketing</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Status *</label>
              <select
                value={newProduct.gtmStatus}
                onChange={(e) => setNewProduct({ ...newProduct, gtmStatus: e.target.value as any })}
                className="w-full rounded border border-slate-200 bg-white p-2"
              >
                <option value="On Track">On Track</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
            >
              Save to Database List
            </button>
          </div>
        </form>
      )}

      {/* MAIN DATAGRID TABLE */}
      <div className="bg-dark-panel border border-border-subtle rounded-xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1c1c1c] border-b border-border-subtle font-mono text-[10px] uppercase text-white/50 tracking-wider">
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Product Name</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price ($)</th>
                <th className="py-3 px-4 font-semibold">Channel</th>
                <th className="py-3 px-4 font-semibold">Budget ($)</th>
                <th className="py-3 px-4 font-semibold">Leads</th>
                <th className="py-3 px-4 font-semibold">Conv. Rate</th>
                <th className="py-3 px-4 font-semibold">CAC</th>
                <th className="py-3 px-4 font-semibold">Revenue Forecast</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#ffffff03] text-white/85">
              {currentSubset.map((r) => {
                const isEditing = editingId === r.id;

                return (
                  <tr key={r.id} className="hover:bg-[#ffffff02] transition-all font-sans">
                    {/* ID */}
                    <td className="py-3 px-4 font-mono font-medium text-white/40 whitespace-nowrap">{r.id}</td>
                    
                    {/* PRODUCT NAME + SEGMENT */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#e5e5e5]">{r.productName}</div>
                      <div className="text-[10px] text-white/40 truncate max-w-[120px]">{r.customerSegment}</div>
                    </td>

                    {/* CATEGORY */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-gold border border-white/10">
                        {r.category}
                      </span>
                    </td>

                    {/* INLINE EDIT: PRICE */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingFields.productPrice ?? 0}
                          onChange={(e) => setEditingFields({ ...editingFields, productPrice: Number(e.target.value) })}
                          className="w-16 p-1 bg-[#222] border border-border-subtle text-white rounded text-xs focus:outline-none focus:border-gold"
                        />
                      ) : (
                        <span className="font-mono text-gold">${r.productPrice}</span>
                      )}
                    </td>

                    {/* CHANNEL */}
                    <td className="py-3 px-4 text-[#e5e5e5]/80 whitespace-nowrap text-[11px]">{r.marketingChannel}</td>

                    {/* INLINE EDIT: BUDGET */}
                    <td className="py-3 px-4 font-mono">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingFields.campaignBudget ?? 0}
                          onChange={(e) => setEditingFields({ ...editingFields, campaignBudget: Number(e.target.value) })}
                          className="w-20 p-1 bg-[#222] border border-border-subtle text-white rounded text-xs focus:outline-none focus:border-gold"
                        />
                      ) : (
                        `$${r.campaignBudget.toLocaleString()}`
                      )}
                    </td>

                    {/* INLINE EDIT: LEADS */}
                    <td className="py-3 px-4 font-mono">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingFields.expectedLeads ?? 1}
                          onChange={(e) => setEditingFields({ ...editingFields, expectedLeads: Number(e.target.value) })}
                          className="w-16 p-1 bg-[#222] border border-border-subtle text-white rounded text-xs focus:outline-none focus:border-gold"
                        />
                      ) : (
                        r.expectedLeads.toLocaleString()
                      )}
                    </td>

                    {/* CONVERSION RATE */}
                    <td className="py-3 px-4 font-mono font-medium text-white/80">
                      {isEditing ? (
                        <span className="text-[10px] text-white/40">Auto</span>
                      ) : (
                        `${r.conversionRate}%`
                      )}
                    </td>

                    {/* CAC */}
                    <td className="py-3 px-4 font-mono text-white/60">
                      {isEditing ? (
                        <span className="text-[10px] text-white/40 font-mono">Auto</span>
                      ) : (
                        `$${r.cac}`
                      )}
                    </td>

                    {/* REVENUE FORECAST */}
                    <td className="py-3 px-4 font-mono font-semibold text-white">
                      {isEditing ? (
                        <span className="text-[10px] text-white/40">Auto</span>
                      ) : (
                        `$${r.revenueForecast.toLocaleString()}`
                      )}
                    </td>

                    {/* CORE GTM STATUS */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <select
                          value={editingFields.gtmStatus}
                          onChange={(e) => setEditingFields({ ...editingFields, gtmStatus: e.target.value as any })}
                          className="p-1 bg-[#222] border border-border-subtle text-white rounded text-xs focus:outline-none focus:border-gold"
                        >
                          <option value="On Track" className="bg-[#111]">On Track</option>
                          <option value="Delayed" className="bg-[#111]">Delayed</option>
                          <option value="Completed" className="bg-[#111]">Completed</option>
                          <option value="At Risk" className="bg-[#111]">At Risk</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                          r.gtmStatus === "On Track" ? "bg-emerald-950/20 text-emerald-400 border border-emerald-500/20" :
                          r.gtmStatus === "Delayed" ? "bg-amber-950/20 text-amber-300 border border-amber-500/10" :
                          r.gtmStatus === "Completed" ? "bg-indigo-950/20 text-indigo-300 border border-indigo-500/10" :
                          "bg-red-950/20 text-red-400 border border-red-500/10"
                        }`}>
                          <span className={`h-1 w-1 rounded-full ${
                            r.gtmStatus === "On Track" ? "bg-emerald-500" :
                            r.gtmStatus === "Delayed" ? "bg-amber-500" :
                            r.gtmStatus === "Completed" ? "bg-indigo-500" :
                            "bg-red-500"
                          }`} />
                          {r.gtmStatus}
                        </span>
                      )}
                    </td>

                    {/* ACTIONS ROW */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => saveInlineEdit(r.id)}
                            className="p-1.5 text-emerald-400 hover:bg-white/5 rounded cursor-pointer"
                            title="Save"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-red-400 hover:bg-white/5 rounded cursor-pointer"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => startEditing(r)}
                            className="p-1 text-white/60 hover:bg-white/10 rounded cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${r.productName} from database pool?`)) {
                                onDeleteRecord(r.id);
                              }
                            }}
                            className="p-1 text-red-400 hover:bg-[#881337]/30 hover:text-red-300 rounded cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* DATA TABLE EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 font-medium bg-[#161616]">
            No matching items found. Modify your filters to explore records.
          </div>
        )}

        {/* PAGINATION BOTTOM RAIL */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#ffffff05] bg-[#1a1a1a] text-white/50 font-mono text-xs">
          <div>
            Showing <span className="font-bold text-white">{filtered.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}</span> to <span className="font-bold text-white">{Math.min(currentPage * rowsPerPage, filtered.length)}</span> of <span className="font-bold text-white">{filtered.length}</span> rows
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 px-2.5 rounded border border-border-subtle bg-[#161616] hover:bg-white/5 text-white/70 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-white/70 px-3">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 px-2.5 rounded border border-border-subtle bg-[#161616] hover:bg-white/5 text-white/70 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
