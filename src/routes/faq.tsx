import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/faq')({
  component: FAQ,
})

const faqs = [
  {
    question: 'Who is Lawson Wordsmith?',
    answer:
      'Lawson Wordsmith is a professional business trainer and education coach based in Lusaka CB, Zambia. He specialises in business communication, leadership development, investment strategies, and entrepreneurship — delivering both live online classes and on-demand video content.',
  },
  {
    question: 'What portals are available on this platform?',
    answer:
      'The platform offers three tailored portals: a Student Portal for learners (lessons, live classes, study materials), an Investor Seeker Portal (pitch resources, investment strategies, mentorship), and a Business Personnel Portal (corporate training, leadership programs, webinars). There is also an Owner Backend for Lawson Wordsmith to manage content.',
  },
  {
    question: 'How do I join a live class?',
    answer:
      'Visit the Live Classes page to see upcoming sessions. Click "Notify Me" to receive an SMS reminder, or click "Join Live" when a session is active. Register your phone number on the Contact page to receive automatic SMS reminders for all upcoming classes.',
  },
  {
    question: 'How do weekly SMS updates work?',
    answer:
      'When you register your contact details on the Contact page and consent to SMS updates, you will receive weekly training tips, motivational content, and class announcements every Monday morning via SMS. You can unsubscribe at any time by replying STOP.',
  },
  {
    question: 'Can I upload my own content?',
    answer:
      'Students, investors, and business personnel can share posts in the Community Hub. Only Lawson Wordsmith (via the Owner Backend) can upload official videos, images, and course materials to the platform.',
  },
  {
    question: 'Is there a payment system?',
    answer:
      'Payment integration is currently being set up. The platform is designed to support Stripe (international cards), Airtel Money / MTN MoMo (Zambian mobile money), and other African payment gateways. You will be notified when premium paid courses and memberships become available.',
  },
  {
    question: 'How can I contact Lawson Wordsmith directly?',
    answer:
      'You can reach Lawson Wordsmith via phone at +260 776 025 370, by email at lawsonwordsmith@gmail.com, or through the Contact page on this platform. He is based in Lusaka CB, Zambia.',
  },
  {
    question: 'What topics does the training cover?',
    answer:
      'The platform covers: Business Communication, Public Speaking, Resume Writing, Leadership Development, Entrepreneurship, Investment Strategies, Pitch Deck Creation, Corporate Training, Negotiation Skills, and more — all delivered by Lawson Wordsmith.',
  },
]

function FAQ() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
          Everything you need to know about the Lawson Wordsmith training platform.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Accordion key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="mt-12 text-center bg-white rounded-2xl border p-8">
          <p className="text-gray-600 mb-2">Still have questions?</p>
          <a href="mailto:lawsonwordsmith@gmail.com" className="text-blue-800 font-semibold hover:underline">
            lawsonwordsmith@gmail.com
          </a>
          <span className="text-gray-400 mx-2">·</span>
          <a href="tel:+260776025370" className="text-blue-800 font-semibold hover:underline">
            +260 776 025 370
          </a>
        </div>
      </div>
    </div>
  )
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{answer}</div>
      )}
    </div>
  )
}
