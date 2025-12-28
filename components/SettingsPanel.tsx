
import React, { useState } from 'react';
import { Settings, X, Type, Maximize2, Minimize2, MoveVertical, Palette, RefreshCw } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    headingScale, setHeadingScale, 
    bodyScale, setBodyScale, 
    lineHeight, setLineHeight,
    contentWidth, setContentWidth 
  } = useSettings();
  const { t, dir } = useLanguage();

  const resetAll = () => {
    setHeadingScale(1.0);
    setBodyScale(1.0);
    setLineHeight(1.8);
    setContentWidth('normal');
  };

  return (
    <div className={`fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-[100]`}>
      {/* Main Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all active:scale-90"
      >
        {isOpen ? <X size={28} /> : <Settings size={28} className="group-hover:rotate-90 transition-transform duration-500" />}
        {!isOpen && <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full border-2 border-white animate-pulse"></span>}
      </button>

      {/* Editor Panel */}
      {isOpen && (
        <div className={`absolute bottom-20 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-80 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 p-8 animate-in slide-in-from-bottom-8 duration-300`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display font-black text-slate-900 flex items-center gap-2 text-lg">
              <Palette size={20} className="text-blue-600" />
              {t('appearance_settings')}
            </h3>
            <button onClick={resetAll} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset All">
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Heading Size Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   {t('font_size')} (العناوين)
                </label>
                <span className="text-xs font-bold text-blue-600">{(headingScale * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.7" max="2.0" step="0.05"
                value={headingScale}
                onChange={(e) => setHeadingScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Body Text Size Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                   {t('font_size')} (النصوص)
                </label>
                <span className="text-xs font-bold text-blue-600">{(bodyScale * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.8" max="2.0" step="0.05"
                value={bodyScale}
                onChange={(e) => setBodyScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Line Height Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   {t('line_height')}
                </label>
                <span className="text-xs font-bold text-blue-600">{lineHeight}</span>
              </div>
              <input 
                type="range" min="1.2" max="2.5" step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Content Width Control */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                {t('content_width')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setContentWidth('normal')}
                  className={`h-11 flex items-center justify-center gap-2 rounded-xl border transition-all font-bold text-xs ${contentWidth === 'normal' ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Minimize2 size={14} /> Normal
                </button>
                <button 
                  onClick={() => setContentWidth('wide')}
                  className={`h-11 flex items-center justify-center gap-2 rounded-xl border transition-all font-bold text-xs ${contentWidth === 'wide' ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Maximize2 size={14} /> Wide
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-[10px] text-blue-700 leading-relaxed font-bold text-center">
                  💡 تذكر: يمكنك إخباري بهذه القيم لنجعلها التصميم الافتراضي للموقع دائماً!
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
