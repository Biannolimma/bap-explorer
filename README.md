# Block And Play Explorer

A comprehensive blockchain explorer for the Block And Play ecosystem, providing full visibility into blockchain data, NFTs, tokens, evolution history, and smart contracts across testnet and mainnet environments.

![BAP Explorer Home](./public/images/home-page.png)

## Features

### Blockchain Explorer
- 📊 **Dashboard**: Network overview with real-time metrics
- 📦 **Block Explorer**: Browse and search blockchain blocks
- 💸 **Transaction Explorer**: View and track all transactions
- 🏊 **Validation Pools**: Monitor validator pools and staking
- ⚠️ **Penalties**: Track network penalties and slashing events

### Asset Explorer
- 🎨 **NFT Explorer**: Browse and query NFT collections, metadata, and ownership
- 💰 **Token Explorer**: View token balances, transfers, and holder information
- 📈 **Evolution History**: Track asset transformations and lifecycle events
- 📜 **Smart Contracts**: Explore deployed contracts and their available methods

### Technical Features
- 🌐 **Multi-Network Support**: Switch between testnet and mainnet environments
- 📚 **OpenAPI Documentation**: Complete API specification for easy integration
- 🔄 **Real-time Updates**: Support for WebSocket connections (ready for integration)
- 🎯 **Modular Architecture**: Easy to extend and customize
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Biannolimma/bap-explorer.git
cd bap-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- `NEXT_PUBLIC_NETWORK`: Set to `testnet` or `mainnet`
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- `NEXT_PUBLIC_RPC_URL`: RPC endpoint URL
- `NEXT_PUBLIC_WS_URL`: WebSocket endpoint URL (optional, for real-time updates)
- `NEXT_PUBLIC_NFT_CONTRACT`: NFT contract address
- `NEXT_PUBLIC_TOKEN_CONTRACT`: Token contract address
- `BLOCKCHAIN_API_URL`: Backend blockchain API URL (server-side)

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bap-explorer/
├── components/          # React components
│   └── Layout.tsx      # Main layout component with navigation
├── hooks/              # Custom React hooks for data fetching
│   ├── useBlocks.ts        # Hook for blocks data
│   ├── useTransactions.ts  # Hook for transactions data
│   ├── usePools.ts        # Hook for validation pools data
│   ├── usePenalties.ts    # Hook for penalties data
│   └── useMetrics.ts      # Hook for network metrics
├── pages/              # Next.js pages
│   ├── api/           # API routes (backend integration layer)
│   │   ├── blocks.ts          # Blocks endpoint
│   │   ├── transactions.ts    # Transactions endpoint
│   │   ├── pools.ts          # Validation pools endpoint
│   │   ├── penalties.ts      # Penalties endpoint
│   │   ├── metrics.ts        # Network metrics endpoint
│   │   ├── nfts.ts           # NFT endpoint
│   │   ├── tokens.ts         # Token endpoint
│   │   ├── history.ts        # Evolution history endpoint
│   │   └── contracts.ts      # Smart contracts endpoint
│   ├── docs/          # Documentation pages
│   │   └── openapi.tsx
│   ├── index.tsx      # Home page
│   ├── dashboard.tsx  # Dashboard with network overview
│   ├── blocks.tsx     # Blocks explorer page
│   ├── transactions.tsx # Transactions explorer page
│   ├── pools.tsx      # Validation pools page
│   ├── penalties.tsx  # Penalties page
│   ├── nfts.tsx       # NFT explorer page
│   ├── tokens.tsx     # Token explorer page
│   ├── history.tsx    # Evolution history page
│   ├── contracts.tsx  # Smart contracts page
│   └── docs.tsx       # Documentation page
├── styles/            # Global styles
├── public/            # Static assets
└── docs/              # Additional documentation
    ├── INTEGRATION_GUIDE.md  # Comprehensive integration guide
    ├── arquitetura.md        # Architecture docs (Portuguese)
    ├── ARCHITECTURE.md       # Architecture docs (English)
    └── CONTRACT_INTEGRATION.md # Smart contract integration guide
```

## Architecture

The BAP Explorer follows a modern three-layer architecture for optimal performance and maintainability.

![Architecture Diagram](./public/images/architecture-diagram.svg)

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **API**: Next.js API Routes with OpenAPI specification
- **Blockchain Integration**: Ready for Web3.js/ethers.js integration

### Query and Visualization Flow

The application follows a clear data flow from user interaction to blockchain query and back:

![Query Flow Diagram](./public/images/query-flow-diagram.svg)

**Flow Steps:**
1. User enters search query in the web interface
2. Frontend validates input and sends HTTP request to API
3. API Routes process the request and query blockchain via RPC
4. Blockchain returns data (NFT ownership, token balances, etc.)
5. API formats response as JSON
6. Frontend updates UI with received data
7. User visualizes the results in cards, tables, or timelines

### API Endpoints

All API endpoints are documented using OpenAPI 3.0 specification:

#### Blockchain Explorer Endpoints
- `GET /api/blocks` - List blocks with pagination
- `GET /api/blocks/{id}` - Get specific block by height or hash
- `GET /api/transactions` - List transactions with pagination
- `GET /api/transactions/{hash}` - Get specific transaction by hash
- `GET /api/pools` - List validation pools
- `GET /api/penalties` - List network penalties with filtering
- `GET /api/metrics` - Get network metrics and statistics

#### Asset Explorer Endpoints
- `GET /api/nfts` - Query NFTs by token ID, owner, or contract
- `GET /api/tokens` - Get token information and transfers
- `GET /api/history` - Retrieve evolution history for assets
- `GET /api/contracts` - Get smart contract details and methods

View the complete API documentation at `/docs/openapi` when running the application.

## Documentation

Comprehensive documentation is available:

- **Main Documentation**: Visit `/docs` in the application or [view the docs page](http://localhost:3000/docs) when running
- **OpenAPI Specification**: Visit `/docs/openapi` for the complete API spec
- **Integration Guide**: **[docs/INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md)** - Complete guide for integrating with real blockchain backend
- **Architecture Guide (Português)**: See [docs/arquitetura.md](./docs/arquitetura.md) for detailed architecture documentation
- **Architecture Guide (English)**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Smart Contract Integration**: Learn how to integrate with contracts in [docs/CONTRACT_INTEGRATION.md](./docs/CONTRACT_INTEGRATION.md)

### Interface Screenshots

#### Home Page
![Home Page](./public/images/home-page.png)

The home page provides quick access to all explorer features with intuitive navigation cards.

#### NFT Explorer
![NFT Explorer](./public/images/nfts-page.png)

Search and browse NFTs by token ID, owner address, or contract address with responsive grid layout.

### Architecture Documentation

For detailed information about the system architecture, data flow, and technical implementation, please refer to:
- **[docs/INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md)** - **START HERE**: Complete guide to integrate with real blockchain backend
- **[docs/arquitetura.md](./docs/arquitetura.md)** - Comprehensive architecture documentation in Portuguese
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - English version of architecture documentation
- **[docs/CONTRACT_INTEGRATION.md](./docs/CONTRACT_INTEGRATION.md)** - Smart contract integration guide

## Current Status: Mock Data Implementation

🚧 **Important**: The explorer is currently running with **mock (simulated) data**. All pages are functional and ready for integration with a real blockchain backend.

### What's Implemented
✅ Complete UI for all explorer pages
✅ API routes structure ready for backend connection
✅ Custom hooks for data fetching with loading/error states
✅ Responsive design and navigation
✅ Pagination support
✅ Search functionality scaffold
✅ Real-time update hooks (ready for WebSocket integration)

### What's Needed for Production
📋 **Next Steps** (see [INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md) for details):
1. Connect API routes to real blockchain node (REST/RPC/WebSocket)
2. Map blockchain data structures to explorer data models
3. Implement error handling for network issues
4. Add caching layer for performance
5. Set up environment variables for production
6. Test with real blockchain data
7. Deploy to production environment

## Integration Workflow

The BAP Explorer uses a modular three-layer architecture that separates concerns:

1. **Frontend Layer** (Pages & Components)
   - User interface and interactions
   - Uses custom hooks to fetch data
   - No direct blockchain connection

2. **API Layer** (Next.js API Routes)
   - Acts as backend/middleware
   - Connects to blockchain node
   - Transforms blockchain data to frontend format
   - Handles errors and caching

3. **Blockchain Layer** (Your Backend)
   - Blockchain node (REST API, RPC, or WebSocket)
   - Provides raw blockchain data
   - Handles consensus and state

### Quick Start Integration

To integrate with your blockchain backend:

1. **Set up environment variables** in `.env.local`:
```bash
BLOCKCHAIN_API_URL=https://api.your-blockchain.io
NEXT_PUBLIC_RPC_URL=https://rpc.your-blockchain.io
NEXT_PUBLIC_WS_URL=wss://ws.your-blockchain.io
```

2. **Update one API route** (start with simplest, e.g., `/api/metrics`):
```typescript
// pages/api/metrics.ts
import axios from 'axios'

export default async function handler(req, res) {
  const response = await axios.get(`${process.env.BLOCKCHAIN_API_URL}/status`)
  res.json({
    blockHeight: response.data.sync_info.latest_block_height,
    // ... map other fields
  })
}
```

3. **Test the page** that uses that API route

4. **Repeat** for other endpoints

See the complete integration guide at [docs/INTEGRATION_GUIDE.md](./docs/INTEGRATION_GUIDE.md) for detailed instructions, code examples, and integration patterns for different blockchain types (Cosmos SDK, Ethereum, Substrate, etc.).

## Network Support

### Testnet
- Chain ID: 80001
- Use for development and testing
- Configure in `.env.local` with `NEXT_PUBLIC_NETWORK=testnet`

### Mainnet
- Chain ID: TBD
- Production environment
- Configure in `.env.local` with `NEXT_PUBLIC_NETWORK=mainnet`

## Development

### Using Custom Hooks

The explorer provides custom React hooks for easy data fetching:

```typescript
import { useBlocks } from '@/hooks/useBlocks'
import { useTransactions } from '@/hooks/useTransactions'
import { useMetrics } from '@/hooks/useMetrics'

function MyComponent() {
  // Fetch blocks with pagination
  const { blocks, loading, error, total, refetch } = useBlocks(page, limit)
  
  // Fetch transactions
  const { transactions } = useTransactions(1, 20)
  
  // Fetch and auto-refresh metrics every 30 seconds
  const { metrics } = useMetrics(true, 30000)
  
  // Manual refetch
  const handleRefresh = () => refetch()
}
```

Available hooks:
- `useBlocks(page, limit)` - Fetch blocks with pagination
- `useBlock(blockId)` - Fetch single block
- `useTransactions(page, limit)` - Fetch transactions
- `useTransaction(txHash)` - Fetch single transaction
- `usePools(status?)` - Fetch validation pools
- `usePenalties(page, limit, type?)` - Fetch penalties
- `useMetrics(autoRefresh?, interval?)` - Fetch network metrics

### Build for Production

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Integration

### Contract Integration

To integrate with smart contracts:

1. Add contract ABI to your project
2. Configure contract addresses in `.env.local`
3. Use Web3.js or ethers.js to interact with contracts
4. Update API routes in `pages/api/` to fetch real blockchain data

Example:
```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
const contract = new ethers.Contract(contractAddress, abi, provider)
const balance = await contract.balanceOf(address)
```

### API Integration

Use the API endpoints in your applications:

```typescript
// Fetch NFTs
const response = await fetch('/api/nfts?type=tokenId&query=1')
const { nfts } = await response.json()

// Fetch token data
const tokenResponse = await fetch('/api/tokens?address=0x...')
const { token, transfers } = await tokenResponse.json()
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open an issue on GitHub.