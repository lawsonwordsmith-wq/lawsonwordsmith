import type { Context } from '@netlify/functions'

type ContactPayload = {
  name: string
  email: string
  phone: string
  role: string
  message: string
  smsConsent: boolean
}

export default async function handler(req: Request, context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let payload: ContactPayload
  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, email, phone, role, message, smsConsent } = payload

  if (!name || !email || !phone) {
    return new Response(JSON.stringify({ error: 'name, email, and phone are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Log the contact registration (in production, store in Netlify Blobs or a database)
  console.log('New contact registration:', { name, email, phone, role, smsConsent, message })

  // --- SMS Integration (Twilio) ---
  // To activate automated weekly SMS:
  // 1. Install: npm install twilio
  // 2. Set env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
  // 3. Uncomment the block below:
  //
  // if (smsConsent && process.env.TWILIO_ACCOUNT_SID) {
  //   const twilio = require('twilio')(
  //     process.env.TWILIO_ACCOUNT_SID,
  //     process.env.TWILIO_AUTH_TOKEN,
  //   )
  //   await twilio.messages.create({
  //     body: `Hi ${name}! Welcome to the Lawson Wordsmith training platform. You'll receive weekly tips every Monday. Reply STOP to unsubscribe. — Lawson Wordsmith, Lusaka Zambia`,
  //     from: process.env.TWILIO_PHONE_NUMBER,
  //     to: phone,
  //   })
  // }

  // --- Email Notification (optional) ---
  // To notify lawsonwordsmith@gmail.com of new registrations,
  // integrate with SendGrid or Netlify Emails here.

  return new Response(
    JSON.stringify({
      success: true,
      message: `Thank you ${name}, your registration was received. Weekly SMS tips will be sent to ${phone}.`,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

export const config = {
  path: '/api/contact',
}
