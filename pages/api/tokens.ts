import type { NextApiRequest, NextApiResponse } from 'next'

type Token = {
  id: string
  symbol: string
  name: string
  address: string
  totalSupply: string
  decimals: number
  holders: number
}

type TokenTransfer = {
  id: string
  from: string
  to: string
  amount: string
  timestamp: string
  txHash: string
}

type TokenResponse = {
  token: Token
  transfers: TokenTransfer[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse | { error: string }>
) {
  const { address } = req.query

  // Mock response - integrate with actual blockchain API
  const mockToken: Token = {
    id: '1',
    symbol: 'BAP',
    name: 'Block And Play Token',
    address: (address as string) || (process.env.NEXT_PUBLIC_TOKEN_CONTRACT || '0x0000000000000000000000000000000000000000'),
    totalSupply: '1000000000',
    decimals: 18,
    holders: 1234
  }

  const mockTransfers: TokenTransfer[] = [
    {
      id: '1',
      from: '0x1234567890123456789012345678901234567890',
      to: '0x0987654321098765432109876543210987654321',
      amount: '100',
      timestamp: new Date().toISOString(),
      txHash: '0xabcdef0123456789abcdef0123456789abcdef01'
    }
  ]

  res.status(200).json({ token: mockToken, transfers: mockTransfers })
}
