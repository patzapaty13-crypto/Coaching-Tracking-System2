import { useState } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { GraduationCap, Users, Shield, Briefcase } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User, remember?: boolean) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(true);

  const roleOptions = [
    {
      role: 'student',
      title: 'นักศึกษา',
      description: 'เข้าสู่ระบบสำหรับนักศึกษา',
      icon: GraduationCap,
      color: 'bg-blue-500',
    },
    {
      role: 'advisor',
      title: 'อาจารย์ที่ปรึกษา',
      description: 'เข้าสู่ระบบสำหรับอาจารย์',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      role: 'admin',
      title: 'ผู้บริหาร',
      description: 'เข้าสู่ระบบสำหรับผู้บริหารคณะ',
      icon: Shield,
      color: 'bg-purple-500',
    },
    {
      role: 'committee',
      title: 'กรรมการภายนอก',
      description: 'เข้าสู่ระบบสำหรับกรรมการประเมิน',
      icon: Briefcase,
      color: 'bg-orange-500',
    },
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleUserLogin = (user: User) => {
    onLogin(user, remember);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-blue-900">
              SPU Coaching Platform
            </h1>
          </div>
          <p className="text-gray-600">
            ระบบบริหารจัดการ Project-based Learning และ Coaching
          </p>
        </div>

        {/* Role Selection */}
        {!selectedRole ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              const selected = selectedRole === option.role;
              return (
                <button
                  key={option.role}
                  onClick={() => handleRoleSelect(option.role)}
                  className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group ${selected ? 'role-card-selected' : ''}`}
                >
                  <div className={`${option.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-500 text-sm">{option.description}</p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">เลือกบัญชี ({selectedRole})</h3>
                <p className="text-sm text-gray-500">คลิกผู้ใช้เพื่อเข้าสู่ระบบในบทบาทนี้</p>
              </div>
              <button onClick={() => setSelectedRole('')} className="text-sm text-blue-600">กลับ</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockUsers.filter(u => u.role === selectedRole).map(u => (
                <button key={u.id} onClick={() => handleUserLogin(u)} className="text-left p-3 rounded-lg border border-gray-100 hover:bg-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900">{u.name}</div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                  <div className="text-sm text-blue-600">เข้าสู่ระบบ</div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4" />
                จดจำการเข้าสู่ระบบ
              </label>
              <button onClick={() => setSelectedRole('')} className="text-sm text-gray-500">เปลี่ยนบทบาท</button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white/50 backdrop-blur rounded-2xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-blue-600 mb-2">📊 Auto Tracking</div>
              <p className="text-gray-600 text-sm">
                บันทึก Coaching Session อัตโนมัติพร้อม Timeline
              </p>
            </div>
            <div>
              <div className="text-green-600 mb-2">🤖 AI Assistant</div>
              <p className="text-gray-600 text-sm">
                AI Agent ช่วยสรุปและแนะนำ Action Items
              </p>
            </div>
            <div>
              <div className="text-purple-600 mb-2">📱 All-in-One</div>
              <p className="text-gray-600 text-sm">
                รวมข้อมูลทุกอย่างไว้ในที่เดียว ไม่ต้องใช้ Line/Excel
              </p>
            </div>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>🎯 Demo Version - คลิกเลือก Role เพื่อเข้าสู่ระบบ</p>
        </div>
      </div>
    </div>
  );
}
