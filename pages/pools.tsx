import React, { useState, useEffect } from 'react'
import Head from 'next/head'

interface ValidationPool {
  id: string
  name: string
  totalStake: string
  validators: number
  commission: string
  status: 'active' | 'inactive'
  performance: number
}

export default function PoolsPage() {
  const [pools, setPools] = useState<ValidationPool[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  useEffect(() => {
    fetchPools()
  }, [])

  const fetchPools = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pools')
      const data = await response.json()
      setPools(data.pools || [])
    } catch (error) {
      console.error('Error fetching validation pools:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPools = pools.filter(pool => {
    if (filterStatus === 'all') return true
    return pool.status === filterStatus
  })

  return (
    <>
      <Head>
        <title>Validation Pools - BAP Explorer</title>
        <meta name="description" content="Browse validation pools" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Validation Pools</h1>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Filter by status:
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'inactive'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Pools List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading validation pools...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center text-gray-500">
                No validation pools found
              </div>
            ) : (
              filteredPools.map((pool) => (
                <div key={pool.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{pool.name}</h3>
                      <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        ID: {pool.id.slice(0, 16)}...
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        pool.status === 'active'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
                      }`}
                    >
                      {pool.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Stake</span>
                      <span className="text-sm font-semibold">{pool.totalStake}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Validators</span>
                      <span className="text-sm font-semibold">{pool.validators}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Commission</span>
                      <span className="text-sm font-semibold">{pool.commission}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                        <span className="text-sm font-semibold">{pool.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${pool.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}
