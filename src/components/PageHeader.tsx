import React from 'react';
import { User } from '../types';
import { User as UserIcon, LogOut } from 'lucide-react';

interface PageHeaderProps {
  user: User;
  onLogout: () => void;
  subtitle?: string;
}

export function PageHeader({ user, onLogout, subtitle }: PageHeaderProps) {
  return (
    <div className="glass bg-white/60 border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="text-sm font-medium text-gray-800">{user.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}</div>
            </div>
            <div>
              <div className="text-gray-900 font-medium leading-tight">{user.name}</div>
              <div className="text-sm text-gray-500">{subtitle ?? user.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition"
              aria-label="ออกจากระบบ"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
