import { useState } from 'react';
import { USERS } from '../data/users';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="40" height="26" rx="3" stroke="#3B82F6" strokeWidth="2.5" fill="none"/>
            <rect x="16" y="34" width="16" height="4" fill="#3B82F6" opacity="0.4"/>
            <rect x="12" y="38" width="24" height="2" rx="1" fill="#3B82F6" opacity="0.4"/>
            <rect x="8" y="12" width="32" height="18" rx="1" fill="#3B82F6" opacity="0.15"/>
          </svg>
          <h1 className="text-2xl font-bold text-primary">AV Ops Center</h1>
          <p className="text-sm text-secondary">Operations Management Dashboard</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-lg bg-[#0F1117] border border-border text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-lg bg-[#0F1117] border border-border text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-offline">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-lg bg-accent hover:bg-blue-600 text-white font-semibold text-sm cursor-pointer transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
