import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../contexts/DashboardContext';
import { 
  Menu as MenuIcon, 
  X, 
  LayoutDashboard, 
  Users, 
  Brain, 
  BookOpen, 
  Settings, 
  LogOut, 
  Bell 
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, logout, isDarkTheme } = useAuth();
  const { notifications } = useDashboard();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigation = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Patient Records', path: '/patient_list', icon: Users },
    { name: 'Clinical AI', path: '/clinical_ai', icon: Brain },
    { name: 'Material Library', path: '/material_library', icon: BookOpen },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/nav_overview';
    }
    return location.pathname.startsWith(path);
  };

  const displayName = user?.name ? `Dr. ${user.name}` : 'Doctor';
  const displayInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'D';

  return (
    <div className={`flex h-screen bg-[#F8F9FA] overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 flex-shrink-0">
        
        {/* Header Profile Section */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/settings')}>
          <div className="w-14 h-14 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#007AFF] text-xl font-bold overflow-hidden border border-gray-100 flex-shrink-0">
            {user?.profilePhotoUri ? (
              <img src={user.profilePhotoUri} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              displayInitial
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 leading-tight">
              {displayName}
            </h4>
            <span className="text-xs text-gray-400 font-semibold">
              Endodontist
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  active
                    ? 'bg-[#E3F2FD] text-[#007AFF]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`mr-4 h-5 w-5 ${active ? 'text-[#007AFF]' : 'text-gray-400'}`} />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setShowLogoutModal(true)} 
            className="w-full flex items-center px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all border-none"
          >
            <LogOut className="mr-4 h-5 w-5 text-red-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg border-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <span className="text-lg font-bold text-[#007AFF] tracking-wide">
              EndoAI Assistant
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Button */}
            <button 
              onClick={() => navigate('/notifications')} 
              className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full border-none cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
        </header>

        {/* Mobile slide-out menu drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative flex flex-col w-72 bg-white h-full shadow-2xl animate-slide-right">
              <div 
                className="p-5 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate('/settings');
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#007AFF] font-bold overflow-hidden border border-gray-100 flex-shrink-0">
                    {user?.profilePhotoUri ? (
                      <img src={user.profilePhotoUri} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      displayInitial
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm leading-tight">{displayName}</h5>
                    <span className="text-[10px] text-gray-400 font-bold">Endodontist</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1 text-gray-400 hover:bg-gray-100 rounded-full border-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl ${
                        active ? 'bg-[#E3F2FD] text-[#007AFF]' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-4 h-5 w-5" />
                      {item.name}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }} 
                  className="w-full flex items-center px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl border-none"
                >
                  <LogOut className="mr-4 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl animate-scale-up text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Logout
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to logout from EndoAI?
            </p>
            <div className="flex gap-3 justify-center w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-1/2 px-4 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="w-1/2 px-4 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors border-none cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
