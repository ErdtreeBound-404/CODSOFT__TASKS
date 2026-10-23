import React, { useState, useEffect } from 'react';
import { SlideData } from '../types';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  BookOpen
} from 'lucide-react';

interface SlideDeckProps {
  slides: SlideData[];
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [printAllSlidesView, setPrintAllSlidesView] = useState<boolean>(false);

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (printAllSlidesView) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, printAllSlidesView]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handlePrint = () => {
    setPrintAllSlidesView(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Printable View of all 14 slides
  if (printAllSlidesView) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="no-print bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between mb-6">
          <div className="text-sm font-semibold">
            📄 Print / PDF Export Deck Mode (All 14 Slides)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print to PDF
            </button>
            <button
              onClick={() => setPrintAllSlidesView(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition"
            >
              Back to Presentation Mode
            </button>
          </div>
        </div>

        {slides.map((s, idx) => (
          <div 
            key={s.id} 
            className="page-break bg-slate-950 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 min-h-[500px] flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between border-b border-blue-900/50 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-xs uppercase font-mono tracking-widest text-blue-400">
                    Phishing Awareness Program • Master Presentation Deck
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">Slide {idx + 1} / {totalSlides}</span>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{s.category}</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1 mb-2">
                {s.title}
              </h2>
              {s.subtitle && (
                <p className="text-blue-200 text-sm mb-6">{s.subtitle}</p>
              )}

              <div className="space-y-3 my-6">
                {s.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base">
                    <span className="text-blue-400 font-bold mt-1">▸</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>Speaker Script: {s.speakerNotes.slice(0, 100)}...</span>
              <span>© PHISHING AWARENESS PROGRAM</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Interactive Presentation Mode
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Deck Controls Toolbar */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-blue-300 uppercase font-mono font-bold tracking-wider">
              Companion Slide Deck (PDF/Presentation)
            </div>
            <h2 className="text-base font-bold text-white">
              Slide {currentSlideIndex + 1} of {totalSlides}: {currentSlide.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              showSpeakerNotes
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Speaker Notes (5-Min Script)</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="bg-gradient-to-br from-slate-950 via-[#0B192C] to-slate-900 text-white rounded-3xl border-2 border-blue-900/60 shadow-2xl p-6 sm:p-12 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Slide Header */}
        <div>
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-300">
                {currentSlide.category}
              </span>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 bg-blue-950 text-blue-300 rounded-full border border-blue-800">
              {currentSlideIndex + 1} / {totalSlides}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2 leading-tight">
            {currentSlide.title}
          </h1>

          {currentSlide.subtitle && (
            <p className="text-blue-300 text-sm sm:text-lg mb-8 font-medium">
              {currentSlide.subtitle}
            </p>
          )}

          {/* Slide Bullet Points / Visual Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            {currentSlide.bullets.map((bullet, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 transition-all flex items-start gap-3 shadow-inner"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                  {bullet}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Bottom Bar */}
        <div className="pt-6 border-t border-blue-950 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Phishing Awareness Program • Master Presentation Deck</span>
          </div>
          <div>Use ← / → Arrow Keys to Navigate</div>
        </div>
      </div>

      {/* Slide Navigation Controls & Thumbs */}
      <div className="flex items-center justify-between gap-4">
        <button
          disabled={currentSlideIndex === 0}
          onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        {/* Slide Counter Track */}
        <div className="flex gap-1.5 overflow-x-auto max-w-md py-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                idx === currentSlideIndex
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          disabled={currentSlideIndex === totalSlides - 1}
          onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Speaker Notes / 5-Minute Script Drawer */}
      {showSpeakerNotes && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-md">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Clock className="w-4 h-4" />
              Presenter Script & Talking Points (Slide {currentSlideIndex + 1})
            </div>
            <span className="text-[11px] text-slate-400">5-Minute Presentation Guide</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans italic bg-slate-950 p-4 rounded-xl border border-slate-800">
            "{currentSlide.speakerNotes}"
          </p>
        </div>
      )}
    </div>
  );
};
