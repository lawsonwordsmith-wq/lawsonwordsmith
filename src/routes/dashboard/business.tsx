import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Briefcase,
  Users,
  Video,
  FileText,
  Award,
  BarChart3,
  Calendar,
  MessageSquare,
  Target,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard/business')({
  component: BusinessDashboard,
})

const programs = [
  { title: 'Corporate Communication Masterclass', sessions: 8, enrolled: 34, type: 'Video Series' },
  { title: 'Leadership in the Modern Workplace', sessions: 6, enrolled: 21, type: 'Live + Video' },
  { title: 'Business Writing & Presentation Skills', sessions: 5, enrolled: 28, type: 'Video Series' },
  { title: 'Negotiation & Conflict Resolution', sessions: 4, enrolled: 15, type: 'Live Workshop' },
]

const webinars = [
  { title: 'Building High-Performance Teams', date: 'Tue, 25 Mar 2026', time: '11:00 AM CAT' },
  { title: 'Strategic Business Planning for 2026', date: 'Thu, 3 Apr 2026', time: '2:00 PM CAT' },
]

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'webinars' | 'network'>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <Briefcase size={28} />
          </div>
          <div>
            <p className="text-amber-100 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold">Business Personnel Portal</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {(['overview', 'programs', 'webinars', 'network'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-amber-600 text-amber-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard label="Training Programs" value={programs.length.toString()} icon={<Award className="text-amber-600" size={24} />} />
              <StatCard label="Professionals Enrolled" value="98" icon={<Users className="text-blue-600" size={24} />} />
              <StatCard label="Webinars This Month" value="4" icon={<Calendar className="text-green-600" size={24} />} />
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 p-6">
              <h2 className="font-bold text-lg mb-1">Featured Program</h2>
              <p className="text-gray-500 text-sm mb-3">Most popular this month</p>
              <h3 className="text-xl font-bold mb-2">Corporate Communication Masterclass</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                A comprehensive 8-session deep-dive into professional communication, presentation skills, and workplace dynamics for corporate teams and executives.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">8 sessions · 34 enrolled</span>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-4">Upcoming Webinars</h2>
              {webinars.map((w) => (
                <div key={w.title} className="bg-white rounded-xl border p-4 mb-3 flex items-start gap-4">
                  <Calendar size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{w.title}</p>
                    <p className="text-xs text-gray-500">{w.date} · {w.time}</p>
                  </div>
                  <Link to="/classes" className="text-xs font-semibold text-amber-600 hover:text-amber-700">Register →</Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="grid md:grid-cols-2 gap-4">
            {programs.map((p) => (
              <div key={p.title} className="bg-white rounded-xl border p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">{p.type}</span>
                </div>
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.sessions} sessions · {p.enrolled} enrolled</p>
                <button className="mt-4 w-full py-2 border-2 border-amber-500 text-amber-700 font-semibold rounded-lg text-sm hover:bg-amber-50 transition-colors">
                  View Program
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'webinars' && (
          <div>
            <h2 className="font-bold text-lg mb-4">Live Webinars & Workshops</h2>
            <div className="space-y-4">
              {webinars.map((w) => (
                <div key={w.title} className="bg-white rounded-xl border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">LIVE</span>
                  </div>
                  <h3 className="font-semibold">{w.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{w.date} · {w.time}</p>
                  <p className="text-xs text-gray-400 mt-1">Host: Lawson Wordsmith</p>
                  <Link to="/classes" className="mt-4 inline-block bg-amber-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors">
                    Join Live
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div>
            <h2 className="font-bold text-lg mb-4">Business Network</h2>
            <div className="bg-white rounded-2xl border p-8 text-center mb-6">
              <MessageSquare size={40} className="text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Connect &amp; Collaborate</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                Join the community discussion board to network with other business professionals, share opportunities, and access collaborative resources.
              </p>
              <Link to="/community" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors">
                Go to Community
              </Link>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <h3 className="font-semibold mb-3">Contact Trainer Directly</h3>
              <p className="text-sm text-gray-600 mb-3">For corporate training inquiries and custom programs:</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>📧 lawsonwordsmith@gmail.com</p>
                <p>📞 +260 776 025 370</p>
                <p>📍 Lusaka CB, Zambia</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
      {icon}
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}
