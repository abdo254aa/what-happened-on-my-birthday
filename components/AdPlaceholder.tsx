import React from 'react';

interface AdPlaceholderProps {
  slot: "header" | "content" | "footer";
  className?: string;
  minHeight?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = "", minHeight = "100px" }) => {
  return (
    <div 
      className={`w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out ${className}`} 
      style={{ minHeight: minHeight, height: 'auto' }}
    >
      <div className="flex flex-col items-center gap-2 opacity-50 p-4">
          <span className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-widest text-center">
            Advertisement
          </span>
          <span className="text-[9px] text-slate-300 font-mono hidden md:block">
            {slot.toUpperCase()} SLOT (Responsive)
          </span>
      </div>
    </div>
  );
};

export default AdPlaceholder;