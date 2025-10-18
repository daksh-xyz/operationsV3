import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthenticationService from '../services/authentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await AuthenticationService.loginAsync(email, password);
      
      if (response.success && response.data?.user) {
        login(response.data.user);
        navigate('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error: any) {
      setError(error?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg border border-border">
      <div className="text-center">
        <div className="flex justify-center">
          <img src="/Asika_New.svg" alt="Novocuris Logo" className="h-10" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Sign in to the Maya AI Dashboard
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <>
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          </>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#4169e1] focus:ring-[#4169e1]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-[#4169e1] hover:text-[#3a5ecc]">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-[#4169e1] px-3 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      <div className="mt-2 text-sm text-muted-foreground">
        Not registered yet?{' '}
        <Link to="#" className="text-[#4169e1] hover:text-[#3a5ecc]">
          Create an account
        </Link>
      </div>
    </div>
  </div>;
};
export default Login;