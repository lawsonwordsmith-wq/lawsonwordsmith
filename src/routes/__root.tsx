import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Lawson Wordsmith — Training & Education Platform' },
      { name: 'description', content: 'Professional training, live classes, and business education with Lawson Wordsmith — Lusaka, Zambia.' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <Header />
        <main>{children}</main>
        <Scripts />
      </body>
    </html>
  )
}
