# Block And Play Explorer

A comprehensive blockchain explorer for the Block And Play ecosystem, providing visibility into NFTs, tokens, evolution history, and smart contracts across testnet and mainnet environments.

![BAP Explorer Home](./public/images/home-page.png)

## Features

- 🎨 **NFT Explorer**: Browse and query NFT collections, metadata, and ownership
- 💰 **Token Explorer**: View token balances, transfers, and holder information
- 📈 **Evolution History**: Track asset transformations and lifecycle events
- 📜 **Smart Contracts**: Explore deployed contracts and their available methods
- 🌐 **Multi-Network Support**: Switch between testnet and mainnet environments
- 📚 **OpenAPI Documentation**: Complete API specification for easy integration

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
- `NEXT_PUBLIC_NFT_CONTRACT`: NFT contract address
- `NEXT_PUBLIC_TOKEN_CONTRACT`: Token contract address

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bap-explorer/
├── components/          # React components
│   └── Layout.tsx      # Main layout component
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   ├── nfts.ts
│   │   ├── tokens.ts
│   │   ├── history.ts
│   │   └── contracts.ts
│   ├── docs/          # Documentation pages
│   │   └── openapi.tsx
│   ├── index.tsx      # Home page
│   ├── nfts.tsx       # NFT explorer page
│   ├── tokens.tsx     # Token explorer page
│   ├── history.tsx    # Evolution history page
│   ├── contracts.tsx  # Smart contracts page
│   └── docs.tsx       # Documentation page
├── styles/            # Global styles
├── public/            # Static assets
└── docs/              # Additional documentation

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

- `GET /api/nfts` - Query NFTs by token ID, owner, or contract
- `GET /api/tokens` - Get token information and transfers
- `GET /api/history` - Retrieve evolution history for assets
- `GET /api/contracts` - Get smart contract details and methods

View the complete API documentation at `/docs/openapi` when running the application.

## Documentation

Comprehensive documentation is available:

- **Main Documentation**: Visit `/docs` in the application or [view the docs page](http://localhost:3000/docs) when running
- **OpenAPI Specification**: Visit `/docs/openapi` for the complete API spec
- **Architecture Guide (Português)**: See [docs/arquitetura.md](./docs/arquitetura.md) for detailed architecture documentation
- **Integration Guide**: Learn how to integrate with contracts in [docs/CONTRACT_INTEGRATION.md](./docs/CONTRACT_INTEGRATION.md)

### Interface Screenshots

#### Home Page
![Home Page](./public/images/home-page.png)

The home page provides quick access to all explorer features with intuitive navigation cards.

#### NFT Explorer
![NFT Explorer](./public/images/nfts-page.png)

Search and browse NFTs by token ID, owner address, or contract address with responsive grid layout.

### Architecture Documentation

For detailed information about the system architecture, data flow, and technical implementation, please refer to:
- **[docs/arquitetura.md](./docs/arquitetura.md)** - Comprehensive architecture documentation in Portuguese
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - English version of architecture documentation
- **[docs/CONTRACT_INTEGRATION.md](./docs/CONTRACT_INTEGRATION.md)** - Smart contract integration guide

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