import React, { useState } from 'react'
import Head from 'next/head'

interface Token {
  id: string
  symbol: string
  name: string
  address: string
  totalSupply: string
  decimals: number
  holders: number
}

interface TokenTransfer {
  id: string
  from: string
  to: string
  amount: string
  timestamp: string
  txHash: string
}

export default function TokensPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [token, setToken] = useState<Token | null>(null)
  const [transfers, setTransfers] = useState<TokenTransfer[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with actual API integration
      const response = await fetch(`/api/tokens?address=${searchQuery}`)
      const data = await response.json()
      setToken(data.token || null)
      setTransfers(data.transfers || [])
    } catch (error) {
      console.error('Error fetching token:', error)
      // Show mock data for demonstration
      setToken({
        id: '1',
        symbol: 'BAP',
        name: 'Block And Play Token',
        address: searchQuery || (process.env.NEXT_PUBLIC_TOKEN_CONTRACT || '0x0000...0000'),
        totalSupply: '1000000000',
        decimals: 18,
        holders: 1234
      })
      setTransfers([
        {
          id: '1',
          from: '0x1234...5678',
          to: '0x8765...4321',
          amount: '100',
          timestamp: new Date().toISOString(),
          txHash: '0xabcd...ef01'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Tokens - BAP Explorer</title>
        <meta name="description" content="View token balances and transfers" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Token Explorer</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter token contract address..."
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

        {token && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">💰</div>
                <div>
                  <h2 className="text-3xl font-bold">{token.name} ({token.symbol})</h2>
                  <p className="text-gray-600 dark:text-gray-400">{token.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Supply</p>
                  <p className="text-2xl font-bold">{Number(token.totalSupply).toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Decimals</p>
                  <p className="text-2xl font-bold">{token.decimals}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Holders</p>
                  <p className="text-2xl font-bold">{token.holders.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Recent Transfers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="text-left py-3 px-4">From</th>
                      <th className="text-left py-3 px-4">To</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Tx Hash</th>
                      <th className="text-left py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.map((transfer) => (
                      <tr key={transfer.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-sm">{transfer.from}</td>
                        <td className="py-3 px-4 font-mono text-sm">{transfer.to}</td>
                        <td className="py-3 px-4">{transfer.amount}</td>
                        <td className="py-3 px-4 font-mono text-sm">{transfer.txHash}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(transfer.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {!token && !loading && (
          <div className="text-center py-12 text-gray-500">
            Enter a token contract address to view details and transfers.
          </div>
        )}
      </div>
    </>
  )
}
