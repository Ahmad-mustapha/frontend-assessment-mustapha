'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { DashboardLayoutProps } from '@/types/layout';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-bg-main relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-red/5 blur-[150px] pointer-events-none -z-10" />

            <div className="flex relative z-10">
                <Sidebar 
                    isOpen={isMobileOpen} 
                    isCollapsed={isCollapsed}
                    onClose={() => setIsMobileOpen(false)} 
                />

                <div className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ease-out pt-18 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
                    }`}>
                    <TopBar 
                        isCollapsed={isCollapsed}
                        onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
                        onOpenMobileSidebar={() => setIsMobileOpen(true)}
                        user={{
                            name: "Louise Bourgeois",
                            role: "Lead Admin"
                        }}
                    />
                    
                    <main className="flex-1 px-4 sm:px-8 py-8 md:py-12 max-w-[1700px] w-full mx-auto">
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
