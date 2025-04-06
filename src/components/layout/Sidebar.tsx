
import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  LineChart, 
  PiggyBank, 
  Newspaper, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, active }) => {
  return (
    <Link to={to} className="w-full">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start gap-2 font-normal",
          active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent"
        )}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const isMobile = useIsMobile();
  
  if (isMobile && collapsed) {
    return null;
  }

  return (
    <div className={cn(
      "bg-sidebar h-screen flex flex-col transition-all duration-300 border-r border-sidebar-border",
      collapsed ? "w-20" : "w-64",
    )}>
      <div className="flex items-center p-4">
        <div className={cn(
          "flex items-center gap-2 text-sidebar-foreground",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-lg bg-finai-secondary flex items-center justify-center">
            <span className="font-bold text-white">AI</span>
          </div>
          {!collapsed && <span className="font-semibold text-lg">FinAI Navigator</span>}
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" active />
        <SidebarLink to="/stocks" icon={LineChart} label="Stocks" />
        <SidebarLink to="/expenses" icon={PiggyBank} label="Expenses" />
        <SidebarLink to="/news" icon={Newspaper} label="Market News" />
        <SidebarLink to="/chat" icon={MessageSquare} label="AI Advisor" />
      </div>

      <div className="p-3 space-y-1 border-t border-sidebar-border">
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
        <SidebarLink to="/help" icon={HelpCircle} label="Help & Support" />
        <SidebarLink to="/logout" icon={LogOut} label="Log Out" />
      </div>
    </div>
  );
};

export default Sidebar;
