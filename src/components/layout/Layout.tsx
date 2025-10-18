import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Trigger loading animation on route change
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    dispatch(setSidebarOpen(false));
  }, [location.pathname, dispatch]);
  return <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ease-in-out animate-in fade-in" onClick={() => dispatch(setSidebarOpen(false))} />}
      
      {/* Sidebar - responsive behavior with smooth animations */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen 
          ? 'translate-x-0 w-64' 
          : '-translate-x-full lg:translate-x-0 lg:w-20'
      }`}>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out">
        <Header />
        <main className="flex-1 relative flex flex-col overflow-hidden">
          {isLoading ? <div className="absolute inset-0 bg-white/80 z-50 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                <div className="w-full h-full rounded-full border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/10 animate-pulse"></div>
                </div>
              </div>
            </div> : null}
          <div className="flex-1 h-full max-w-[1600px] mx-auto w-full p-3 sm:p-4 md:p-6 overflow-auto flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>;
};
export default Layout;