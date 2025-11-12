import React, { useState } from 'react';
import Card from '../../components/ui/Card';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a call to a backend service.
    // For this simulation, we use hardcoded credentials.
    if (username === 'admin' && password === 'ksdmBankAdmin2024!') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold text-ksdm-deep-blue mb-6">Admin Panel Login</h1>
        <Card>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-white text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border-gray-300 rounded-md shadow-sm"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ksdm-deep-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Log In
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;