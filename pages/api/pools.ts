import type { NextApiRequest, NextApiResponse } from 'next'

interface ValidationPool {
  id: string
  name: string
  totalStake: string
  validators: number
  commission: string
  status: 'active' | 'inactive'
  performance: number
}

type PoolsResponse = {
  pools: ValidationPool[]
  total: number
}

// Mock data generator
const generateMockPool = (index: number): ValidationPool => {
  const isActive = Math.random() > 0.3
  
  return {
    id: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
    name: `Validation Pool ${index + 1}`,
    totalStake: `${(Math.random() * 1000000 + 100000).toFixed(2)} BAP`,
    validators: Math.floor(Math.random() * 50) + 5,
    commission: `${(Math.random() * 10).toFixed(2)}%`,
    status: isActive ? 'active' : 'inactive',
    performance: isActive ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 50),
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PoolsResponse | { error: string }>
) {
  const { status } = req.query

  // Mock response - integrate with actual blockchain API
  // In production, this should connect to your blockchain node REST API or RPC endpoint
  
  const mockPools: ValidationPool[] = []
  for (let i = 0; i < 12; i++) {
    const pool = generateMockPool(i)
    if (!status || pool.status === status) {
      mockPools.push(pool)
    }
  }

  res.status(200).json({ 
    pools: mockPools, 
    total: mockPools.length 
  })
}
