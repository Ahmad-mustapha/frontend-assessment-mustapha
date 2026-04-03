'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    TrendingUp,
    PlusCircle,
    Video,
    List,
    Settings,
    Phone,
    LogOut,
    X
} from 'lucide-react';
import { NavItem, SidebarProps } from '@/types/layout';

const navItems: NavItem[] = [
    { label: 'HOME', href: '/', icon: Home },
    { label: 'TRENDING', href: '/trending', icon: TrendingUp },
    { label: 'DISCOVER', href: '/discover', icon: PlusCircle },
    { label: 'MOVIES', href: '/movies', icon: Video },
    { label: 'WATCHLIST', href: '/watchlist', icon: List },
    { label: 'SUPPORT', href: '/support', icon: Phone },
];

export default function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 bg-[#0A0A0A] border-r border-white/5 flex flex-col z-50 transform transition-all duration-300 ease-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'
                }`}>

                <div className={`h-20 flex items-center px-6 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'
                    }`}>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded bg-brand-red flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                            <span className="text-white font-black text-lg italic">S</span>
                        </div>
                        {!isCollapsed && (
                            <span className="text-lg font-black tracking-tighter text-white italic">
                                STREAM<span className="text-brand-red">FIX</span>
                            </span>
                        )}
                    </Link>
                    {!isCollapsed && (
                        <button onClick={onClose} className="p-2 text-slate-600 hover:text-white lg:hidden">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <nav className={`flex-1 py-8 space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center rounded-lg text-[13px] font-bold transition-all duration-200 relative group ${isCollapsed ? 'justify-center h-12 w-12 mx-auto' : 'gap-4 px-4 py-3'
                                    } ${isActive
                                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/10'
                                        : 'text-slate-500 hover:text-slate-200'
                                    }`}
                            >
                                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'group-hover:text-brand-red transition-colors'}`} />
                                {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className={`py-6 border-t border-white/5 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    <Link href="/settings" className={`flex items-center rounded-lg text-slate-600 hover:text-white transition-all ${isCollapsed ? 'justify-center h-10 w-10 mx-auto' : 'gap-3 px-4 py-2'
                        }`}>
                        <Settings className="w-4 h-4" />
                        {!isCollapsed && <span className="text-xs font-bold">Preferences</span>}
                    </Link>

                    <button className={`flex items-center w-full rounded-lg text-slate-700 hover:text-brand-red transition-all mt-4 border border-transparent hover:border-brand-red/20 ${isCollapsed ? 'justify-center h-10 w-10 mx-auto' : 'gap-3 px-4 py-2.5'
                        }`}>
                        <LogOut className="w-4 h-4" />
                        {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-wider">Exit Hub</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
