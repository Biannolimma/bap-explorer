import type { NextApiRequest, NextApiResponse } from 'next'

type EvolutionEvent = {
  id: string
  assetId: string
  eventType: 'minted' | 'transferred' | 'evolved' | 'burned'
  from?: string
  to?: string
  timestamp: string
  txHash: string
  metadata?: any
}

type HistoryResponse = {
  events: EvolutionEvent[]
  total: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HistoryResponse | { error: string }>
) {
  const { assetId } = req.query

  // Mock response - integrate with actual blockchain API
  const mockEvents: EvolutionEvent[] = [
    {
      id: '1',
      assetId: assetId as string,
      eventType: 'minted',
      to: '0x1234567890123456789012345678901234567890',
      timestamp: new Date(Date.now() - 86400000 * 10).toISOString(),
      txHash: '0xabcdef0123456789abcdef0123456789abcdef01'
    },
    {
      id: '2',
      assetId: assetId as string,
      eventType: 'transferred',
      from: '0x1234567890123456789012345678901234567890',
      to: '0x0987654321098765432109876543210987654321',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      txHash: '0xabcdef0123456789abcdef0123456789abcdef02'
    }
  ]

  res.status(200).json({ events: mockEvents, total: mockEvents.length })
}
