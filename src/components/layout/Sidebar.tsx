import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Roles } from '../../enums';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, GitBranch, Play, FileText, BarChart, Settings, Phone, Users, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>('management');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const { user } = useAuth();
  const isSuperAdmin = user?.role === Roles.SUPER_ADMIN || user?.role === 'super_admin';

  return <div className="h-full w-full bg-white border-r border-border flex flex-col">
    {/* Toggle button */}
    <div className="h-16 border-b border-border flex items-center px-6">
      <button
        className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <div className="transition-all duration-300 ease-in-out transform">
          {sidebarOpen ? <X size={20} className="rotate-0" /> : <Menu size={20} className="rotate-0" />}
        </div>
      </button>
    </div>
    <div className={`flex-1 overflow-y-auto py-4 transition-all duration-300 ${sidebarOpen ? 'px-3' : 'px-2'}`}>
      <nav className="space-y-1">
        <Link to="/" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Dashboard">
          <LayoutDashboard size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Dashboard</span>
        </Link>
        <Link to="/messaging" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/messaging') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Messaging">
          <MessageSquare size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Messaging</span>
        </Link>
        <Link to="/voice-agent" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/voice-agent') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Voice Agent">
          <Phone size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Voice Agent</span>
        </Link>
        <Link to="/workflow" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/workflow') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Workflow">
          <GitBranch size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Workflow</span>
        </Link>
        <Link to="/automation" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/automation') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Automation">
          <Play size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Automation</span>
        </Link>
        <Link to="/templates" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/templates') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Templates">
          <FileText size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Templates</span>
        </Link>
        <Link to="/analytics" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/analytics') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Analytics">
          <BarChart size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Analytics</span>
        </Link>
        {isSuperAdmin && (
          <>
            <div className={`pt-4 pb-2 transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              <div className="px-3 text-xs font-medium uppercase text-gray-500">
                Administration
              </div>
            </div>

            <div onClick={() => { setSidebarOpen(true) }}>
              <button
                className={`w-full flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'justify-between px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${expandedSection === 'management' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => sidebarOpen ? toggleSection('management') : setExpandedSection('management')}
                title="Management"
              >
                <div className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3' : ''}`}>
                  <Users size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
                  <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Management</span>
                </div>
                <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {expandedSection === 'management' ? <ChevronDown size={16} className="w-[16px] h-[16px]" /> : <ChevronRight size={16} className="w-[16px] h-[16px]" />}
                </div>
              </button>

              <div className={`transition-all duration-300 ease-in-out ${expandedSection === 'management' && sidebarOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <div className="pl-9 pr-3 py-1 space-y-1">
                  <Link to="/user-management" className={`block px-3 py-1 rounded-md text-sm transition-colors duration-200 ${isActive('/user-management') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    User Management
                  </Link>
                  <Link to="/roles" className={`block px-3 py-1 rounded-md text-sm transition-colors duration-200 ${isActive('/roles') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Roles & Permissions
                  </Link>
                  <Link to="/departments" className={`block px-3 py-1 rounded-md text-sm transition-colors duration-200 ${isActive('/departments') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Departments
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        <Link to="/settings" className={`flex items-center transition-all duration-300 ease-in-out ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2 rounded-md text-sm h-10 ${isActive('/settings') ? 'bg-black/10 text-black font-medium' : 'text-gray-700 hover:bg-gray-100'}`} title="Settings">
          <Settings size={18} className="flex-shrink-0 w-[18px] h-[18px]" />
          <span className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>Settings</span>
        </Link>
      </nav>
    </div>
    <div className={`border-t border-border transition-all duration-300 ease-in-out ${sidebarOpen ? 'p-4 opacity-100 max-h-32' : 'p-0 opacity-0 max-h-0 overflow-hidden'}`}>
      <div className="bg-black/5 rounded-md p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0">
            <Phone size={16} className="text-black" />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>
            <div className="text-sm font-medium">Voice Agent</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-600">●</span> Active
            </div>
          </div>
        </div>
        <div className={`text-xs text-gray-600 transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'}`}>
          Maya AI has handled 28 calls today
        </div>
      </div>
    </div>
  </div>;
};
export default Sidebar;