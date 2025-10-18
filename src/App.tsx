import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Messaging from './pages/Messaging';
import Workflow from './pages/Workflow';
import Automation from './pages/Automation';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import VoiceAgent from './pages/VoiceAgent';
import UserManagement from './pages/UserManagement';
import Roles from './pages/Roles';
import Departments from './pages/Departments';
import { getValueFromLocalStorage } from './utils/generic';

export function App() {
  // Get user data from localStorage on app load
  const userData = getValueFromLocalStorage('user');

  return (
    <Router>
      <AuthProvider userData={userData}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="workflow" element={<Workflow />} />
            <Route path="automation" element={<Automation />} />
            <Route path="templates" element={<Templates />} />
            <Route path="voice-agent" element={<VoiceAgent />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="roles" element={<Roles />} />
            <Route path="departments" element={<Departments />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}