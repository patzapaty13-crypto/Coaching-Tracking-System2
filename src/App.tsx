import React, { useState, Suspense, lazy } from 'react';
import { LoginPage } from './components/LoginPage';

const StudentDashboard = lazy(() => import('./components/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const AdvisorDashboard = lazy(() => import('./components/AdvisorDashboard').then(m => ({ default: m.AdvisorDashboard })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const CommitteeDashboard = lazy(() => import('./components/CommitteeDashboard').then(m => ({ default: m.CommitteeDashboard })));

export type UserRole = 'student' | 'advisor' | 'admin' | 'committee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('cts_current_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (user: User, remember = true) => {
    setCurrentUser(user);
    try {
      if (remember) localStorage.setItem('cts_current_user', JSON.stringify(user));
      else localStorage.removeItem('cts_current_user');
    } catch (e) {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try { localStorage.removeItem('cts_current_user'); } catch (e) {}
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
        {currentUser.role === 'student' && (
          <StudentDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'advisor' && (
          <AdvisorDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'admin' && (
          <AdminDashboard user={currentUser} onLogout={handleLogout} />
        )}
        {currentUser.role === 'committee' && (
          <CommitteeDashboard user={currentUser} onLogout={handleLogout} />
        )}
      </Suspense>
    </div>
  );
}
