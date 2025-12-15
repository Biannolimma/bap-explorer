import type { NextApiRequest, NextApiResponse } from 'next'

interface Penalty {
  id: string
  validator: string
  type: 'slash' | 'jail' | 'downtime'
  reason: string
  amount: string
  blockHeight: number
  timestamp: string
}

type PenaltiesResponse = {
  penalties: Penalty[]
  total: number
}

// Mock data generator
const generateMockPenalty = (index: number): Penalty => {
  const now = new Date()
  now.setHours(now.getHours() - index * 12)
  
  const types: ('slash' | 'jail' | 'downtime')[] = ['slash', 'jail', 'downtime']
  const penaltyType = types[Math.floor(Math.random() * types.length)]
  
  const reasons = {
    slash: 'Double signing detected',
    jail: 'Missed consecutive blocks',
    downtime: 'Extended node downtime',
  }
  
  return {
    id: `penalty-${Math.random().toString(36).substring(2, 15)}`,
    validator: `0x${Math.random().toString(16).substring(2, 42)}`,
    type: penaltyType,
    reason: reasons[penaltyType],
    amount: penaltyType === 'slash' ? `${(Math.random() * 10000).toFixed(2)} BAP` : 'N/A',
    blockHeight: Math.floor(Math.random() * 10000) + 1,
    timestamp: now.toISOString(),
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PenaltiesResponse | { error: string }>
) {
  const { page = '1', limit = '20', type } = req.query

  // Mock response - integrate with actual blockchain API
  // In production, this should connect to your blockchain node REST API or RPC endpoint
  
  const pageNum = parseInt(page as string)
  const limitNum = parseInt(limit as string)
  
  const mockPenalties: Penalty[] = []
  let generatedCount = 0
  let index = (pageNum - 1) * limitNum
  
  while (mockPenalties.length < limitNum && generatedCount < 100) {
    const penalty = generateMockPenalty(index)
    if (!type || penalty.type === type) {
      mockPenalties.push(penalty)
    }
    index++
    generatedCount++
  }

  res.status(200).json({ 
    penalties: mockPenalties, 
    total: 150 // Mock total
  })
}
