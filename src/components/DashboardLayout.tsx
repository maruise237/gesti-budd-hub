
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate, useLocation } from "react-router-dom";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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
            className={`w-full justify-start ${
              isActive
                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => {
              navigate(item.href);
              setSidebarOpen(false);
            }}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </Button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GB</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Gestibud</span>
              </div>
            </div>
            <NavItems />
          </div>
        </SheetContent>

        {/* Desktop sidebar */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
            <div className="flex h-16 items-center px-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GB</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Gestibud</span>
              </div>
            </div>
            <NavItems />
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64">
          {/* Top header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center">
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {t('currentLanguage') === 'fr' ? 'Bonjour' : 'Hello'}, {user?.user_metadata?.first_name || user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </Button>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </Sheet>
    </div>
  );
};
