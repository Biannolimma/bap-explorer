import Head from 'next/head'
import Link from 'next/link'

export default function DocsPage() {
  return (
    <>
      <Head>
        <title>Documentation - BAP Explorer</title>
        <meta name="description" content="Block And Play Explorer documentation" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Contents</h2>
              <nav className="space-y-2">
                <a href="#overview" className="block hover:text-primary-600">Overview</a>
                <a href="#architecture" className="block hover:text-primary-600">Architecture</a>
                <a href="#api" className="block hover:text-primary-600">API Reference</a>
                <a href="#contracts" className="block hover:text-primary-600">Smart Contracts</a>
                <a href="#integration" className="block hover:text-primary-600">Integration Guide</a>
                <a href="#networks" className="block hover:text-primary-600">Networks</a>
                <Link href="/docs/openapi" className="block hover:text-primary-600">OpenAPI Spec</Link>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <section id="overview" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="mb-4">
                The Block And Play Explorer is a comprehensive blockchain explorer designed to provide 
                visibility into the BAP ecosystem. It enables users to query and analyze:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>NFTs</strong>: Browse collections, view metadata, track ownership</li>
                <li><strong>Tokens</strong>: Monitor balances, transfers, and holder information</li>
                <li><strong>Evolution History</strong>: Track asset transformations and lifecycle events</li>
                <li><strong>Smart Contracts</strong>: Explore deployed contracts and their methods</li>
              </ul>
              <p>
                The explorer supports both testnet and mainnet environments, allowing developers to 
                test integrations before deploying to production.
              </p>
            </section>

            <section id="architecture" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">Architecture</h2>
              <h3 className="text-2xl font-semibold mb-3">Technology Stack</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Frontend</strong>: Next.js 14, React 18, TypeScript, Tailwind CSS</li>
                <li><strong>API</strong>: Next.js API Routes with OpenAPI specification</li>
                <li><strong>Blockchain Integration</strong>: Web3.js/ethers.js for contract interactions</li>
                <li><strong>Data Layer</strong>: REST API with JSON responses</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">System Components</h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-bold mb-2">Frontend Application</h4>
                  <p>Server-side rendered React application providing the user interface for querying blockchain data.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-bold mb-2">API Layer</h4>
                  <p>RESTful API endpoints for accessing blockchain data with OpenAPI documentation.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-bold mb-2">Blockchain Integration</h4>
                  <p>Smart contract interfaces for reading on-chain data from NFT, token, and game contracts.</p>
                </div>
              </div>
            </section>

            <section id="api" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">API Reference</h2>
              <p className="mb-4">
                All API endpoints return JSON responses and support standard HTTP methods.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-bold mb-2">GET /api/nfts</h3>
                  <p className="mb-2">Query NFTs by token ID, owner, or contract address.</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                    <p>Parameters:</p>
                    <p>- type: &quot;tokenId&quot; | &quot;owner&quot; | &quot;contract&quot;</p>
                    <p>- query: string</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-bold mb-2">GET /api/tokens</h3>
                  <p className="mb-2">Get token information and recent transfers.</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                    <p>Parameters:</p>
                    <p>- address: string (contract address)</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-bold mb-2">GET /api/history</h3>
                  <p className="mb-2">Retrieve evolution history for an asset.</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                    <p>Parameters:</p>
                    <p>- assetId: string</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-bold mb-2">GET /api/contracts</h3>
                  <p className="mb-2">Get smart contract details and available methods.</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                    <p>Parameters:</p>
                    <p>- address: string (contract address)</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="contracts" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">Smart Contracts</h2>
              <p className="mb-4">
                The BAP ecosystem includes various smart contracts for different purposes:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-bold mb-2">NFT Contracts</h4>
                  <p className="mb-2">ERC-721 compliant contracts for non-fungible tokens with evolution capabilities.</p>
                  <p className="text-sm font-mono">Standard: ERC-721</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-bold mb-2">Token Contracts</h4>
                  <p className="mb-2">ERC-20 compliant fungible tokens for in-game currency and rewards.</p>
                  <p className="text-sm font-mono">Standard: ERC-20</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h4 className="font-bold mb-2">Game Contracts</h4>
                  <p className="mb-2">Custom contracts managing game logic, evolution mechanics, and player interactions.</p>
                  <p className="text-sm font-mono">Standard: Custom</p>
                </div>
              </div>
            </section>

            <section id="integration" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">Integration Guide</h2>
              
              <h3 className="text-2xl font-semibold mb-3">Environment Configuration</h3>
              <p className="mb-4">Configure your environment by creating a <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">.env.local</code> file:</p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
                <pre>{`NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_API_URL=https://api.blockandplay.testnet.example.com
NEXT_PUBLIC_RPC_URL=https://rpc.blockandplay.testnet.example.com
NEXT_PUBLIC_NFT_CONTRACT=0x...
NEXT_PUBLIC_TOKEN_CONTRACT=0x...
NEXT_PUBLIC_CHAIN_ID=80001`}</pre>
              </div>

              <h3 className="text-2xl font-semibold mb-3">Using the API</h3>
              <p className="mb-4">Example API usage with JavaScript/TypeScript:</p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded font-mono text-sm mb-6 overflow-x-auto">
                <pre>{`// Fetch NFT data
const response = await fetch('/api/nfts?type=tokenId&query=1');
const data = await response.json();
console.log(data.nfts);

// Fetch token information
const tokenResponse = await fetch('/api/tokens?address=0x...');
const tokenData = await tokenResponse.json();
console.log(tokenData.token);`}</pre>
              </div>

              <h3 className="text-2xl font-semibold mb-3">Contract Integration</h3>
              <p className="mb-4">To integrate with smart contracts, you&apos;ll need:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Contract ABI (Application Binary Interface)</li>
                <li>Contract address on your target network</li>
                <li>Web3 provider (MetaMask, WalletConnect, etc.)</li>
                <li>RPC endpoint for your network</li>
              </ol>
            </section>

            <section id="networks" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">Supported Networks</h2>
              
              <div className="space-y-4">
                <div className="p-4 border-2 border-primary-500 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Testnet</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Chain ID:</strong> 80001</p>
                    <p><strong>RPC URL:</strong> https://rpc.blockandplay.testnet.example.com</p>
                    <p><strong>Explorer:</strong> This application</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Use testnet for development and testing before deploying to mainnet.
                    </p>
                  </div>
                </div>

                <div className="p-4 border-2 border-green-500 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Mainnet</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Chain ID:</strong> TBD</p>
                    <p><strong>RPC URL:</strong> https://rpc.blockandplay.mainnet.example.com</p>
                    <p><strong>Explorer:</strong> This application</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Production network for live applications and real assets.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
