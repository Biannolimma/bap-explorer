# Contract Integration Guide

This guide explains how to integrate the Block And Play Explorer with actual blockchain smart contracts.

## Overview

The explorer is currently configured with mock data. To integrate with real blockchain contracts, you'll need to:

1. Set up Web3 provider
2. Configure contract addresses
3. Add contract ABIs
4. Update API routes to query blockchain
5. Handle blockchain events

## Prerequisites

- Contract addresses (testnet and mainnet)
- Contract ABIs (Application Binary Interfaces)
- RPC endpoint URLs
- Basic understanding of Web3.js or ethers.js

## Step 1: Install Dependencies

Add Web3 libraries to your project:

```bash
npm install ethers
```

## Step 2: Configure Environment

Update `.env.local` with your contract addresses:

```env
# Network Configuration
NEXT_PUBLIC_NETWORK=testnet

# RPC Endpoint
NEXT_PUBLIC_RPC_URL=https://rpc.blockandplay.testnet.example.com

# Contract Addresses
NEXT_PUBLIC_NFT_CONTRACT=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_TOKEN_CONTRACT=0x0987654321098765432109876543210987654321

# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=80001
NEXT_PUBLIC_CHAIN_NAME=Block And Play Testnet
```

## Step 3: Add Contract ABIs

Create a directory for contract ABIs:

```bash
mkdir -p lib/contracts
```

Add your contract ABIs (example):

**lib/contracts/NFT.json**
```json
[
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]
```

## Step 4: Create Web3 Utility

Create a utility file for Web3 setup:

**lib/web3.ts**
```typescript
import { ethers } from 'ethers'
import NFT_ABI from './contracts/NFT.json'
import TOKEN_ABI from './contracts/Token.json'

export function getProvider() {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL
  if (!rpcUrl) throw new Error('RPC_URL not configured')
  return new ethers.JsonRpcProvider(rpcUrl)
}

export function getNFTContract() {
  const provider = getProvider()
  const address = process.env.NEXT_PUBLIC_NFT_CONTRACT
  if (!address) throw new Error('NFT_CONTRACT not configured')
  return new ethers.Contract(address, NFT_ABI, provider)
}

export function getTokenContract() {
  const provider = getProvider()
  const address = process.env.NEXT_PUBLIC_TOKEN_CONTRACT
  if (!address) throw new Error('TOKEN_CONTRACT not configured')
  return new ethers.Contract(address, TOKEN_ABI, provider)
}
```

## Step 5: Update API Routes

Update API routes to query blockchain data:

**pages/api/nfts.ts**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNFTContract } from '@/lib/web3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, query } = req.query

  try {
    const contract = getNFTContract()
    
    if (type === 'tokenId') {
      // Query NFT by token ID
      const owner = await contract.ownerOf(query)
      const tokenURI = await contract.tokenURI(query)
      
      // Fetch metadata from tokenURI
      const metadataResponse = await fetch(tokenURI)
      const metadata = await metadataResponse.json()
      
      const nft = {
        id: query as string,
        name: metadata.name,
        owner,
        tokenId: query as string,
        contract: contract.address,
        metadata: {
          image: metadata.image,
          description: metadata.description
        }
      }
      
      res.status(200).json({ nfts: [nft], total: 1 })
    } else if (type === 'owner') {
      // Query NFTs by owner
      const balance = await contract.balanceOf(query)
      const nfts = []
      
      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(query, i)
        const tokenURI = await contract.tokenURI(tokenId)
        const metadataResponse = await fetch(tokenURI)
        const metadata = await metadataResponse.json()
        
        nfts.push({
          id: tokenId.toString(),
          name: metadata.name,
          owner: query as string,
          tokenId: tokenId.toString(),
          contract: contract.address,
          metadata
        })
      }
      
      res.status(200).json({ nfts, total: nfts.length })
    } else {
      res.status(400).json({ error: 'Invalid query type' })
    }
  } catch (error) {
    console.error('Error querying NFTs:', error)
    res.status(500).json({ error: 'Failed to query NFTs' })
  }
}
```

**pages/api/tokens.ts**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTokenContract } from '@/lib/web3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query

  try {
    const contract = getTokenContract()
    
    // Get token information
    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()
    const totalSupply = await contract.totalSupply()
    
    // Get recent transfers (requires event queries or indexer)
    const filter = contract.filters.Transfer()
    const events = await contract.queryFilter(filter, -1000) // Last 1000 blocks
    
    const transfers = events.slice(-20).map((event: any) => ({
      id: event.transactionHash,
      from: event.args.from,
      to: event.args.to,
      amount: ethers.formatUnits(event.args.value, decimals),
      timestamp: new Date().toISOString(), // Need to fetch block timestamp
      txHash: event.transactionHash
    }))
    
    const token = {
      id: '1',
      symbol,
      name,
      address: contract.address,
      totalSupply: ethers.formatUnits(totalSupply, decimals),
      decimals,
      holders: 0 // Requires indexer or database
    }
    
    res.status(200).json({ token, transfers })
  } catch (error) {
    console.error('Error querying token:', error)
    res.status(500).json({ error: 'Failed to query token' })
  }
}
```

## Step 6: Handle Events

For evolution history, you'll need to query contract events:

**pages/api/history.ts**
```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNFTContract } from '@/lib/web3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { assetId } = req.query

  try {
    const contract = getNFTContract()
    
    // Query all events for this token
    const transferFilter = contract.filters.Transfer(null, null, assetId)
    const transferEvents = await contract.queryFilter(transferFilter)
    
    const events = await Promise.all(
      transferEvents.map(async (event: any) => {
        const block = await event.getBlock()
        return {
          id: event.transactionHash,
          assetId: assetId as string,
          eventType: event.args.from === ethers.ZeroAddress ? 'minted' : 'transferred',
          from: event.args.from,
          to: event.args.to,
          timestamp: new Date(block.timestamp * 1000).toISOString(),
          txHash: event.transactionHash
        }
      })
    )
    
    res.status(200).json({ events, total: events.length })
  } catch (error) {
    console.error('Error querying history:', error)
    res.status(500).json({ error: 'Failed to query history' })
  }
}
```

## Step 7: Add Error Handling

Always handle blockchain errors gracefully:

```typescript
try {
  // Blockchain query
} catch (error) {
  if (error.code === 'CALL_EXCEPTION') {
    // Contract call failed (invalid input, etc.)
    return res.status(400).json({ error: 'Invalid contract call' })
  } else if (error.code === 'NETWORK_ERROR') {
    // RPC node connection issue
    return res.status(503).json({ error: 'Network unavailable' })
  } else {
    // Generic error
    return res.status(500).json({ error: 'Internal server error' })
  }
}
```

## Step 8: Optimize Performance

### Caching

Cache immutable data (past events, token metadata):

```typescript
import { unstable_cache } from 'next/cache'

const getTokenMetadata = unstable_cache(
  async (address: string) => {
    // Query blockchain
    return metadata
  },
  ['token-metadata'],
  { revalidate: 3600 } // Cache for 1 hour
)
```

### Batch Requests

Use multicall for multiple contract calls:

```typescript
const [name, symbol, decimals, totalSupply] = await Promise.all([
  contract.name(),
  contract.symbol(),
  contract.decimals(),
  contract.totalSupply()
])
```

### Indexer Integration

For better performance, consider using an indexer service:

- The Graph (subgraphs)
- Moralis
- Alchemy
- QuickNode

## Testing

### Local Testing

Use a local blockchain for development:

```bash
# Install Hardhat
npm install --save-dev hardhat

# Start local node
npx hardhat node
```

Update `.env.local` to point to local node:

```env
NEXT_PUBLIC_RPC_URL=http://localhost:8545
```

### Testnet Testing

Deploy contracts to testnet and test thoroughly before mainnet deployment.

## Production Considerations

### RPC Providers

For production, use reliable RPC providers:
- Infura
- Alchemy
- QuickNode
- Your own RPC node

### Rate Limiting

Implement rate limiting to avoid hitting provider limits:

```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

### Monitoring

Monitor RPC usage:
- Track request counts
- Monitor response times
- Set up alerts for failures

### Fallback Providers

Configure multiple RPC providers for redundancy:

```typescript
const providers = [
  new ethers.JsonRpcProvider(process.env.RPC_URL_1),
  new ethers.JsonRpcProvider(process.env.RPC_URL_2),
  new ethers.JsonRpcProvider(process.env.RPC_URL_3)
]

const provider = new ethers.FallbackProvider(providers)
```

## Contract Standards

### ERC-721 (NFTs)

Required methods:
- `balanceOf(address owner)`
- `ownerOf(uint256 tokenId)`
- `tokenURI(uint256 tokenId)`
- `tokenOfOwnerByIndex(address owner, uint256 index)` (optional, for enumeration)

### ERC-20 (Tokens)

Required methods:
- `name()`
- `symbol()`
- `decimals()`
- `totalSupply()`
- `balanceOf(address account)`

### Custom Evolution Contracts

Define your custom interface and implement accordingly.

## Troubleshooting

### Common Issues

1. **RPC Connection Errors**
   - Check RPC URL configuration
   - Verify network connectivity
   - Check provider rate limits

2. **Invalid Contract Address**
   - Verify address format (0x prefix, 40 hex characters)
   - Ensure contract is deployed on the network
   - Check network configuration

3. **ABI Mismatches**
   - Verify ABI matches deployed contract
   - Check method signatures
   - Update ABI after contract upgrades

4. **Gas Estimation Failures**
   - For read operations, no gas needed
   - For write operations, ensure sufficient balance
   - Check transaction parameters

## Support

For additional help:
- Check Next.js documentation
- Refer to ethers.js documentation
- Review contract-specific documentation
- Open an issue on GitHub
