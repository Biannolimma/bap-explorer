import type { NextApiRequest, NextApiResponse } from 'next'

export interface Nfx {
  id: string
  name: string
  owner: string
  size: number
  reputation: number
  value: number
  branding: string
  premium: boolean
  assetsCount: number
  partners: number
  subspaces: number
}

type NfxListResponse = {
  nfx: Nfx[]
  total: number
}

// Mock data generator for NFX
const generateMockNfx = (id: number): Nfx => {
  const names = [
    'Innovation District',
    'Creative Hub',
    'Tech Valley',
    'Art Quarter',
    'Business Center',
    'Gaming Arena',
    'Media Plaza',
    'Science Park',
    'Cultural Space',
    'Commerce Zone',
  ]
  
  const brandings = [
    'Technology',
    'Arts & Culture',
    'Business',
    'Gaming',
    'Education',
    'Finance',
    'Entertainment',
    'Health',
    'Sports',
    'Science',
  ]

  return {
    id: `nfx-${id}`,
    name: names[id % names.length] + ` #${id}`,
    owner: `0x${Math.random().toString(16).substring(2, 42)}`,
    size: Math.floor(Math.random() * 10000) + 100, // Size in virtual square units
    reputation: Math.floor(Math.random() * 100), // 0-100 reputation score
    value: Math.floor(Math.random() * 1000000) + 10000, // Value in BAP tokens
    branding: brandings[id % brandings.length],
    premium: Math.random() > 0.7, // 30% chance of being premium
    assetsCount: Math.floor(Math.random() * 500) + 1,
    partners: Math.floor(Math.random() * 50),
    subspaces: Math.floor(Math.random() * 20),
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NfxListResponse | { error: string }>
) {
  const { page = '1', limit = '12' } = req.query

  // Mock response - integrate with actual blockchain API
  // In production, this should connect to your blockchain node REST API or RPC endpoint
  // to fetch real NFX data from the smart contract

  const pageNum = parseInt(page as string)
  const limitNum = parseInt(limit as string)
  
  if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
    return res.status(400).json({ error: 'Invalid pagination parameters' })
  }

  const totalNfx = 50 // Total mock NFX available
  const startIndex = (pageNum - 1) * limitNum

  const mockNfxList: Nfx[] = []
  for (let i = 0; i < limitNum && startIndex + i < totalNfx; i++) {
    mockNfxList.push(generateMockNfx(startIndex + i + 1))
  }

  res.status(200).json({
    nfx: mockNfxList,
    total: totalNfx,
  })
}
