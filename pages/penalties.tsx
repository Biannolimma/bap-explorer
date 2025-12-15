import React, { useState, useEffect } from 'react'
import Head from 'next/head'

interface Penalty {
  id: string
  validator: string
  type: 'slash' | 'jail' | 'downtime'
  reason: string
  amount: string
  blockHeight: number
  timestamp: string
}

export default function PenaltiesPage() {
  const [penalties, setPenalties] = useState<Penalty[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<'all' | 'slash' | 'jail' | 'downtime'>('all')
  const [page, setPage] = useState(1)
  const [totalPenalties, setTotalPenalties] = useState(0)

  useEffect(() => {
    fetchPenalties()
  }, [page, filterType])

  const fetchPenalties = async () => {
    try {
      setLoading(true)
      const typeParam = filterType !== 'all' ? `&type=${filterType}` : ''
      const response = await fetch(`/api/penalties?page=${page}&limit=20${typeParam}`)
      const data = await response.json()
      setPenalties(data.penalties || [])
      setTotalPenalties(data.total || 0)
    } catch (error) {
      console.error('Error fetching penalties:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPenaltyTypeColor = (type: string) => {
    switch (type) {
      case 'slash':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
      case 'jail':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300'
      case 'downtime':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getPenaltyIcon = (type: string) => {
    switch (type) {
      case 'slash':
        return '⚔️'
      case 'jail':
        return '🔒'
      case 'downtime':
        return '⏸️'
      default:
        return '⚠️'
    }
  }

  return (
    <>
      <Head>
        <title>Penalties - BAP Explorer</title>
        <meta name="description" content="Browse network penalties" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Network Penalties</h1>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Filter by type:
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => { setFilterType('all'); setPage(1); }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => { setFilterType('slash'); setPage(1); }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'slash'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Slash
              </button>
              <button
                onClick={() => { setFilterType('jail'); setPage(1); }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'jail'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Jail
              </button>
              <button
                onClick={() => { setFilterType('downtime'); setPage(1); }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'downtime'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Downtime
              </button>
            </div>
          </div>
        </div>

        {/* Penalties List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading penalties...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {penalties.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center text-gray-500">
                  No penalties found
                </div>
              ) : (
                penalties.map((penalty) => (
                  <div key={penalty.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{getPenaltyIcon(penalty.type)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPenaltyTypeColor(penalty.type)}`}>
                              {penalty.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Block #{penalty.blockHeight}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                            ID: {penalty.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">
                          {penalty.amount}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {penalty.timestamp}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Validator</p>
                        <p className="font-mono text-sm break-all">{penalty.validator}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Reason</p>
                        <p className="text-sm">{penalty.reason}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPenalties > 20 && (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                  Page {page} of {Math.ceil(totalPenalties / 20)}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(totalPenalties / 20)}
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
