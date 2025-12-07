import React, { useState } from 'react'
import Head from 'next/head'

interface Contract {
  id: string
  address: string
  name: string
  type: 'NFT' | 'Token' | 'Game' | 'Other'
  verified: boolean
  deployedAt: string
  transactionCount: number
  creator: string
}

interface ContractMethod {
  name: string
  type: 'read' | 'write'
  inputs: string[]
  outputs: string[]
}

export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [contract, setContract] = useState<Contract | null>(null)
  const [methods, setMethods] = useState<ContractMethod[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with actual API integration
      const response = await fetch(`/api/contracts?address=${searchQuery}`)
      const data = await response.json()
      setContract(data.contract || null)
      setMethods(data.methods || [])
    } catch (error) {
      console.error('Error fetching contract:', error)
      // Show mock data for demonstration
      setContract({
        id: '1',
        address: searchQuery || '0x0000...0000',
        name: 'BAP NFT Contract',
        type: 'NFT',
        verified: true,
        deployedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        transactionCount: 5678,
        creator: '0x1234...5678'
      })
      setMethods([
        {
          name: 'mint',
          type: 'write',
          inputs: ['address to', 'uint256 tokenId'],
          outputs: []
        },
        {
          name: 'balanceOf',
          type: 'read',
          inputs: ['address owner'],
          outputs: ['uint256']
        },
        {
          name: 'ownerOf',
          type: 'read',
          inputs: ['uint256 tokenId'],
          outputs: ['address']
        },
        {
          name: 'transfer',
          type: 'write',
          inputs: ['address to', 'uint256 tokenId'],
          outputs: []
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Smart Contracts - BAP Explorer</title>
        <meta name="description" content="Explore deployed contracts and their interactions" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Smart Contracts</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter contract address..."
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

        {contract && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">📜</div>
                  <div>
                    <h2 className="text-3xl font-bold">{contract.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 font-mono">{contract.address}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    contract.verified 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {contract.verified ? '✓ Verified' : 'Not Verified'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {contract.type}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Deployed</p>
                  <p className="text-lg font-bold">{new Date(contract.deployedAt).toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                  <p className="text-lg font-bold">{contract.transactionCount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Creator</p>
                  <p className="text-lg font-bold font-mono">{contract.creator}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Contract Methods</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Read Methods</h4>
                  <div className="space-y-2">
                    {methods.filter(m => m.type === 'read').map((method, index) => (
                      <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="font-mono font-bold mb-2">{method.name}</div>
                        <div className="text-sm space-y-1">
                          <p><strong>Inputs:</strong> {method.inputs.join(', ') || 'none'}</p>
                          <p><strong>Outputs:</strong> {method.outputs.join(', ') || 'none'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Write Methods</h4>
                  <div className="space-y-2">
                    {methods.filter(m => m.type === 'write').map((method, index) => (
                      <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="font-mono font-bold mb-2">{method.name}</div>
                        <div className="text-sm space-y-1">
                          <p><strong>Inputs:</strong> {method.inputs.join(', ') || 'none'}</p>
                          <p><strong>Outputs:</strong> {method.outputs.join(', ') || 'none'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!contract && !loading && (
          <div className="text-center py-12 text-gray-500">
            Enter a contract address to view details and available methods.
          </div>
        )}
      </div>
    </>
  )
}
