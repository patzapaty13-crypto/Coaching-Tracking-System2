import { useState } from 'react';
import { User } from '../types';
import { Menu, User as UserIcon, LogOut, LayoutDashboard, FileText, Calendar } from 'lucide-react';

interface NavBarProps {
  user: User;
  onLogout: () => void;
}

export function NavBar({ user, onLogout }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-gray-900 font-medium">SPU Coaching</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <FileText className="w-4 h-4" />
              โปรเจกต์
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Calendar className="w-4 h-4" />
              Coaching
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-out menu (simple) */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50">
              <FileText className="w-4 h-4" />
              โปรเจกต์
            </button>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              Coaching
            </button>
            <button onClick={onLogout} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50">
              <LogOut className="w-4 h-4" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
