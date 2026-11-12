import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Sparkles, ImageOff } from 'lucide-react';

interface AIImageProps {
  prompt: string;
  fallbackGradient: string;
  alt: string;
  className?: string;
}

// Global state to track if we've hit a hard quota limit recently
let globalQuotaExhausted = false;
let quotaResetTimeout: any = null;

// Global in-memory cache to survive component re-mounts
const memoryCache: Record<string, string> = {};

const AIImage: React.FC<AIImageProps> = ({ prompt, fallbackGradient, alt, className = "" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `ai_img_${btoa(unescape(encodeURIComponent(prompt))).substring(0, 40)}`;

    const generateImage = async (retryCount = 0): Promise<void> => {
      // 1. Check Memory Cache first
      if (memoryCache[cacheKey]) {
        if (isMounted) {
          setImageUrl(memoryCache[cacheKey]);
          setLoading(false);
        }
        return;
      }

      // 2. Check if quota is known to be exhausted globally
      if (globalQuotaExhausted) {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
        return;
      }

      // 3. Check Session Storage
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          memoryCache[cacheKey] = cached;
          if (isMounted) {
            setImageUrl(cached);
            setLoading(false);
          }
          return;
        }
      } catch (e) {}

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1"
            }
          }
        });

        const candidate = response.candidates?.[0];
        const part = candidate?.content?.parts?.find(p => p.inlineData);

        if (part && part.inlineData) {
          const base64Data = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          memoryCache[cacheKey] = base64Data;
          try {
            sessionStorage.setItem(cacheKey, base64Data);
          } catch (storageError) {}

          if (isMounted) {
            setImageUrl(base64Data);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
        }
      } catch (err: any) {
        const errorMsg = err?.message || JSON.stringify(err);
        const is429 = errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED");

        if (is429) {
          // Mark globally as exhausted for a while (e.g. 2 minutes) to stop trying
          globalQuotaExhausted = true;
          if (quotaResetTimeout) clearTimeout(quotaResetTimeout);
          quotaResetTimeout = setTimeout(() => { globalQuotaExhausted = false; }, 120000);

          if (retryCount < 2) { 
            const delay = Math.pow(3, retryCount) * 4000 + Math.random() * 2000;
            console.warn(`AI Image: Rate limited (429). Retrying in ${Math.round(delay)}ms...`);
            setTimeout(() => {
              if (isMounted) generateImage(retryCount + 1);
            }, delay);
            return;
          }
        }

        console.error("AI Image Generation Error:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    generateImage();

    return () => {
      isMounted = false;
    };
  }, [prompt]);

  if (loading) {
    return (
      <div className={`${className} bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center animate-pulse`}>
        <Loader2 className="animate-spin text-blue-500/50" size={20} />
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`${className} bg-gradient-to-br ${fallbackGradient} flex items-center justify-center relative overflow-hidden`}>
        <ImageOff className="text-white/30" size={32} />
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden bg-slate-200 dark:bg-slate-700 relative group`}>
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md z-10 border border-white/10">
         <span className="text-[8px] font-black text-white/90 uppercase tracking-widest flex items-center gap-1">
            <Sparkles size={10} className="text-blue-400" /> AI Visual
         </span>
      </div>
    </div>
  );
};

export default AIImage;