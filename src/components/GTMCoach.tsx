import React, { useState, useMemo } from "react";
import { HelpCircle, ChevronRight, RefreshCw, CheckCircle, Award, Star, Compass } from "lucide-react";

interface QuestionItem {
  id: number;
  q: string;
  a: string;
  category: "GTM Theory" | "Business Analytics" | "Portfolio Logic";
}

const interviewQA: QuestionItem[] = [
  {
    id: 1,
    category: "Portfolio Logic",
    q: "Explain your project.",
    a: "My project is a Product Launch Go-To-Market (GTM) Strategy Plan designed to help organizations successfully launch a new product in the market. I conducted market research, customer segmentation, competitor analysis, pricing analysis, demand forecasting, and channel strategy planning. Based on these analyses, I developed a GTM strategy that identifies target customers, marketing channels, revenue opportunities, and launch risks. The project demonstrates how business analysts support product launches by combining market intelligence with strategic planning."
  },
  {
    id: 2,
    category: "GTM Theory",
    q: "What is a Go-To-Market (GTM) strategy?",
    a: "A Go-To-Market strategy is a structured plan that outlines how a company will introduce a product to the market, attract customers, generate demand, and achieve business objectives. It includes target customers, positioning, pricing, marketing channels, sales strategy, and launch planning."
  },
  {
    id: 3,
    category: "GTM Theory",
    q: "Why is a GTM strategy important?",
    a: "A GTM strategy reduces the risk of product launch failure by ensuring that the product reaches the right customers through the right channels with the right messaging. It aligns marketing, sales, and product teams around a common launch plan and improves the chances of commercial success."
  },
  {
    id: 4,
    category: "Business Analytics",
    q: "What business analysis techniques did you use in this project?",
    a: "I used market research, customer segmentation, customer persona development, competitor benchmarking, pricing analysis, demand forecasting, revenue forecasting, risk analysis, and strategic planning techniques. These methods helped create a data-driven GTM strategy."
  },
  {
    id: 5,
    category: "Business Analytics",
    q: "What KPIs did you use in this project?",
    a: "I used KPIs such as Revenue Forecast, Market Demand Score, Customer Acquisition Cost (CAC), Expected Conversion Rate, Campaign ROI, Product Readiness Score, Market Penetration Estimate, and GTM Success Score. These KPIs help evaluate launch readiness and business potential."
  },
  {
    id: 6,
    category: "Business Analytics",
    q: "How did you identify the target customer segments?",
    a: "I analyzed customer demographics, purchasing behavior, market needs, and pain points. Based on these insights, I created customer personas and prioritized segments that showed the highest demand potential and revenue opportunities."
  },
  {
    id: 7,
    category: "Portfolio Logic",
    q: "What business insights did you derive from this project?",
    a: "I identified the most attractive customer segments, optimal pricing strategies, effective marketing channels, key competitors, expected revenue opportunities, and potential launch risks. These insights help businesses allocate resources more effectively during product launches."
  },
  {
    id: 8,
    category: "GTM Theory",
    q: "How would a company use this GTM strategy in real life?",
    a: "Companies can use the GTM strategy to guide product launch execution, align marketing and sales teams, prioritize customer acquisition efforts, optimize launch budgets, and monitor launch performance. It serves as a roadmap for bringing a product successfully to market."
  },
  {
    id: 9,
    category: "Portfolio Logic",
    q: "What challenges did you face during the project?",
    a: "One challenge was estimating market demand and customer adoption accurately because future behavior can be uncertain. Another challenge was balancing aggressive growth objectives with realistic assumptions about market conditions and competition."
  },
  {
    id: 10,
    category: "Portfolio Logic",
    q: "What improvements would you make in the future?",
    a: "I would add scenario planning models, predictive demand forecasting, customer sentiment analysis, competitive intelligence automation, and post-launch performance tracking. These enhancements would make the GTM strategy more dynamic and adaptable to changing market conditions."
  }
];

export default function GTMCoach() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  
  // Keep track of card status in client state
  const [statusMap, setStatusMap] = useState<Record<number, "not-started" | "reviewing" | "mastered">>(
    interviewQA.reduce((acc, current) => {
      acc[current.id] = "not-started";
      return acc;
    }, {} as Record<number, "not-started" | "reviewing" | "mastered">)
  );

  const activeQuestion = interviewQA[currentIndex];

  // Derived progress stats
  const progressStats = useMemo(() => {
    let mastered = 0;
    let reviewing = 0;
    Object.values(statusMap).forEach(v => {
      if (v === "mastered") mastered++;
      if (v === "reviewing") reviewing++;
    });
    return {
      mastered,
      reviewing,
      unprepared: interviewQA.length - mastered - reviewing,
      percentage: Math.round((mastered / interviewQA.length) * 100)
    };
  }, [statusMap]);

  const updateStatus = (id: number, s: "not-started" | "reviewing" | "mastered") => {
    setStatusMap({...statusMap, [id]: s});
  };

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % interviewQA.length);
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + interviewQA.length) % interviewQA.length);
    }, 150);
  };

  const handleResetCoach = () => {
    if (confirm("Reset all learning metrics and start flashcard training over?")) {
      const reset = interviewQA.reduce((acc, c) => {
        acc[c.id] = "not-started";
        return acc;
      }, {} as Record<number, "not-started" | "reviewing" | "mastered">);
      setStatusMap(reset);
      setCurrentIndex(0);
      setFlipped(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="gtm-coach-root">
      
      {/* HEADER SECTION: Title & Readiness progress bar */}
      <div className="grid gap-6 md:grid-cols-12">
        <div className="bg-dark-panel border border-border-subtle rounded-xl p-5 shadow-md md:col-span-4 flex flex-col justify-between text-[#e5e5e5]">
          <div className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-gold" /> Interactive Prep Coach
            </h2>
            <p className="text-xs text-white/40 leading-relaxed">
              Test your business strategy and consulting logic using the 10 core technical interview questions frequently asked by elite tech recruiters.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5 mt-4 font-mono text-[11px]">
            <div className="flex items-center justify-between text-white/60">
              <span>GTM Mastery Meter</span>
              <span className="font-semibold text-gold">{progressStats.percentage}%</span>
            </div>
            
            <div className="w-full bg-[#141414] h-2 rounded-full overflow-hidden">
              <div className="bg-gold h-full transition-all duration-300 shadow-[0_0_8px_rgba(197,160,89,0.2)]" style={{ width: `${progressStats.percentage}%` }} />
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[9px] text-center pt-1 animate-pulse-slow">
              <div className="bg-emerald-950/20 text-emerald-300 rounded p-1.5 border border-emerald-500/20">
                <span className="font-bold block text-sm">{progressStats.mastered}</span> Mastered
              </div>
              <div className="bg-amber-950/10 text-amber-300 rounded p-1.5 border border-amber-500/10">
                <span className="font-bold block text-sm">{progressStats.reviewing}</span> Reviewing
              </div>
              <div className="bg-white/5 text-white/50 rounded p-1.5 border border-white/10">
                <span className="font-bold block text-sm">{progressStats.unprepared}</span> Unprepared
              </div>
            </div>
            
            <button
              onClick={handleResetCoach}
              className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 px-3 border border-border-subtle rounded text-[10px] text-white/40 hover:text-white hover:bg-white/5 transition-colors uppercase cursor-pointer font-bold"
            >
              <RefreshCw className="h-3 w-3" /> Reset Tracker Metrics
            </button>
          </div>
        </div>

        {/* ACTIVE QUESTIONS CONTAINER: Flashcard */}
        <div className="md:col-span-8 flex flex-col justify-between">
          
          {/* Card Wrapper */}
          <div 
            onClick={() => setFlipped(!flipped)}
            className={`min-h-[290px] w-full rounded-2xl border transition-all duration-300 relative cursor-pointer p-6 md:p-8 flex flex-col justify-between select-none ${
              flipped 
                ? "bg-[#0c0c0c] border-gold/40 text-[#e5e5e5] shadow-lg" 
                : "bg-dark-panel border-border-subtle text-white shadow-md hover:border-gold/30"
            }`}
          >
            {/* Front Card layout */}
            {!flipped && (
              <div className="space-y-4 animate-fade-in flex flex-col justify-between h-full w-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="rounded bg-white/5 text-gold px-2.5 py-1 border border-white/10">
                      {activeQuestion.category}
                    </span>
                    <span className="text-white/40">Card {currentIndex + 1} of {interviewQA.length}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg md:text-xl text-white leading-snug">
                    {activeQuestion.q}
                  </h3>
                </div>

                <div className="text-center text-xs font-mono text-gold border-t border-white/5 pt-4 mt-6">
                  ✨ Click card anywhere to flip and reveal answer response
                </div>
              </div>
            )}

            {/* Back Card Layout with robust metrics response */}
            {flipped && (
              <div className="space-y-4 animate-fade-in flex flex-col justify-between h-full w-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-white/40">
                    <span className="rounded bg-gold/10 text-gold px-2.5 py-1 border border-gold/20">
                      Corporate Answer
                    </span>
                    <span>Q{activeQuestion.id} synthesis</span>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-normal whitespace-pre-wrap">
                    {activeQuestion.a}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-4 text-center text-xs font-mono text-gold">
                  ⚡ Click card to return to question
                </div>
              </div>
            )}

          </div>

          {/* CARD FOOTER CONTROLS: Learning rating & Next trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 bg-dark-panel border border-border-subtle rounded-xl p-4 shadow-md text-[#e5e5e5]">
            
            {/* Learning Rating Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-white/40 font-mono text-[10px] uppercase mr-1.5">Rating:</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus(activeQuestion.id, "not-started");
                }}
                className={`py-1 px-2.5 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                  statusMap[activeQuestion.id] === "not-started"
                    ? "bg-white/10 text-white border-border-subtle"
                    : "bg-white/5 hover:bg-white/10 text-white/50 border-transparent"
                }`}
              >
                No Status
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus(activeQuestion.id, "reviewing");
                }}
                className={`py-1 px-2.5 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                  statusMap[activeQuestion.id] === "reviewing"
                    ? "bg-amber-950/20 text-amber-300 border-amber-500/30"
                    : "bg-white/5 hover:bg-white/10 text-white/50 border-transparent"
                }`}
              >
                Reviewing
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateStatus(activeQuestion.id, "mastered");
                }}
                className={`py-1 px-2.5 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                  statusMap[activeQuestion.id] === "mastered"
                    ? "bg-emerald-950/20 text-emerald-300 border-emerald-500/30"
                    : "bg-white/5 hover:bg-white/10 text-white/50 border-transparent"
                }`}
              >
                Mastered!
              </button>
            </div>

            {/* Skip / Next Controls */}
            <div className="flex items-center gap-1.5 justify-end">
              <button
                onClick={handlePrev}
                className="py-1.5 px-3 border border-border-subtle hover:bg-white/5 rounded text-xs font-semibold text-white/70 cursor-pointer"
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className="py-1.5 px-4 bg-gold hover:bg-gold-hover rounded text-xs font-bold text-black flex items-center gap-1 cursor-pointer shadow-md"
              >
                Next Card <ChevronRight className="h-3.5 w-3.5 text-black" />
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
