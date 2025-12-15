import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  blockHeight: number
  timestamp: string
  status: 'success' | 'failed' | 'pending'
  fee: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalTransactions, setTotalTransactions] = useState(0)

  useEffect(() => {
    fetchTransactions()
  }, [page])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/transactions?page=${page}&limit=20`)
      const data = await response.json()
      setTransactions(data.transactions || [])
      setTotalTransactions(data.total || 0)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await fetch(`/api/transactions/${searchQuery}`)
      const data = await response.json()
      if (data.transaction) {
        setTransactions([data.transaction])
      }
    } catch (error) {
      console.error('Error searching transaction:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <>
      <Head>
        <title>Transactions - BAP Explorer</title>
        <meta name="description" content="Browse blockchain transactions" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Transactions</h1>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by transaction hash or address..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Transactions List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading transactions...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center text-gray-500">
                  No transactions found
                </div>
              ) : (
                transactions.map((tx) => (
                  <div key={tx.hash} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Transaction Hash</p>
                        <Link href={`/transactions/${tx.hash}`} className="font-mono text-sm text-primary-600 hover:text-primary-700 break-all">
                          {tx.hash}
                        </Link>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                            {tx.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Block</p>
                          <Link href={`/blocks/${tx.blockHeight}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                            #{tx.blockHeight}
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">From</p>
                        <p className="font-mono text-sm break-all">{tx.from}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">To</p>
                        <p className="font-mono text-sm break-all">{tx.to}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Value</p>
                        <p className="text-sm font-semibold">{tx.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fee</p>
                        <p className="text-sm">{tx.fee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timestamp</p>
                        <p className="text-sm">{tx.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalTransactions > 20 && (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                  Page {page} of {Math.ceil(totalTransactions / 20)}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(totalTransactions / 20)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
