import type { NextApiRequest, NextApiResponse } from 'next'

type NFT = {
  id: string
  name: string
  owner: string
  tokenId: string
  contract: string
  metadata: {
    image?: string
    description?: string
  }
}

type NFTResponse = {
  nfts: NFT[]
  total: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTResponse | { error: string }>
) {
  const { type, query } = req.query

  // Mock response - integrate with actual blockchain API
  const mockNFTs: NFT[] = [
    {
      id: '1',
      name: 'BAP NFT #1',
      owner: '0x1234567890123456789012345678901234567890',
      tokenId: '1',
      contract: process.env.NEXT_PUBLIC_NFT_CONTRACT || '0x0000000000000000000000000000000000000000',
      metadata: {
        description: 'Example NFT from Block And Play'
      }
    },
    {
      id: '2',
      name: 'BAP NFT #2',
      owner: '0x0987654321098765432109876543210987654321',
      tokenId: '2',
      contract: process.env.NEXT_PUBLIC_NFT_CONTRACT || '0x0000000000000000000000000000000000000000',
      metadata: {
        description: 'Another example NFT'
      }
    }
  ]

  res.status(200).json({ nfts: mockNFTs, total: mockNFTs.length })
}
