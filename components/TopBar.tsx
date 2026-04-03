'use client';

import React from 'react';
import { Search, Bell, ChevronLeft, ChevronRight, Menu, User } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { TopBarProps } from '@/types/layout';

export default function TopBar({ user, isCollapsed, onToggleSidebar, onOpenMobileSidebar }: TopBarProps) {
    const [inputValue, setInputValue] = React.useState('');
    const debouncedValue = useDebounce(inputValue, 350);

    return (
        <header className={`fixed top-0 right-0 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 bg-black/80 backdrop-blur-md border-b border-white/5 z-40 transition-all duration-300 ease-out ${
            isCollapsed ? 'left-20' : 'left-0 lg:left-64'
        }`}>
            {/* Left: Collapse Toggle & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-4">
                <button 
                    onClick={onOpenMobileSidebar}
                    className="p-2 text-slate-400 hover:text-white lg:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                <button 
                    onClick={onToggleSidebar}
                    className="hidden lg:flex items-center justify-center w-8 h-8 rounded border border-white/10 text-slate-500 hover:text-white hover:border-brand-red transition-all active:scale-95 group"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 group-hover:scale-110" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 group-hover:scale-110" />
                    )}
                </button>
            </div>

            {/* Middle: Search bar (Geometric style) */}
            <div className="flex-1 max-w-xl px-4 md:px-8 hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-red transition-colors" />
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="SEARCH EVERYTHING"
                        className="w-full h-11 bg-white/[0.03] border border-white/10 rounded-lg pl-12 pr-12 text-xs text-white placeholder-slate-600 outline-none focus:border-brand-red/30 focus:bg-white/[0.05] transition-all font-bold tracking-widest uppercase"
                    />
                </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-3 md:gap-6">
                <button className="relative p-2 text-slate-500 hover:text-white transition-colors group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-brand-red rounded-full border border-bg-main"></span>
                </button>

                <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-white/5 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-white group-hover:text-brand-red uppercase tracking-tight">
                            {user?.name || 'LOUISE B'}
                        </p>
                    </div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded bg-[#1A1A1A] border border-white/10 flex items-center justify-center group-hover:border-brand-red/50 shadow-xl transition-all">
                        <User className="w-4 h-4 text-slate-600" />
                    </div>
                </div>
            </div>
        </header>
    );
}
