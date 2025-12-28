
import React from 'react';

interface AdPlaceholderProps {
  slot: "header" | "content" | "footer";
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = "" }) => {
  let sizeClass = "";
  
  switch (slot) {
    case 'header':
      sizeClass = "h-[100px] md:h-[250px] w-full max-w-[970px]";
      break;
    case 'content':
      sizeClass = "h-[250px] md:h-[300px] w-full";
      break;
    case 'footer':
      sizeClass = "h-[100px] md:h-[200px] w-full max-w-[970px]";
      break;
  }

  return (
    <div className={`flex flex-col items-center justify-center my-8 md:my-12 ${className}`}>
        <div className="text-[9px] md:text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 font-bold opacity-60">مساحة إعلانية / Advertisement</div>
        <div className={`${sizeClass} bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-bold relative overflow-hidden transition-colors`}>
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                    $
                </div>
                <span className="relative z-10 px-4 text-center">ADSENSE RESPONSIVE UNIT</span>
            </div>
        </div>
    </div>
  );
};

export default AdPlaceholder;
