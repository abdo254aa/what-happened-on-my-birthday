
import React from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface AIImageProps {
  prompt: string;
  fallbackGradient: string;
  alt: string;
  className?: string;
}

const AIImage: React.FC<AIImageProps> = ({ fallbackGradient, alt, className = "" }) => {
  // Instead of generating AI images, we render a high-quality aesthetic placeholder
  // using the provided gradient class. This ensures 100% reliability and speed.
  
  return (
    <div className={`${className} ${fallbackGradient} relative overflow-hidden group flex items-center justify-center`}>
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>
      
      {/* Animated Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 ease-in-out"></div>

      {/* Central Icon/Visual */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-white/90 transform group-hover:-translate-y-1 transition-transform duration-500">
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
           <ImageIcon size={32} className="opacity-90" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 drop-shadow-md hidden sm:block">
            {alt.split(' ').slice(0, 2).join(' ')}
        </span>
      </div>

      {/* Badge */}
      <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
         <span className="text-[10px] font-black text-white/90 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={12} className="text-yellow-300" /> Premium
         </span>
      </div>
    </div>
  );
};

export default AIImage;
