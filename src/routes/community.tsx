import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Pin,
  TrendingUp,
} from 'lucide-react'

export const Route = createFileRoute('/community')({
  component: CommunityPage,
})

type Post = {
  id: number
  author: string
  role: 'Student' | 'Investor' | 'Business'
  time: string
  content: string
  likes: number
  comments: number
  pinned?: boolean
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'Lawson Wordsmith',
    role: 'Business',
    time: '2h ago',
    content: 'Welcome to the Lawson Wordsmith community! This is your space to connect, share insights, and grow together. 🎉 New live class on Wednesday — don\'t miss it!',
    likes: 24,
    comments: 8,
    pinned: true,
  },
  {
    id: 2,
    author: 'Chipo Banda',
    role: 'Student',
    time: '4h ago',
    content: 'Just watched the Public Speaking masterclass — the tips on vocal variety were game-changing. Highly recommend to anyone preparing for job interviews!',
    likes: 15,
    comments: 3,
  },
  {
    id: 3,
    author: 'Mutale Daka',
    role: 'Investor',
    time: '1d ago',
    content: 'Looking for co-founders in the AgriTech space in Lusaka. If you have experience in mobile apps and agriculture, let\'s connect! DM me or reply here.',
    likes: 9,
    comments: 5,
  },
  {
    id: 4,
    author: 'Bwalya Mwape',
    role: 'Business',
    time: '2d ago',
    content: 'After applying the negotiation techniques from last week\'s session, I closed a deal I\'ve been working on for 3 months. The course content is incredibly practical.',
    likes: 31,
    comments: 12,
  },
]

const roleColors: Record<Post['role'], string> = {
  Student: 'bg-green-100 text-green-700',
  Investor: 'bg-purple-100 text-purple-700',
  Business: 'bg-amber-100 text-amber-700',
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [filter, setFilter] = useState<'All' | Post['role']>('All')
  const [liked, setLiked] = useState<number[]>([])

  function handlePost() {
    if (!newPost.trim()) return
    const post: Post = {
      id: Date.now(),
      author: 'You',
      role: 'Student',
      time: 'Just now',
      content: newPost.trim(),
      likes: 0,
      comments: 0,
    }
    setPosts((prev) => [post, ...prev.filter((p) => !p.pinned), ...prev.filter((p) => p.pinned)])
    setNewPost('')
  }

  function handleLike(id: number) {
    if (liked.includes(id)) return
    setLiked((prev) => [...prev, id])
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  const filtered = posts.filter((p) => filter === 'All' || p.role === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <Users size={32} className="text-amber-400 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-black mb-3">Community Hub</h1>
          <p className="text-blue-100 max-w-xl mx-auto">
            Connect with fellow students, investors, and business professionals. Share ideas, ask questions, and grow together.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* New Post */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an insight, ask a question, or start a discussion..."
            rows={3}
            className="w-full text-sm resize-none focus:outline-none placeholder-gray-400"
          />
          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <span className="text-xs text-gray-400">{newPost.length}/500</span>
            <button
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="flex items-center gap-2 bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors disabled:opacity-40"
            >
              <Plus size={16} /> Post
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['All', 'Student', 'Investor', 'Business'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === f ? 'bg-blue-800 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filtered.map((post) => (
            <div key={post.id} className={`bg-white rounded-xl border p-5 ${post.pinned ? 'border-amber-300 ring-1 ring-amber-200' : ''}`}>
              {post.pinned && (
                <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold mb-2">
                  <Pin size={12} /> Pinned by Lawson Wordsmith
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm flex-shrink-0">
                  {post.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{post.author}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[post.role]}`}>{post.role}</span>
                  </div>
                  <p className="text-xs text-gray-400">{post.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 hover:text-blue-700 transition-colors ${liked.includes(post.id) ? 'text-blue-700 font-semibold' : ''}`}
                >
                  <ThumbsUp size={14} /> {post.likes}
                </button>
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} /> {post.comments} comments
                </span>
                <button className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <MessageSquare size={40} className="mx-auto mb-3" />
              <p>No posts in this category yet. Be the first to share!</p>
            </div>
          )}
        </div>

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-xl border p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-blue-700" />
            <h2 className="font-bold text-sm">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['#BusinessCommunication', '#InvestorPitch', '#ResumeWriting', '#Lusaka', '#Leadership', '#Zambia', '#Entrepreneurship'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
