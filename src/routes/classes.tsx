import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  Radio,
  ChevronRight,
  Bell,
} from 'lucide-react'

export const Route = createFileRoute('/classes')({
  component: ClassesPage,
})

const liveClasses = [
  {
    id: 1,
    title: 'Advanced Business Communication',
    host: 'Lawson Wordsmith',
    date: 'Wed, 26 Mar 2026',
    time: '10:00 AM CAT',
    status: 'upcoming',
    audience: 'All',
    description: 'Deep dive into professional communication strategies for the modern workplace.',
  },
  {
    id: 2,
    title: 'Resume Writing Live Workshop',
    host: 'Lawson Wordsmith',
    date: 'Fri, 28 Mar 2026',
    time: '2:00 PM CAT',
    status: 'upcoming',
    audience: 'Students',
    description: 'Interactive session: craft a standout resume with real-time feedback from Lawson.',
  },
  {
    id: 3,
    title: 'Pitching to Angel Investors',
    host: 'Lawson Wordsmith',
    date: 'Thu, 27 Mar 2026',
    time: '3:00 PM CAT',
    status: 'live',
    audience: 'Investors',
    description: 'Join LIVE now — expert tips on crafting and delivering an investor pitch.',
  },
]

const recordings = [
  { id: 1, title: 'Introduction to Business Communication', date: '2026-03-15', duration: '1h 02m', views: 128 },
  { id: 2, title: 'Leadership Fundamentals (March Edition)', date: '2026-03-10', duration: '58m', views: 95 },
  { id: 3, title: 'Public Speaking for Professionals', date: '2026-03-01', duration: '1h 14m', views: 211 },
  { id: 4, title: 'Entrepreneurship: Starting from Zero', date: '2026-02-22', duration: '1h 28m', views: 183 },
]

export default function ClassesPage() {
  const [tab, setTab] = useState<'upcoming' | 'recordings'>('upcoming')
  const [notified, setNotified] = useState<number[]>([])

  function handleNotify(id: number) {
    setNotified((prev) => [...prev, id])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Video size={28} className="text-amber-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">Live Online Classes</h1>
          <p className="text-blue-100 max-w-xl mx-auto">
            Join Lawson Wordsmith live or watch recorded sessions at your own pace. New classes every week from Lusaka, Zambia.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 flex gap-1">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'upcoming' ? 'border-blue-700 text-blue-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Upcoming &amp; Live
          </button>
          <button
            onClick={() => setTab('recordings')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'recordings' ? 'border-blue-700 text-blue-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Recorded Sessions
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {tab === 'upcoming' && (
          <div className="space-y-4">
            {liveClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl border p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {cls.status === 'live' ? (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          LIVE NOW
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          UPCOMING
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{cls.audience}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{cls.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{cls.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {cls.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {cls.time}</span>
                      <span className="flex items-center gap-1"><Users size={14} /> {cls.host}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {cls.status === 'live' ? (
                      <button className="flex items-center gap-2 bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors">
                        <Radio size={16} /> Join Live
                      </button>
                    ) : notified.includes(cls.id) ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <Bell size={14} /> Notified
                      </span>
                    ) : (
                      <button onClick={() => handleNotify(cls.id)} className="flex items-center gap-1.5 border border-blue-300 text-blue-700 font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                        <Bell size={14} /> Notify Me
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 text-center">
              Register your phone at <Link to="/contact" className="font-semibold underline">Contact</Link> to receive SMS reminders for all live classes.
            </div>
          </div>
        )}

        {tab === 'recordings' && (
          <div className="space-y-3">
            {recordings.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Play size={20} className="text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{r.title}</p>
                  <p className="text-xs text-gray-400">{r.date} · {r.duration} · {r.views} views</p>
                </div>
                <button className="text-sm font-semibold text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                  Watch
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
