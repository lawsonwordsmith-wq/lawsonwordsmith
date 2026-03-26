import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import {
  Lock,
  Upload,
  Video,
  Image,
  Users,
  FileText,
  Play,
  Trash2,
  Eye,
  CreditCard,
  Radio,
  UserCircle,
  Bell,
  BarChart3,
  CheckCircle,
  X,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard/owner')({
  component: OwnerDashboard,
})

// Simple PIN-based access (in production, use Netlify Identity)
const OWNER_PIN = '2024'

type UploadedFile = {
  id: string
  name: string
  type: 'video' | 'image' | 'document'
  size: string
  uploadedAt: string
  category: string
}

const mockContent: UploadedFile[] = [
  { id: '1', name: 'Business Communication Intro.mp4', type: 'video', size: '245 MB', uploadedAt: '2026-03-20', category: 'Lessons' },
  { id: '2', name: 'Resume Writing Workshop.mp4', type: 'video', size: '180 MB', uploadedAt: '2026-03-18', category: 'Lessons' },
  { id: '3', name: 'Class Banner March.jpg', type: 'image', size: '2.1 MB', uploadedAt: '2026-03-15', category: 'Advertising' },
  { id: '4', name: 'Investor Pitch Guide.pdf', type: 'document', size: '3.4 MB', uploadedAt: '2026-03-10', category: 'Materials' },
]

const mockLeads = [
  { name: 'Chipo Banda', phone: '+260977000001', email: 'chipo@example.com', role: 'Student', date: '2026-03-24' },
  { name: 'Mutale Daka', phone: '+260977000002', email: 'mutale@example.com', role: 'Investor', date: '2026-03-23' },
  { name: 'Bwalya Mwape', phone: '+260977000003', email: 'bwalya@example.com', role: 'Business', date: '2026-03-22' },
]

export default function OwnerDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'content' | 'live' | 'leads' | 'profile' | 'payments'>('overview')
  const [content, setContent] = useState<UploadedFile[]>(mockContent)
  const [uploadCategory, setUploadCategory] = useState('Lessons')
  const [uploadName, setUploadName] = useState('')
  const [uploadType, setUploadType] = useState<'video' | 'image' | 'document'>('video')
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [liveStarted, setLiveStarted] = useState(false)
  const [liveTitle, setLiveTitle] = useState('')
  const [profileLogo, setProfileLogo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  function handleLogin() {
    if (pin === OWNER_PIN) {
      setAuthenticated(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  function handleUpload() {
    if (!uploadName.trim()) return
    setUploading(true)
    setTimeout(() => {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: uploadName,
        type: uploadType,
        size: uploadType === 'video' ? '120 MB' : uploadType === 'image' ? '1.5 MB' : '2 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        category: uploadCategory,
      }
      setContent((prev) => [newFile, ...prev])
      setUploading(false)
      setUploadSuccess(true)
      setUploadName('')
      setTimeout(() => setUploadSuccess(false), 3000)
    }, 1500)
  }

  function handleDeleteContent(id: string) {
    setContent((prev) => prev.filter((f) => f.id !== id))
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setProfileLogo(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border shadow-lg p-8 w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-blue-800" />
          </div>
          <h1 className="text-xl font-bold mb-1">Owner Access</h1>
          <p className="text-gray-500 text-sm mb-6">Enter your PIN to access the admin backend</p>
          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError(false) }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter PIN"
            className={`w-full border-2 rounded-xl px-4 py-3 text-center text-xl tracking-widest font-bold mb-2 outline-none focus:border-blue-500 ${pinError ? 'border-red-400' : 'border-gray-200'}`}
          />
          {pinError && <p className="text-red-500 text-xs mb-3">Incorrect PIN. Try again.</p>}
          <p className="text-gray-400 text-xs mb-4">(Demo PIN: 2024)</p>
          <button onClick={handleLogin} className="w-full bg-blue-800 text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors">
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-amber-400 flex items-center justify-center">
            {profileLogo ? (
              <img src={profileLogo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-blue-900 font-black text-xl">LW</span>
            )}
          </div>
          <div>
            <p className="text-blue-100 text-sm">Admin Backend</p>
            <h1 className="text-2xl font-bold">Lawson Wordsmith</h1>
            <p className="text-blue-200 text-xs">Lusaka CB, Zambia</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-10 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 min-w-max">
          {(['overview', 'upload', 'content', 'live', 'leads', 'profile', 'payments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-blue-700 text-blue-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'live' ? 'Live Classes' : tab === 'leads' ? 'Contacts/Leads' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-4 gap-4">
              <StatCard label="Content Items" value={content.length.toString()} icon={<FileText className="text-blue-600" size={22} />} />
              <StatCard label="Total Contacts" value={mockLeads.length.toString()} icon={<Users className="text-green-600" size={22} />} />
              <StatCard label="Live Sessions" value="8" icon={<Radio className="text-red-500" size={22} />} />
              <StatCard label="Active Students" value="47" icon={<BarChart3 className="text-purple-600" size={22} />} />
            </div>

            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <button onClick={() => setActiveTab('upload')} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-blue-50 text-sm font-medium">
                  <Upload size={16} className="text-blue-600" /> Upload Content
                </button>
                <button onClick={() => setActiveTab('live')} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-red-50 text-sm font-medium">
                  <Radio size={16} className="text-red-500" /> Start Live Class
                </button>
                <button onClick={() => setActiveTab('leads')} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-green-50 text-sm font-medium">
                  <Users size={16} className="text-green-600" /> View Leads
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload */}
        {activeTab === 'upload' && (
          <div className="max-w-lg">
            <h2 className="font-bold text-lg mb-6">Upload Videos, Images &amp; Documents</h2>
            <div className="bg-white rounded-xl border p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Content Name / Title</label>
                <input
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g. Business Communication Ep.3.mp4"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as 'video' | 'image' | 'document')}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="video">Video (Lesson / Advertising)</option>
                  <option value="image">Image / Picture</option>
                  <option value="document">Document / Study Material</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option>Lessons</option>
                  <option>Advertising</option>
                  <option>Materials</option>
                  <option>Live Recording</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select File</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload size={28} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to select file</p>
                  <p className="text-xs text-gray-400 mt-1">MP4, JPG, PNG, PDF, ZIP</p>
                  <input ref={fileInputRef} type="file" className="hidden" accept="video/*,image/*,.pdf,.zip,.doc,.docx" />
                </div>
              </div>

              {uploadSuccess && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 rounded-lg p-3 text-sm">
                  <CheckCircle size={16} /> Content added successfully!
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!uploadName.trim() || uploading}
                className="w-full bg-blue-800 text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Content'}
              </button>
              <p className="text-xs text-gray-400 text-center">
                For production deployment, connect to Netlify Blobs or an S3-compatible storage for actual file uploads.
              </p>
            </div>
          </div>
        )}

        {/* Content Management */}
        {activeTab === 'content' && (
          <div>
            <h2 className="font-bold text-lg mb-6">Manage Content</h2>
            <div className="space-y-3">
              {content.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {item.type === 'video' ? <Video size={18} className="text-blue-600" /> : item.type === 'image' ? <Image size={18} className="text-green-600" /> : <FileText size={18} className="text-amber-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.type} · {item.size} · {item.category} · {item.uploadedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleDeleteContent(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {content.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Upload size={40} className="mx-auto mb-3" />
                  <p>No content uploaded yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Classes */}
        {activeTab === 'live' && (
          <div className="max-w-lg">
            <h2 className="font-bold text-lg mb-6">Live Training Classes</h2>
            {!liveStarted ? (
              <div className="bg-white rounded-xl border p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Session Title</label>
                  <input
                    value={liveTitle}
                    onChange={(e) => setLiveTitle(e.target.value)}
                    placeholder="e.g. Business Communication — March 2026"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Audience</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    <option>All Users</option>
                    <option>Students Only</option>
                    <option>Investors Only</option>
                    <option>Business Personnel Only</option>
                  </select>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                  <strong>Live Streaming:</strong> Connect a platform like Zoom, Google Meet, or Daily.co to enable actual live video streaming. Share the generated link with students.
                </div>
                <button
                  onClick={() => { if (liveTitle.trim()) setLiveStarted(true) }}
                  disabled={!liveTitle.trim()}
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Radio size={18} /> Go Live Now
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl border p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Radio size={28} className="text-red-600" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-bold text-red-600 text-sm">LIVE NOW</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{liveTitle}</h3>
                <p className="text-gray-500 text-sm mb-4">Your session is active. Share the link below with participants.</p>
                <div className="bg-gray-100 rounded-lg p-3 text-sm font-mono text-gray-700 mb-4 break-all">
                  https://meet.example.com/lawson-live-{Date.now().toString(36)}
                </div>
                <p className="text-xs text-gray-400 mb-4">Replace with your actual Zoom/Google Meet/Daily.co link in production.</p>
                <button
                  onClick={() => { setLiveStarted(false); setLiveTitle('') }}
                  className="bg-gray-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  End Session
                </button>
              </div>
            )}
          </div>
        )}

        {/* Contacts/Leads */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Contacts &amp; Leads</h2>
              <span className="text-sm text-gray-500">Weekly SMS enabled</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
              <Bell size={16} className="inline mr-1" />
              <strong>Automated Weekly SMS:</strong> All registered contacts receive weekly training tips every Monday at 9 AM CAT via Twilio integration. Configure your <code className="bg-blue-100 px-1 rounded">TWILIO_ACCOUNT_SID</code> and <code className="bg-blue-100 px-1 rounded">TWILIO_AUTH_TOKEN</code> environment variables to activate.
            </div>
            <div className="space-y-3">
              {mockLeads.map((lead) => (
                <div key={lead.name} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                    {lead.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.phone} · {lead.email}</p>
                    <p className="text-xs text-gray-400">{lead.role} · Registered {lead.date}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lead.role === 'Student' ? 'bg-green-100 text-green-700' : lead.role === 'Investor' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                    {lead.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-lg">
            <h2 className="font-bold text-lg mb-6">Profile &amp; Logo</h2>
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div className="text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center mx-auto mb-4 ring-4 ring-amber-200">
                  {profileLogo ? (
                    <img src={profileLogo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-blue-900 font-black text-3xl">LW</span>
                  )}
                </div>
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                <button onClick={() => logoInputRef.current?.click()} className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-900 transition-colors">
                  {profileLogo ? 'Change Logo / Photo' : 'Upload Logo / Profile Picture'}
                </button>
                {profileLogo && (
                  <button onClick={() => setProfileLogo(null)} className="ml-2 text-sm text-red-500 hover:text-red-600">Remove</button>
                )}
              </div>
              <div className="grid gap-3">
                {[
                  { label: 'Full Name', value: 'Lawson Wordsmith' },
                  { label: 'Location', value: 'Lusaka CB, Zambia' },
                  { label: 'Phone', value: '+260 776 025 370' },
                  { label: 'Email', value: 'lawsonwordsmith@gmail.com' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                    <input defaultValue={field.value} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                ))}
              </div>
              <button className="w-full bg-blue-800 text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors">
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'payments' && (
          <div className="max-w-lg">
            <h2 className="font-bold text-lg mb-6">Payment Integration</h2>
            <div className="bg-white rounded-xl border p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={28} className="text-blue-700" />
                <div>
                  <h3 className="font-semibold">Payment Gateway Setup</h3>
                  <p className="text-xs text-gray-500">Accept payments for courses and memberships</p>
                </div>
              </div>
              {[
                { name: 'Stripe', desc: 'International cards, subscriptions & one-time payments', status: 'Not configured', logo: '💳' },
                { name: 'Airtel Money / MTN MoMo', desc: 'Mobile money for Zambian customers', status: 'Not configured', logo: '📱' },
                { name: 'PayFast / DPO Pay', desc: 'African payment gateway', status: 'Not configured', logo: '🌍' },
              ].map((provider) => (
                <div key={provider.name} className="border rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.logo}</span>
                      <div>
                        <p className="font-semibold text-sm">{provider.name}</p>
                        <p className="text-xs text-gray-500">{provider.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">{provider.status}</span>
                  </div>
                  <button className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-800 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                    Configure →
                  </button>
                </div>
              ))}
              <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                To activate payments, add your payment provider API keys to Netlify environment variables and install the corresponding SDK (e.g. <code>stripe</code>, <code>@dpo-paynow/sdk</code>). The backend endpoint is ready at <code>/api/payment</code> for integration.
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
