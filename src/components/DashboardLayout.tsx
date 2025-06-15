
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Building2,
  Users,
  FolderOpen,
  Package,
  Clock,
  CreditCard,
  Menu,
  LogOut,
  Home,
  CheckSquare,
  User,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useGlobalPreferences();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const navigation = [
    { name: t('dashboard'), href: "/dashboard", icon: Home },
    { name: t('projects'), href: "/dashboard/projects", icon: FolderOpen },
    { name: t('employees'), href: "/dashboard/employees", icon: Users },
    { name: t('materials'), href: "/dashboard/materials", icon: Package },
    { name: t('tasks'), href: "/dashboard/tasks", icon: CheckSquare },
    { name: t('time_entries'), href: "/dashboard/time-entries", icon: Clock },
    { name: t('expenses'), href: "/dashboard/expenses", icon: CreditCard },
    { name: t('profile'), href: "/dashboard/profile", icon: User },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const NavItems = () => (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <Button
            key={item.name}
            variant={isActive ? "secondary" : "ghost"}
            className={`w-full justify-start text-left transition-all duration-200 ${
              isActive
                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onClick={() => {
              navigate(item.href);
              setSidebarOpen(false);
            }}
          >
            <Icon className="mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-colors duration-200" />
            <span className="truncate">{item.name}</span>
          </Button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 sm:w-72 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex h-full flex-col">
            <div className="flex h-14 sm:h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">GB</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">Gestibud</span>
              </div>
            </div>
            <NavItems />
          </div>
        </SheetContent>

        {/* Desktop sidebar */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GB</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">Gestibud</span>
              </div>
            </div>
            <NavItems />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
              <div className="flex items-center">
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block transition-colors duration-300">
                  {t('currentLanguage') === 'fr' ? 'Bonjour' : 'Hello'}, {user?.user_metadata?.first_name || user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6">
            {children}
          </main>
        </div>
      </Sheet>
    </div>
  );
};
