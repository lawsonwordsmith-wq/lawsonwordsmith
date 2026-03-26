import { createFileRoute, Link } from '@tanstack/react-router'
import { GraduationCap, TrendingUp, Briefcase, Lock } from 'lucide-react'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHome,
})

function DashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Select Your Portal</h1>
        <p className="text-gray-500 mb-12">
          Choose the portal that matches your role to access tailored resources, classes, and community.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoleCard
            icon={<GraduationCap size={40} />}
            title="Student Portal"
            description="Lessons, live classes, study materials and community for learners."
            to="/dashboard/student"
            color="green"
          />
          <RoleCard
            icon={<TrendingUp size={40} />}
            title="Investor Portal"
            description="Funding strategies, pitch resources, and mentorship for seekers."
            to="/dashboard/investor"
            color="purple"
          />
          <RoleCard
            icon={<Briefcase size={40} />}
            title="Business Portal"
            description="Corporate training, leadership skills, and growth resources."
            to="/dashboard/business"
            color="amber"
          />
          <RoleCard
            icon={<Lock size={40} />}
            title="Owner Backend"
            description="Lawson Wordsmith's admin panel for content management."
            to="/dashboard/owner"
            color="blue"
          />
        </div>
      </div>
    </div>
  )
}

function RoleCard({
  icon, title, description, to, color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  to: string
  color: 'green' | 'purple' | 'amber' | 'blue'
}) {
  const palette = {
    green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', btn: 'bg-green-600 text-white hover:bg-green-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', btn: 'bg-purple-600 text-white hover:bg-purple-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', btn: 'bg-amber-600 text-white hover:bg-amber-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-700', btn: 'bg-blue-800 text-white hover:bg-blue-900' },
  }
  const c = palette[color]
  return (
    <div className={`${c.bg} ${c.border} border-2 rounded-2xl p-8 flex flex-col items-center text-center`}>
      <div className={`${c.icon} mb-4`}>{icon}</div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-6 flex-1">{description}</p>
      <Link to={to} className={`${c.btn} px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors w-full`}>
        Enter →
      </Link>
    </div>
  )
}
