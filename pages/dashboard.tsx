import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface NetworkMetrics {
  blockHeight: number
  totalTransactions: number
  activeValidators: number
  networkHashRate: string
  averageBlockTime: string
  totalPenalties: number
}

interface RecentBlock {
  height: number
  hash: string
  timestamp: string
  transactions: number
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null)
  const [recentBlocks, setRecentBlocks] = useState<RecentBlock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch metrics
      const metricsResponse = await fetch('/api/metrics')
      const metricsData = await metricsResponse.json()
      setMetrics(metricsData)

      // Fetch recent blocks
      const blocksResponse = await fetch('/api/blocks?limit=5')
      const blocksData = await blocksResponse.json()
      setRecentBlocks(blocksData.blocks || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard - BAP Explorer</title>
        <meta name="description" content="Block And Play blockchain explorer dashboard" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading network data...</p>
          </div>
        ) : (
          <>
            {/* Network Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Block Height</p>
                    <p className="text-3xl font-bold text-primary-600">
                      {metrics?.blockHeight.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="text-4xl">📦</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Transactions</p>
                    <p className="text-3xl font-bold text-primary-600">
                      {metrics?.totalTransactions.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div className="text-4xl">💸</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Validators</p>
                    <p className="text-3xl font-bold text-primary-600">
                      {metrics?.activeValidators || '0'}
                    </p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Network Hash Rate</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {metrics?.networkHashRate || 'N/A'}
                    </p>
                  </div>
                  <div className="text-4xl">⚡</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Block Time</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {metrics?.averageBlockTime || 'N/A'}
                    </p>
                  </div>
                  <div className="text-4xl">⏱️</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Penalties</p>
                    <p className="text-3xl font-bold text-primary-600">
                      {metrics?.totalPenalties || '0'}
                    </p>
                  </div>
                  <div className="text-4xl">⚠️</div>
                </div>
              </div>
            </div>

            {/* Recent Blocks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recent Blocks</h2>
                <Link 
                  href="/blocks" 
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Height</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Hash</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBlocks.map((block) => (
                      <tr key={block.height} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4">
                          <Link href={`/blocks/${block.height}`} className="text-primary-600 hover:text-primary-700 font-semibold">
                            {block.height}
                          </Link>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">
                          {block.hash.slice(0, 16)}...
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {block.timestamp}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {block.transactions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/blocks" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-2">📦</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">Blocks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View all blocks in the chain
                  </p>
                </div>
              </Link>

              <Link href="/transactions" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-2">💸</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">Transactions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Browse all transactions
                  </p>
                </div>
              </Link>

              <Link href="/pools" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-2">🏊</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">Validation Pools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View validator pools
                  </p>
                </div>
              </Link>

              <Link href="/penalties" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-2">⚠️</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">Penalties</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View network penalties
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
