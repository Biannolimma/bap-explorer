import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const network = process.env.NEXT_PUBLIC_NETWORK || 'testnet'
  
  return (
    <>
      <Head>
        <title>Block And Play Explorer</title>
        <meta name="description" content="Block And Play blockchain explorer for NFTs, tokens, and smart contracts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Block And Play Explorer</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Explore NFTs, tokens, evolution history, and smart contracts
            </p>
            <div className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900 rounded-full">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                Network: {network.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Blockchain Explorer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Link href="/dashboard" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">📊</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Dashboard</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Network overview and metrics
                  </p>
                </div>
              </Link>

              <Link href="/blocks" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">📦</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Blocks</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Browse blockchain blocks
                  </p>
                </div>
              </Link>

              <Link href="/transactions" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">💸</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Transactions</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    View all transactions
                  </p>
                </div>
              </Link>

              <Link href="/pools" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">🏊</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Validation Pools</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore validator pools
                  </p>
                </div>
              </Link>

              <Link href="/penalties" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Penalties</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    View network penalties
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Assets & Smart Contracts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Link href="/nfx" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">🏝️</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">NFX</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore Non-Fungible eXpanding Islands - unique digital spaces
                  </p>
                </div>
              </Link>

              <Link href="/nfts" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">🎨</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">NFTs</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Browse and query NFT collections, metadata, and ownership
                  </p>
                </div>
              </Link>

              <Link href="/tokens" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">💰</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Tokens</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    View token balances, transfers, and holders
                  </p>
                </div>
              </Link>

              <Link href="/history" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">📈</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Evolution History</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track asset evolution and transformation history
                  </p>
                </div>
              </Link>

              <Link href="/contracts" className="group">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary-500">
                  <div className="text-4xl mb-4">📜</div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600">Smart Contracts</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore deployed contracts and their interactions
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">About Block And Play Explorer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This explorer provides comprehensive visibility into the Block And Play ecosystem. 
                Query and analyze NFTs, tokens, evolution histories, and smart contracts across 
                both testnet and mainnet environments.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/docs" 
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View Documentation
                </Link>
                <Link 
                  href="/docs/openapi" 
                  className="px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  API Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
