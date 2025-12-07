import React, { useState } from 'react'
import Head from 'next/head'

interface NFT {
  id: string
  name: string
  owner: string
  tokenId: string
  contract: string
  metadata: {
    image?: string
    description?: string
  }
}

export default function NFTsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'tokenId' | 'owner' | 'contract'>('tokenId')
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Mock API call - replace with actual API integration
      const response = await fetch(`/api/nfts?type=${searchType}&query=${searchQuery}`)
      const data = await response.json()
      setNfts(data.nfts || [])
    } catch (error) {
      console.error('Error fetching NFTs:', error)
      // Show mock data for demonstration
      setNfts([
        {
          id: '1',
          name: 'BAP NFT #1',
          owner: '0x1234...5678',
          tokenId: '1',
          contract: process.env.NEXT_PUBLIC_NFT_CONTRACT || '0x0000...0000',
          metadata: {
            description: 'Example NFT from Block And Play'
          }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>NFTs - BAP Explorer</title>
        <meta name="description" content="Browse and query NFT collections" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">NFT Explorer</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              >
                <option value="tokenId">Token ID</option>
                <option value="owner">Owner Address</option>
                <option value="contract">Contract Address</option>
              </select>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search by ${searchType}...`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.length === 0 && !loading && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No NFTs found. Try searching for an NFT by token ID, owner address, or contract address.
            </div>
          )}
          
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl">
                🎨
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Token ID:</strong> {nft.tokenId}</p>
                  <p><strong>Owner:</strong> {nft.owner}</p>
                  <p><strong>Contract:</strong> {nft.contract.slice(0, 10)}...</p>
                  {nft.metadata.description && (
                    <p className="mt-2">{nft.metadata.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
