import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Block {
  height: number
  hash: string
  timestamp: string
  transactions: number
  validator: string
  size: number
}

export default function BlocksPage() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalBlocks, setTotalBlocks] = useState(0)

  useEffect(() => {
    fetchBlocks()
  }, [page])

  const fetchBlocks = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blocks?page=${page}&limit=20`)
      const data = await response.json()
      setBlocks(data.blocks || [])
      setTotalBlocks(data.total || 0)
    } catch (error) {
      console.error('Error fetching blocks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await fetch(`/api/blocks/${searchQuery}`)
      const data = await response.json()
      if (data.block) {
        setBlocks([data.block])
      }
    } catch (error) {
      console.error('Error searching block:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Blocks - BAP Explorer</title>
        <meta name="description" content="Browse blockchain blocks" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blocks</h1>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by block height or hash..."
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

        {/* Blocks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blocks...</p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Height</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Hash</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Timestamp</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Validator</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Txns</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-500">
                          No blocks found
                        </td>
                      </tr>
                    ) : (
                      blocks.map((block) => (
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
                          <td className="py-3 px-4 font-mono text-sm">
                            {block.validator.slice(0, 10)}...
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {block.transactions}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {block.size} KB
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalBlocks > 20 && (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                  Page {page} of {Math.ceil(totalBlocks / 20)}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(totalBlocks / 20)}
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
