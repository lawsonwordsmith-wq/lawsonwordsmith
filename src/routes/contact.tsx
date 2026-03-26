import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  Bell,
} from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    message: '',
    smsConsent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) {
      setError('Please fill in your name, email, and phone number.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <Phone size={32} className="text-amber-400 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-black mb-3">Contact &amp; Register</h1>
          <p className="text-blue-100 max-w-xl mx-auto">
            Get in touch with Lawson Wordsmith and register to receive weekly training tips via SMS every Monday.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border p-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-blue-900 font-black text-2xl mb-4">
                LW
              </div>
              <h2 className="font-bold text-lg mb-1">Lawson Wordsmith</h2>
              <p className="text-gray-500 text-sm mb-4">Business Trainer &amp; Education Coach</p>
              <div className="space-y-3 text-sm">
                <a href="tel:+260776025370" className="flex items-center gap-3 text-gray-700 hover:text-blue-700 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={15} className="text-blue-700" />
                  </div>
                  +260 776 025 370
                </a>
                <a href="mailto:lawsonwordsmith@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-blue-700 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={15} className="text-blue-700" />
                  </div>
                  lawsonwordsmith@gmail.com
                </a>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-blue-700" />
                  </div>
                  Lusaka CB, Zambia
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Bell size={18} className="text-amber-600" />
                <h3 className="font-semibold text-sm">Weekly SMS Updates</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Register your phone number to receive <strong>weekly training tips</strong>, new class alerts, and motivational content from Lawson Wordsmith every Monday morning.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <MessageSquare size={18} className="text-blue-700 mb-2" />
              <h3 className="font-semibold text-sm mb-1">Response Time</h3>
              <p className="text-xs text-gray-600">Messages are typically responded to within 24 hours on business days.</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-2xl border p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">You're Registered!</h2>
                <p className="text-gray-500 text-sm mb-4">
                  Thank you, <strong>{form.name}</strong>! Your details have been received. You'll start receiving weekly SMS tips from Lawson Wordsmith every Monday.
                </p>
                <p className="text-xs text-gray-400">
                  Check your inbox at {form.email} for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-6 space-y-4">
                <h2 className="font-bold text-lg mb-2">Register Your Details</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Role *</label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option>Student</option>
                      <option>Investor Seeker</option>
                      <option>Business Personnel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number * (for SMS updates)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+260 977 000 000"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us how we can help you..."
                    className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-blue-500"
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="smsConsent"
                    checked={form.smsConsent}
                    onChange={handleChange}
                    className="mt-0.5 accent-blue-700"
                  />
                  <span className="text-xs text-gray-600">
                    I agree to receive weekly SMS training tips from Lawson Wordsmith. I can unsubscribe at any time by replying STOP.
                  </span>
                </label>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-800 text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={16} />
                  {submitting ? 'Submitting...' : 'Register & Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
