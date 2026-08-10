import React from 'react';
import { Settings, Shield, Bell, User, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Settings className="w-5 h-5 text-gray-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your HerShield preferences and security.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {[
          { icon: User, title: "Profile Settings", desc: "Update your personal information and guardian details." },
          { icon: Shield, title: "Safety Preferences", desc: "Configure SOS triggers and automated check-ins." },
          { icon: Bell, title: "Notifications", desc: "Manage alerts, sounds, and push notifications." },
          { icon: Lock, title: "Privacy & Security", desc: "Control location sharing and data privacy." }
        ].map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
              <item.icon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-500 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
