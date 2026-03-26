import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Bell,
  Menu,
  X,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Settings,
  Home,
  Video,
  Users,
  Phone,
} from 'lucide-react'

const notifications = [
  { id: 1, text: 'New live class scheduled: Business Communication', time: '2h ago', unread: true },
  { id: 2, text: 'Lawson Wordsmith uploaded a new video', time: '5h ago', unread: true },
  { id: 3, text: 'Community post: "Resume tips that work"', time: '1d ago', unread: false },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={16} /> },
    { to: '/classes', label: 'Live Classes', icon: <Video size={16} /> },
    { to: '/community', label: 'Community', icon: <Users size={16} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={16} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <Settings size={16} /> },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl text-blue-800 tracking-tight">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-amber-400 font-black text-sm">
            LW
          </div>
          <span className="hidden sm:inline">Lawson Wordsmith</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800 transition-colors"
              activeProps={{ className: 'bg-blue-50 text-blue-800 font-semibold' }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Role badges */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/dashboard/student" className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100">
              <GraduationCap size={12} /> Student
            </Link>
            <Link to="/dashboard/investor" className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium hover:bg-purple-100">
              <TrendingUp size={12} /> Investor
            </Link>
            <Link to="/dashboard/business" className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium hover:bg-amber-100">
              <Briefcase size={12} /> Business
            </Link>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                <div className="p-3 border-b font-semibold text-sm text-gray-800">Notifications</div>
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 border-b last:border-0 text-sm ${n.unread ? 'bg-blue-50' : ''}`}>
                    <p className="text-gray-800">{n.text}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-800"
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2 flex-wrap">
            <Link to="/dashboard/student" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
              <GraduationCap size={12} /> Student
            </Link>
            <Link to="/dashboard/investor" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
              <TrendingUp size={12} /> Investor
            </Link>
            <Link to="/dashboard/business" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
              <Briefcase size={12} /> Business
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
