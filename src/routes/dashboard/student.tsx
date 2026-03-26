import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  GraduationCap,
  Play,
  BookOpen,
  Users,
  Bell,
  Download,
  Video,
  CheckCircle,
  Clock,
  Star,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard/student')({
  component: StudentDashboard,
})

const lessons = [
  { id: 1, title: 'Introduction to Business Communication', duration: '45 min', watched: true, category: 'Communication' },
  { id: 2, title: 'Professional Resume Writing', duration: '38 min', watched: true, category: 'Career' },
  { id: 3, title: 'Public Speaking Mastery', duration: '52 min', watched: false, category: 'Communication' },
  { id: 4, title: 'Leadership Fundamentals', duration: '41 min', watched: false, category: 'Leadership' },
  { id: 5, title: 'Entrepreneurship Basics', duration: '60 min', watched: false, category: 'Business' },
]

const upcomingClasses = [
  { id: 1, title: 'Advanced Communication Techniques', date: 'Wed, 26 Mar 2026', time: '10:00 AM CAT', host: 'Lawson Wordsmith' },
  { id: 2, title: 'Resume Workshop (Live)', date: 'Fri, 28 Mar 2026', time: '2:00 PM CAT', host: 'Lawson Wordsmith' },
]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'classes' | 'materials'>('overview')
  const completed = lessons.filter((l) => l.watched).length
  const progress = Math.round((completed / lessons.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-green-100 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold">Student Portal</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {(['overview', 'lessons', 'classes', 'materials'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard label="Lessons Completed" value={`${completed}/${lessons.length}`} icon={<CheckCircle className="text-green-600" size={24} />} />
              <StatCard label="Progress" value={`${progress}%`} icon={<Star className="text-amber-500" size={24} />} />
              <StatCard label="Upcoming Classes" value={upcomingClasses.length.toString()} icon={<Clock className="text-blue-600" size={24} />} />
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Course Progress</span>
                <span className="text-green-600">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Upcoming */}
            <div>
              <h2 className="font-bold text-lg mb-4">Upcoming Live Classes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="bg-white rounded-xl border p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Video size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{cls.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{cls.date} · {cls.time}</p>
                      <p className="text-gray-400 text-xs">Host: {cls.host}</p>
                    </div>
                    <Link to="/classes" className="text-xs font-semibold text-green-600 hover:text-green-700">Join →</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-3">
            <h2 className="font-bold text-lg mb-4">Video Lessons</h2>
            {lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${lesson.watched ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {lesson.watched ? <CheckCircle size={20} className="text-green-600" /> : <Play size={20} className="text-gray-400" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{lesson.title}</p>
                  <p className="text-xs text-gray-400">{lesson.duration} · {lesson.category}</p>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                  {lesson.watched ? 'Rewatch' : 'Watch'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'classes' && (
          <div>
            <h2 className="font-bold text-lg mb-4">Live & Recorded Classes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="bg-white rounded-xl border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">LIVE</span>
                    <span className="text-xs text-gray-400">{cls.date}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{cls.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{cls.time} · {cls.host}</p>
                  <Link to="/classes" className="inline-block w-full text-center py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                    Join Class
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <h2 className="font-bold text-lg mb-4">Study Materials</h2>
            <div className="space-y-3">
              {['Business Communication Workbook.pdf', 'Resume Templates Pack.zip', 'Leadership Handbook.pdf', 'Entrepreneurship Starter Guide.pdf'].map((file) => (
                <div key={file} className="bg-white rounded-xl border p-4 flex items-center gap-3">
                  <BookOpen size={20} className="text-green-600 flex-shrink-0" />
                  <span className="flex-1 text-sm">{file}</span>
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                    <Download size={14} /> Download
                  </button>
                </div>
              ))}
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
