import React from 'react';
import { PenTool, X, Save, RefreshCw } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';

const AIEditor: React.FC = () => {
  const { editMode, setEditMode, globalStyles, setGlobalStyles } = useAdmin();
  const { dir } = useLanguage();

  if (!editMode) {
    // Hidden trigger area (bottom left)
    return (
      <div 
        className="fixed bottom-0 left-0 w-20 h-20 z-50 flex items-end justify-start p-4 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
        onClick={() => setEditMode(true)}
        title="Admin Mode"
      >
        <div className="w-8 h-8 bg-slate-200/50 rounded-full flex items-center justify-center text-slate-500">
           <PenTool size={14} />
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 ${dir === 'rtl' ? 'right-6' : 'left-6'} z-[100] animate-in slide-in-from-bottom-4 duration-300`}>
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 p-6 w-72">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
            <PenTool size={16} className="text-blue-600" />
            Admin Tools
          </h3>
          <button 
            onClick={() => setEditMode(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-bold mb-2">Editor Status</p>
            <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium dark:text-slate-300">Active</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Text Alignment</label>
            <div className="grid grid-cols-4 gap-1">
               {['left', 'center', 'right', 'justify'].map((align) => (
                 <button
                   key={align}
                   onClick={() => setGlobalStyles({ textAlign: align as any })}
                   className={`h-8 rounded-lg border text-xs font-bold transition-all ${globalStyles.textAlign === align ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'}`}
                 >
                   {align.charAt(0).toUpperCase()}
                 </button>
               ))}
            </div>
          </div>
          
          <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Save size={14} /> Save Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIEditor;