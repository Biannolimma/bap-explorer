import type { NextApiRequest, NextApiResponse } from 'next'

export interface NfxDetail {
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
  createdAt: string
  lastActivity: string
  description: string
  statistics: {
    totalVisits: number
    activeUsers: number
    dailyTransactions: number
    averageValue: number
  }
  governance: {
    votingPower: number
    proposals: number
    decisions: string[]
  }
  events: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    value?: number
  }>
  depositedAssets: Array<{
    id: string
    type: string
    name: string
    value: number
  }>
  partnersList: Array<{
    address: string
    name: string
    contribution: number
  }>
  subspacesList: Array<{
    id: string
    name: string
    size: number
    status: string
  }>
}

type NfxDetailResponse = {
  nfx: NfxDetail
}

// Mock data generator for NFX details
const generateMockNfxDetail = (id: string): NfxDetail => {
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

  const numericId = parseInt(id.replace('nfx-', '')) || 1
  const now = new Date()
  const createdDate = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000)
  const lastActivityDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)

  // Generate mock events
  const events = []
  for (let i = 0; i < 10; i++) {
    const eventDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    events.push({
      id: `event-${i}`,
      type: ['Created', 'Asset Deposited', 'Partner Added', 'Governance Vote', 'Value Update'][i % 5],
      description: `Event ${i + 1} description for this NFX`,
      timestamp: eventDate.toISOString(),
      value: Math.random() > 0.5 ? Math.floor(Math.random() * 10000) : undefined,
    })
  }

  // Generate deposited assets
  const depositedAssets = []
  for (let i = 0; i < 15; i++) {
    depositedAssets.push({
      id: `asset-${i}`,
      type: ['NFT', 'Token', 'Contract', 'Data'][i % 4],
      name: `Asset ${i + 1}`,
      value: Math.floor(Math.random() * 50000),
    })
  }

  // Generate partners list
  const partnersList = []
  const partnersCount = Math.floor(Math.random() * 10) + 3
  for (let i = 0; i < partnersCount; i++) {
    partnersList.push({
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      name: `Partner ${i + 1}`,
      contribution: Math.floor(Math.random() * 100000),
    })
  }

  // Generate subspaces list
  const subspacesList = []
  const subspacesCount = Math.floor(Math.random() * 8) + 2
  for (let i = 0; i < subspacesCount; i++) {
    subspacesList.push({
      id: `subspace-${i}`,
      name: `Subspace ${i + 1}`,
      size: Math.floor(Math.random() * 1000) + 50,
      status: ['Active', 'Pending', 'Inactive'][i % 3],
    })
  }

  return {
    id,
    name: names[numericId % names.length] + ` #${numericId}`,
    owner: `0x${Math.random().toString(16).substring(2, 42)}`,
    size: Math.floor(Math.random() * 10000) + 100,
    reputation: Math.floor(Math.random() * 100),
    value: Math.floor(Math.random() * 1000000) + 10000,
    branding: brandings[numericId % brandings.length],
    premium: Math.random() > 0.7,
    assetsCount: depositedAssets.length,
    partners: partnersCount,
    subspaces: subspacesCount,
    createdAt: createdDate.toISOString(),
    lastActivity: lastActivityDate.toISOString(),
    description: `This is a ${brandings[numericId % brandings.length]}-focused NFX (Non-Fungible eXpanding Island) that serves as a digital space for collaboration, trading, and community building within the Block And Play ecosystem.`,
    statistics: {
      totalVisits: Math.floor(Math.random() * 100000) + 1000,
      activeUsers: Math.floor(Math.random() * 1000) + 50,
      dailyTransactions: Math.floor(Math.random() * 500) + 10,
      averageValue: Math.floor(Math.random() * 50000) + 1000,
    },
    governance: {
      votingPower: Math.floor(Math.random() * 10000),
      proposals: Math.floor(Math.random() * 20),
      decisions: [
        'Approved expansion to new sectors',
        'Updated branding guidelines',
        'New partner requirements established',
      ],
    },
    events,
    depositedAssets,
    partnersList,
    subspacesList,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NfxDetailResponse | { error: string }>
) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid NFX ID' })
  }

  // Mock response - integrate with actual blockchain API
  // In production, this should query the blockchain to fetch real NFX details
  // from the smart contract using the NFX ID

  try {
    const nfxDetail = generateMockNfxDetail(id)
    res.status(200).json({ nfx: nfxDetail })
  } catch (error) {
    res.status(404).json({ error: 'NFX not found' })
  }
}
