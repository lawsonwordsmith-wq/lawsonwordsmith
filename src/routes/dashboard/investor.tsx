import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Video,
  BarChart3,
  Target,
  Lightbulb,
  Calendar,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard/investor')({
  component: InvestorDashboard,
})

const resources = [
  { title: 'How to Build a Winning Pitch Deck', type: 'Video', duration: '55 min' },
  { title: 'Investor Mindset & Due Diligence', type: 'Video', duration: '48 min' },
  { title: 'SME Funding Landscape in Zambia', type: 'Article', duration: '15 min read' },
  { title: 'Negotiating with Investors', type: 'Video', duration: '40 min' },
]

const opportunities = [
  { name: 'AgriTech Startup — Lusaka', stage: 'Seed', ask: '$50K', sector: 'Agriculture' },
  { name: 'EdTech Platform — Copperbelt', stage: 'Pre-seed', ask: '$20K', sector: 'Education' },
  { name: 'Logistics SaaS — Zambia', stage: 'Series A', ask: '$200K', sector: 'Logistics' },
]

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'opportunities' | 'mentorship'>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white px-4 py-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-purple-100 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold">Investor Seeker Portal</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {(['overview', 'resources', 'opportunities', 'mentorship'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
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
              <StatCard label="Resources Available" value="12" icon={<FileText className="text-purple-600" size={24} />} />
              <StatCard label="Live Sessions" value="4" icon={<Video className="text-blue-600" size={24} />} />
              <StatCard label="Opportunities Listed" value={opportunities.length.toString()} icon={<Target className="text-green-600" size={24} />} />
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={20} className="text-amber-500" />
                <h2 className="font-bold text-lg">Investor Insight of the Week</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                "Investors fund people before ideas. Your track record, credibility, and communication matter more than the concept itself. Build your personal brand — Lawson Wordsmith."
              </p>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-4">Upcoming Investment Webinars</h2>
              <div className="bg-white rounded-xl border p-5 flex items-start gap-4">
                <Calendar size={20} className="text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">Pitching to Angel Investors — Live Workshop</p>
                  <p className="text-sm text-gray-500 mt-0.5">Thu, 27 Mar 2026 · 3:00 PM CAT · Lawson Wordsmith</p>
                </div>
                <Link to="/classes" className="text-sm font-semibold text-purple-600 hover:text-purple-700">Register →</Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-3">
            <h2 className="font-bold text-lg mb-4">Investment Resources</h2>
            {resources.map((r) => (
              <div key={r.title} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  {r.type === 'Video' ? <Video size={18} className="text-purple-600" /> : <FileText size={18} className="text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{r.title}</p>
                  <p className="text-xs text-gray-400">{r.type} · {r.duration}</p>
                </div>
                <button className="text-xs font-semibold text-purple-600 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                  {r.type === 'Video' ? 'Watch' : 'Read'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div>
            <h2 className="font-bold text-lg mb-4">Investment Opportunities</h2>
            <div className="space-y-4">
              {opportunities.map((o) => (
                <div key={o.name} className="bg-white rounded-xl border p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{o.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{o.sector} · {o.stage}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-700">{o.ask}</div>
                      <div className="text-xs text-gray-400">Seeking</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link to="/contact" className="text-sm font-semibold text-purple-600 border border-purple-200 px-4 py-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                      Express Interest
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mentorship' && (
          <div>
            <h2 className="font-bold text-lg mb-4">1-on-1 Mentorship</h2>
            <div className="bg-white rounded-2xl border p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-blue-900 font-black text-2xl mx-auto mb-4">
                LW
              </div>
              <h3 className="font-bold text-xl mb-1">Lawson Wordsmith</h3>
              <p className="text-gray-500 text-sm mb-1">Business Coach &amp; Investor Trainer</p>
              <p className="text-gray-400 text-xs mb-6">Lusaka CB, Zambia · +260 776 025 370</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                Book a private mentorship session to get personalised guidance on your investment journey, pitch strategy, and business plan.
              </p>
              <Link to="/contact" className="inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors">
                Book a Session
              </Link>
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
