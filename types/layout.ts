import { LucideIcon } from 'lucide-react';

export interface LayoutUser {
    name: string;
    role: string;
    avatar?: string;
}

export interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
}

export interface TopBarProps {
    user?: LayoutUser;
    isCollapsed: boolean;
    onToggleSidebar: () => void;
    onOpenMobileSidebar: () => void;
}

export interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
}
