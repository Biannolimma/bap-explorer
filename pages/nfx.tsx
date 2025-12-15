import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useNfxList } from '@/hooks/useNfx'

export default function NfxPage() {
  const [page, setPage] = useState(1)
  const limit = 12
  const { nfx, loading, error, total, refetch } = useNfxList(page, limit)

  const totalPages = Math.ceil(total / limit)

  return (
    <>
      <Head>
        <title>NFX - Non-Fungible eXpanding Islands - BAP Explorer</title>
        <meta name="description" content="Browse and explore NFX (Non-Fungible eXpanding Islands) in the Block And Play ecosystem" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">NFX - Non-Fungible eXpanding Islands</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            NFX are digital spaces that expand and evolve within the Block And Play ecosystem. 
            Each NFX represents a unique, ownable area where users can deposit assets, form partnerships, 
            and create subspaces for collaboration and commerce.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-2xl font-bold text-primary-600">{total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total NFX</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-2xl font-bold text-primary-600">
              {nfx.filter(n => n.premium).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Premium NFX</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-2xl font-bold text-primary-600">
              {nfx.reduce((sum, n) => sum + n.partners, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Partners</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-2xl font-bold text-primary-600">
              {nfx.reduce((sum, n) => sum + n.assetsCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Assets</div>
          </div>
        </div>

        {/* NFX Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading NFX...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">Error loading NFX: {error.message}</p>
            <button
              onClick={refetch}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {nfx.map((item) => (
                <Link
                  key={item.id}
                  href={`/nfx/${item.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary-500">
                    {/* Header */}
                    <div className={`p-4 ${item.premium ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-primary-600'}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white truncate">{item.name}</h3>
                        {item.premium && (
                          <span className="text-xs bg-white text-yellow-600 px-2 py-1 rounded-full font-semibold">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white opacity-90 mt-1">{item.branding}</div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Size</div>
                          <div className="text-lg font-semibold">{item.size.toLocaleString()} m²</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Value</div>
                          <div className="text-lg font-semibold">{item.value.toLocaleString()} BAP</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Reputation</div>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-semibold">{item.reputation}</div>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${item.reputation}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Assets</div>
                          <div className="text-lg font-semibold">{item.assetsCount}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Partners</div>
                          <div className="text-sm font-semibold">{item.partners}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Subspaces</div>
                          <div className="text-sm font-semibold">{item.subspaces}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Owner: {item.owner.slice(0, 6)}...{item.owner.slice(-4)}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-4">
                      <div className="text-primary-600 group-hover:text-primary-700 font-semibold flex items-center justify-end">
                        View Details
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 rounded-lg shadow transition-all ${
                          page === pageNum
                            ? 'bg-primary-600 text-white'
                            : 'bg-white dark:bg-gray-800 hover:shadow-md'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Information Section */}
        <div className="mt-12 bg-primary-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">About NFX</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>NFX (Non-Fungible eXpanding Islands)</strong> are unique digital spaces within the Block And Play ecosystem 
              that can grow, evolve, and generate value over time.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Unique ownership and identity</li>
                  <li>Expandable virtual space</li>
                  <li>Asset deposit and management</li>
                  <li>Partnership formation</li>
                  <li>Subspace creation and delegation</li>
                  <li>Reputation and value growth</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Displayed Fields:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>ID</strong>: Unique identifier</li>
                  <li><strong>Name</strong>: Custom NFX name</li>
                  <li><strong>Owner</strong>: Current owner address</li>
                  <li><strong>Size</strong>: Virtual space in m²</li>
                  <li><strong>Reputation</strong>: Community trust score (0-100)</li>
                  <li><strong>Value</strong>: Current market value in BAP tokens</li>
                  <li><strong>Branding</strong>: Category/theme</li>
                  <li><strong>Premium</strong>: Enhanced features status</li>
                  <li><strong>Assets</strong>: Deposited items count</li>
                  <li><strong>Partners</strong>: Associated collaborators</li>
                  <li><strong>Subspaces</strong>: Subdivisions within the NFX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
