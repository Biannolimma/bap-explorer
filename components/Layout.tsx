import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const network = process.env.NEXT_PUBLIC_NETWORK || 'testnet'

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/blocks', label: 'Blocks' },
    { href: '/transactions', label: 'Transactions' },
    { href: '/pools', label: 'Pools' },
    { href: '/penalties', label: 'Penalties' },
    { href: '/nfts', label: 'NFTs' },
    { href: '/tokens', label: 'Tokens' },
    { href: '/docs', label: 'Docs' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              BAP Explorer
            </Link>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-primary-600 transition-colors ${
                    router.pathname === item.href
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-4 px-3 py-1 bg-primary-100 dark:bg-primary-900 rounded-full text-xs font-semibold text-primary-700 dark:text-primary-300">
                {network.toUpperCase()}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">Block And Play Explorer</p>
            <p className="text-sm">
              © {new Date().getFullYear()} - Exploring the BAP Ecosystem
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
