import { useState } from 'react';
import { Bell, Search, HelpCircle, Settings, LogOut, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthenticationService from '../../services/authentication';

const Header = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const handleLogout = async () => {
    try {
      await AuthenticationService.logoutAsync();
      await logout();
    } catch (error) {
      // Even if logout fails, navigate to login
      await logout();
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  return <header className="border-b border-gray-100 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/Asika_New.svg" 
              alt="Asika Logo" 
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end lg:justify-end">
          {/* Search bar - hidden on mobile by default */}
          <div className={`${showSearch ? 'absolute inset-x-0 top-0 p-4 bg-white z-10 h-16 flex items-center' : 'hidden'} md:relative md:block md:w-full md:max-w-md`}>
            {showSearch && <button className="absolute right-6 top-1/2 -translate-y-1/2 md:hidden" onClick={() => setShowSearch(false)}>
                <X size={20} />
              </button>}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1] focus:border-transparent" />
            </div>
          </div>
          {/* Mobile search button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setShowSearch(true)}>
            <Search size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors" onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfileMenu(false);
          }}>
              <Bell size={18} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            {showNotifications && <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Notifications</h3>
                    <span className="text-xs text-blue-600 cursor-pointer">
                      Mark all as read
                    </span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3">
                      <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          New patient appointment
                        </p>
                        <p className="text-xs text-gray-500">
                          John Smith scheduled for 2:30 PM today
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          10 minutes ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3">
                      <div className="h-9 w-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Workflow completed
                        </p>
                        <p className="text-xs text-gray-500">
                          Patient intake workflow completed successfully
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          25 minutes ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3">
                      <div className="h-9 w-9 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell size={16} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          System update available
                        </p>
                        <p className="text-xs text-gray-500">
                          New features are available for your dashboard
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex gap-3">
                      <div className="h-9 w-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell size={16} className="text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Automation failed</p>
                        <p className="text-xs text-gray-500">
                          Patient data extraction automation needs attention
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-100 text-center">
                  <button className="text-sm text-blue-600 hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>}
          </div>
          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <HelpCircle size={18} />
            </button>
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}>
                <div className="h-8 w-8 rounded-full bg-[#4169e1] flex items-center justify-center text-white text-xs font-medium">
                  {user ? getUserInitials(user.name) : 'U'}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">{user?.name || 'User'}</div>
                  <div className="text-xs text-muted-foreground">
                    {user?.role?.replace('_', ' ').toUpperCase() || 'User'}
                  </div>
                </div>
              </div>
              {showProfileMenu && <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#4169e1] flex items-center justify-center text-white text-sm font-medium">
                        {user ? getUserInitials(user.name) : 'U'}
                      </div>
                      <div>
                        <div className="font-medium">{user?.name || 'User'}</div>
                        <div className="text-xs text-gray-500">
                          {user?.email || 'user@example.com'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User size={16} />
                      <span>Manage Profile</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;