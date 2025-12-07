import React, { useState } from 'react'
import Head from 'next/head'

interface EvolutionEvent {
  id: string
  assetId: string
  eventType: 'minted' | 'transferred' | 'evolved' | 'burned'
  from?: string
  to?: string
  timestamp: string
  txHash: string
  metadata?: any
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [history, setHistory] = useState<EvolutionEvent[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with actual API integration
      const response = await fetch(`/api/history?assetId=${searchQuery}`)
      const data = await response.json()
      setHistory(data.events || [])
    } catch (error) {
      console.error('Error fetching history:', error)
      // Show mock data for demonstration
      setHistory([
        {
          id: '1',
          assetId: searchQuery,
          eventType: 'minted',
          to: '0x1234...5678',
          timestamp: new Date(Date.now() - 86400000 * 10).toISOString(),
          txHash: '0xabcd...ef01'
        },
        {
          id: '2',
          assetId: searchQuery,
          eventType: 'transferred',
          from: '0x1234...5678',
          to: '0x8765...4321',
          timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
          txHash: '0xabcd...ef02'
        },
        {
          id: '3',
          assetId: searchQuery,
          eventType: 'evolved',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          txHash: '0xabcd...ef03',
          metadata: { level: 2, attributes: ['strength', 'defense'] }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = (eventType: string) => {
    const icons = {
      minted: '✨',
      transferred: '↔️',
      evolved: '📈',
      burned: '🔥'
    }
    return icons[eventType as keyof typeof icons] || '📋'
  }

  const getEventColor = (eventType: string) => {
    const colors = {
      minted: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      transferred: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      evolved: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      burned: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    }
    return colors[eventType as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900'
  }

  return (
    <>
      <Head>
        <title>Evolution History - BAP Explorer</title>
        <meta name="description" content="Track asset evolution and transformation history" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Evolution History</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter asset ID or token ID..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {history.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Asset Timeline</h2>
            <div className="space-y-4">
              {history.map((event, index) => (
                <div key={event.id} className="relative">
                  {index !== history.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />
                  )}
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getEventColor(event.eventType)}`}>
                      {getEventIcon(event.eventType)}
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg capitalize">{event.eventType}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEventColor(event.eventType)}`}>
                          {event.eventType.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        {event.from && (
                          <p><strong>From:</strong> <span className="font-mono">{event.from}</span></p>
                        )}
                        {event.to && (
                          <p><strong>To:</strong> <span className="font-mono">{event.to}</span></p>
                        )}
                        <p><strong>Tx Hash:</strong> <span className="font-mono">{event.txHash}</span></p>
                        {event.metadata && (
                          <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded">
                            <strong>Metadata:</strong>
                            <pre className="text-xs mt-1">{JSON.stringify(event.metadata, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            Enter an asset ID to view its complete evolution history.
          </div>
        )}
      </div>
    </>
  )
}
