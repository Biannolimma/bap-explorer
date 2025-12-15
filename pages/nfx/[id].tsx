import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useNfxStatus } from '@/hooks/useNfx'

export default function NfxDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { nfx, loading, error, refetch } = useNfxStatus(id as string)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading NFX details...</p>
        </div>
      </div>
    )
  }

  if (error || !nfx) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error ? error.message : 'NFX not found'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={refetch}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/nfx"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to NFX List
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{nfx.name} - NFX Details - BAP Explorer</title>
        <meta name="description" content={`Details for ${nfx.name} NFX (Non-Fungible eXpanding Island)`} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/nfx" className="hover:text-primary-600">NFX</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{nfx.name}</span>
        </div>

        {/* Header */}
        <div className={`rounded-lg shadow-lg p-8 mb-8 ${nfx.premium ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-primary-600'} text-white`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold">{nfx.name}</h1>
                {nfx.premium && (
                  <span className="bg-white text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                    PREMIUM
                  </span>
                )}
              </div>
              <p className="text-xl opacity-90 mb-4">{nfx.branding}</p>
              <p className="opacity-80 max-w-3xl">{nfx.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">NFX ID</div>
              <div className="font-mono text-lg">{nfx.id}</div>
            </div>
          </div>
        </div>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Owner</div>
            <div className="font-mono text-sm mb-1">{nfx.owner}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Size</div>
            <div className="text-2xl font-bold text-primary-600">{nfx.size.toLocaleString()} m²</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Value</div>
            <div className="text-2xl font-bold text-primary-600">{nfx.value.toLocaleString()} BAP</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Reputation</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary-600">{nfx.reputation}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all"
                    style={{ width: `${nfx.reputation}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Visits</div>
              <div className="text-3xl font-bold text-primary-600">{nfx.statistics.totalVisits.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Active Users</div>
              <div className="text-3xl font-bold text-primary-600">{nfx.statistics.activeUsers.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Daily Transactions</div>
              <div className="text-3xl font-bold text-primary-600">{nfx.statistics.dailyTransactions.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Average Value</div>
              <div className="text-3xl font-bold text-primary-600">{nfx.statistics.averageValue.toLocaleString()} BAP</div>
            </div>
          </div>
        </div>

        {/* Governance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Governance Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Voting Power</div>
              <div className="text-2xl font-bold text-primary-600">{nfx.governance.votingPower.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Proposals</div>
              <div className="text-2xl font-bold text-primary-600">{nfx.governance.proposals}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Decisions Made</div>
              <div className="text-2xl font-bold text-primary-600">{nfx.governance.decisions.length}</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Recent Decisions</h3>
            <ul className="space-y-2">
              {nfx.governance.decisions.map((decision, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Event History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Event History</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {nfx.events.map((event) => (
                <div key={event.id} className="border-l-4 border-primary-600 pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{event.type}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{event.description}</div>
                    </div>
                    {event.value && (
                      <div className="text-sm font-semibold text-primary-600">
                        {event.value.toLocaleString()} BAP
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deposited Assets */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Deposited Assets ({nfx.assetsCount})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {nfx.depositedAssets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{asset.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{asset.type}</div>
                  </div>
                  <div className="text-sm font-semibold text-primary-600">
                    {asset.value.toLocaleString()} BAP
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Partners */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Partners ({nfx.partners})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {nfx.partnersList.map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">{partner.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {partner.address.slice(0, 10)}...{partner.address.slice(-8)}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary-600">
                    {partner.contribution.toLocaleString()} BAP
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subspaces */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Subspaces ({nfx.subspaces})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {nfx.subspacesList.map((subspace) => (
                <div key={subspace.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900 dark:text-white">{subspace.name}</div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      subspace.status === 'Active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : subspace.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                    }`}>
                      {subspace.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Size: {subspace.size.toLocaleString()} m²
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created At</div>
              <div className="font-mono">{new Date(nfx.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Activity</div>
              <div className="font-mono">{new Date(nfx.lastActivity).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/nfx"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to NFX List
          </Link>
        </div>
      </div>
    </>
  )
}
