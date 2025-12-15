import type { NextApiRequest, NextApiResponse } from 'next'

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  blockHeight: number
  timestamp: string
  status: 'success' | 'failed' | 'pending'
  fee: string
}

type TransactionsResponse = {
  transactions: Transaction[]
  total: number
}

type TransactionResponse = {
  transaction: Transaction
}

// Mock data generator
const generateMockTransaction = (index: number): Transaction => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - index * 2)
  
  const statuses: ('success' | 'failed' | 'pending')[] = ['success', 'success', 'success', 'failed', 'pending']
  
  return {
    hash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
    from: `0x${Math.random().toString(16).substring(2, 42)}`,
    to: `0x${Math.random().toString(16).substring(2, 42)}`,
    value: `${(Math.random() * 100).toFixed(4)} BAP`,
    blockHeight: Math.floor(Math.random() * 10000) + 1,
    timestamp: now.toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    fee: `${(Math.random() * 0.01).toFixed(6)} BAP`,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionsResponse | TransactionResponse | { error: string }>
) {
  const { page = '1', limit = '20', txHash } = req.query

  // Mock response - integrate with actual blockchain API
  // In production, this should connect to your blockchain node REST API or RPC endpoint
  
  if (txHash) {
    // Single transaction query
    const transaction = generateMockTransaction(0)
    transaction.hash = txHash as string
    return res.status(200).json({ transaction })
  }

  // List transactions
  const pageNum = parseInt(page as string)
  const limitNum = parseInt(limit as string)
  
  const mockTransactions: Transaction[] = []
  for (let i = (pageNum - 1) * limitNum; i < pageNum * limitNum; i++) {
    mockTransactions.push(generateMockTransaction(i))
  }

  res.status(200).json({ 
    transactions: mockTransactions, 
    total: 50000 // Mock total
  })
}
