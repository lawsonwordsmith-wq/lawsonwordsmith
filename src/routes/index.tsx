import { createFileRoute, Link } from '@tanstack/react-router'
import {
  GraduationCap,
  TrendingUp,
  Briefcase,
  Video,
  Upload,
  Users,
  Bell,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Star,
  CreditCard,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="w-40 h-40 rounded-full bg-amber-400 flex items-center justify-center text-blue-900 font-black text-5xl mx-auto lg:mx-0 mb-4 ring-4 ring-amber-300 ring-offset-4 ring-offset-blue-800">
                LW
              </div>
              <div className="flex flex-col gap-1.5 text-blue-100 text-sm">
                <span className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <MapPin size={14} className="text-amber-400" />
                  Lusaka CB, Zambia
                </span>
                <a href="tel:+260776025370" className="flex items-center gap-1.5 justify-center lg:justify-start hover:text-amber-400 transition-colors">
                  <Phone size={14} className="text-amber-400" />
                  +260 776 025 370
                </a>
                <a href="mailto:lawsonwordsmith@gmail.com" className="flex items-center gap-1.5 justify-center lg:justify-start hover:text-amber-400 transition-colors">
                  <Mail size={14} className="text-amber-400" />
                  lawsonwordsmith@gmail.com
                </a>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-3">
                Professional Training &amp; Education
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
                Lawson Wordsmith
              </h1>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl leading-relaxed">
                Empowering entrepreneurs, students, and investors with world-class training in business communication, investment strategies, and professional development — live and on-demand from Lusaka, Zambia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-amber-400 text-blue-900 font-bold rounded-xl hover:bg-amber-300 transition-colors">
                  Enter Your Portal <ArrowRight size={18} />
                </Link>
                <Link to="/classes" className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  <Play size={18} /> Watch Live Classes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Portals */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Choose Your Portal</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Each portal is tailored to your role — get resources, insights, and training relevant to you.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <PortalCard
              icon={<GraduationCap size={36} />}
              title="Students"
              description="Access video lessons, download study materials, join live classes, connect with peers, and track your learning progress."
              color="green"
              to="/dashboard/student"
              features={['Video Lessons', 'Live Classes', 'Study Materials', 'Progress Tracking']}
            />
            <PortalCard
              icon={<TrendingUp size={36} />}
              title="Investor Seekers"
              description="Explore funding opportunities, pitch deck resources, investment strategies, and connect with business mentors."
              color="purple"
              to="/dashboard/investor"
              features={['Pitch Deck Resources', 'Investment Strategies', 'Networking', 'Mentorship Access']}
            />
            <PortalCard
              icon={<Briefcase size={36} />}
              title="Business Personnel"
              description="Corporate training, leadership development, communication skills, and business growth resources for professionals."
              color="amber"
              to="/dashboard/business"
              features={['Corporate Training', 'Leadership Dev', 'Communication Skills', 'Business Growth']}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Platform Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Video size={28} className="text-blue-600" />} title="Live Online Classes" desc="Join real-time training sessions with Lawson Wordsmith. Interactive, engaging, and professional." />
            <FeatureCard icon={<Upload size={28} className="text-green-600" />} title="Video & Media Library" desc="Browse uploaded lesson videos, training materials, and advertising content anytime." />
            <FeatureCard icon={<Users size={28} className="text-purple-600" />} title="Community Hub" desc="Connect with peers, share insights, and grow together in a supportive learning community." />
            <FeatureCard icon={<Bell size={28} className="text-amber-600" />} title="Smart Notifications" desc="Stay informed with real-time alerts on new classes, content uploads, and community activity." />
            <FeatureCard icon={<Star size={28} className="text-red-500" />} title="Role-Based Dashboards" desc="Personalized portals for students, investors, and business professionals with relevant content." />
            <FeatureCard icon={<CreditCard size={28} className="text-teal-600" />} title="Payment Integration" desc="Secure payment options for premium courses, memberships, and exclusive content. (Coming soon)" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">500+</div>
              <div className="text-blue-200">Students Trained</div>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">50+</div>
              <div className="text-blue-200">Live Classes Hosted</div>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-400 mb-2">3</div>
              <div className="text-blue-200">Specialised Portals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-500 mb-8">
            Register your contact details and receive weekly training tips and class updates directly via SMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors">
              <Phone size={18} /> Register Now
            </Link>
            <Link to="/community" className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-blue-800 text-blue-800 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              <Users size={18} /> Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="font-black text-white text-lg mb-2">Lawson Wordsmith</div>
              <div className="text-sm space-y-1">
                <p className="flex items-center gap-2"><MapPin size={14} className="text-amber-400" /> Lusaka CB, Zambia</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-amber-400" /> +260 776 025 370</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-amber-400" /> lawsonwordsmith@gmail.com</p>
              </div>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">Portals</div>
              <div className="text-sm space-y-1">
                <Link to="/dashboard/student" className="block hover:text-white transition-colors">Student Portal</Link>
                <Link to="/dashboard/investor" className="block hover:text-white transition-colors">Investor Portal</Link>
                <Link to="/dashboard/business" className="block hover:text-white transition-colors">Business Portal</Link>
              </div>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">Platform</div>
              <div className="text-sm space-y-1">
                <Link to="/classes" className="block hover:text-white transition-colors">Live Classes</Link>
                <Link to="/community" className="block hover:text-white transition-colors">Community</Link>
                <Link to="/contact" className="block hover:text-white transition-colors">Contact &amp; Register</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm">
            &copy; {new Date().getFullYear()} Lawson Wordsmith. All rights reserved. | Lusaka, Zambia
          </div>
        </div>
      </footer>
    </div>
  )
}

function PortalCard({
  icon, title, description, color, to, features,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: 'green' | 'purple' | 'amber'
  to: string
  features: string[]
}) {
  const colors = {
    green: { border: 'border-green-200', bg: 'bg-green-50', icon: 'text-green-600', btn: 'bg-green-600 hover:bg-green-700 text-white' },
    purple: { border: 'border-purple-200', bg: 'bg-purple-50', icon: 'text-purple-600', btn: 'bg-purple-600 hover:bg-purple-700 text-white' },
    amber: { border: 'border-amber-200', bg: 'bg-amber-50', icon: 'text-amber-600', btn: 'bg-amber-600 hover:bg-amber-700 text-white' },
  }
  const c = colors[color]
  return (
    <div className={`rounded-2xl border-2 ${c.border} ${c.bg} p-8 flex flex-col`}>
      <div className={`${c.icon} mb-4`}>{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm mb-5 leading-relaxed">{description}</p>
      <ul className="space-y-1.5 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
            <span className={`${c.icon} font-bold`}>✓</span> {f}
          </li>
        ))}
      </ul>
      <Link to={to} className={`${c.btn} font-semibold py-2.5 px-6 rounded-xl text-center text-sm transition-colors inline-block`}>
        Enter Portal →
      </Link>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}
