import type { NextApiRequest, NextApiResponse } from 'next'

interface Block {
  height: number
  hash: string
  timestamp: string
  transactions: number
  validator: string
  size: number
}

type BlocksResponse = {
  blocks: Block[]
  total: number
}

type BlockResponse = {
  block: Block
}

// Mock data generator
const generateMockBlock = (height: number): Block => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - (10000 - height) * 3) // ~3 min per block
  
  return {
    height,
    hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
    timestamp: now.toISOString(),
    transactions: Math.floor(Math.random() * 50) + 1,
    validator: `0x${Math.random().toString(16).substring(2, 42)}`,
    size: Math.floor(Math.random() * 100) + 10,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlocksResponse | BlockResponse | { error: string }>
) {
  const { page = '1', limit = '20', blockId } = req.query

  // Mock response - integrate with actual blockchain API
  // In production, this should connect to your blockchain node REST API or RPC endpoint
  
  if (blockId) {
    // Single block query
    const blockHeight = parseInt(blockId as string)
    if (isNaN(blockHeight)) {
      return res.status(400).json({ error: 'Invalid block identifier' })
    }
    
    const block = generateMockBlock(blockHeight)
    return res.status(200).json({ block })
  }

  // List blocks
  const pageNum = parseInt(page as string)
  const limitNum = parseInt(limit as string)
  
  const currentBlockHeight = 10000
  const startHeight = currentBlockHeight - (pageNum - 1) * limitNum
  
  const mockBlocks: Block[] = []
  for (let i = 0; i < limitNum; i++) {
    const height = startHeight - i
    if (height > 0) {
      mockBlocks.push(generateMockBlock(height))
    }
  }

  res.status(200).json({ 
    blocks: mockBlocks, 
    total: currentBlockHeight 
  })
}
