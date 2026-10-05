import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Settings,
  Inbox
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { adminFetch as fetch } from './secureApi';

const API_URL = window.location.origin;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verify token on mount
    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/verify`);
        if (!response.ok) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      } catch (err) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST'
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/footer-forms', icon: FileText, label: 'Footer Forms' },
    { path: '/admin/contact-forms', icon: MessageSquare, label: 'Contact Forms' },
    { path: '/admin/get-in-touch', icon: Inbox, label: 'AI Consulting Enquiry' },
    { path: '/admin/careers', icon: Briefcase, label: 'Career Applications' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col bg-[#0B1F3B] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && <span className="font-bold text-xl">BluBridge</span>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            data-testid="admin-sidebar-toggle"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`admin-nav-${item.path.split('/').pop()}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'bg-[#328CC1] text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            data-testid="admin-sidebar-logout"
            className="flex items-center gap-3 px-3 py-2.5 w-full text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1F3B] text-white flex items-center justify-between px-4 z-50">
        <span className="font-bold text-xl">BluBridge</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle admin menu"
          aria-expanded={mobileMenuOpen}
          data-testid="admin-mobile-menu-toggle"
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#0B1F3B] text-white z-40">
          <nav className="py-4 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`admin-mobile-nav-${item.path.split('/').pop()}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-[#328CC1] text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              data-testid="admin-mobile-logout"
              className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-colors mt-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 lg:ml-0 mt-16 lg:mt-0">
        {/* Top Bar */}
        <header className="hidden lg:flex h-16 bg-white border-b border-[#E5E7EB] items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-[#0B1F3B]">Admin Panel</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            data-testid="admin-header-logout"
            size="sm"
            className="text-[#6B7280] border-[#E5E7EB] hover:bg-[#F3F4F6]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
