import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout 
} from '../store/slices/authSlice';
import { 
  toggleSidebar, 
  addNotification, 
  setGlobalLoading 
} from '../store/slices/uiSlice';
import { setUsers, setLoading } from '../store/slices/userSlice';

// Example component demonstrating Redux usage
const ReduxExample: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Selectors - accessing state from different slices
  const { isAuthenticated, user, loading: authLoading } = useAppSelector((state) => state.auth);
  const { sidebarOpen, theme, notifications } = useAppSelector((state) => state.ui);
  const { users, loading: usersLoading } = useAppSelector((state) => state.user);

  // Example actions
  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'admin',
        department: 'IT'
      };
      
      dispatch(loginSuccess({ 
        user: mockUser, 
        token: 'mock-jwt-token' 
      }));
      
      dispatch(addNotification({
        type: 'success',
        message: 'Login successful!'
      }));
    } catch (error) {
      dispatch(loginFailure('Login failed'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(addNotification({
      type: 'info',
      message: 'Logged out successfully'
    }));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLoadUsers = async () => {
    dispatch(setLoading(true));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        { id: '1', email: 'user1@example.com', name: 'User 1', role: 'admin', isActive: true },
        { id: '2', email: 'user2@example.com', name: 'User 2', role: 'user', isActive: true },
      ];
      
      dispatch(setUsers(mockUsers));
    } catch (error) {
      console.error('Failed to load users');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Redux Store Example</h1>
      
      {/* Auth State */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Authentication State</h2>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        {user && <p>User: {user.name} ({user.email})</p>}
        <div className="mt-3 space-x-2">
          {!isAuthenticated ? (
            <button 
              onClick={handleLogin}
              disabled={authLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {authLoading ? 'Logging in...' : 'Login'}
            </button>
          ) : (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* UI State */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">UI State</h2>
        <p>Sidebar Open: {sidebarOpen ? 'Yes' : 'No'}</p>
        <p>Theme: {theme}</p>
        <p>Notifications: {notifications.length}</p>
        <button 
          onClick={handleToggleSidebar}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
        >
          Toggle Sidebar
        </button>
      </div>

      {/* User Management */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">User Management</h2>
        <p>Users Count: {users.length}</p>
        <p>Loading: {usersLoading ? 'Yes' : 'No'}</p>
        <button 
          onClick={handleLoadUsers}
          disabled={usersLoading}
          className="mt-3 px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          {usersLoading ? 'Loading...' : 'Load Users'}
        </button>
        
        {users.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Users:</h3>
            <ul className="space-y-1">
              {users.map(user => (
                <li key={user.id} className="text-sm">
                  {user.name} ({user.email}) - {user.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Notifications</h2>
          <div className="space-y-2">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-2 rounded ${
                  notification.type === 'success' ? 'bg-green-100 text-green-800' :
                  notification.type === 'error' ? 'bg-red-100 text-red-800' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}
              >
                {notification.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReduxExample;
