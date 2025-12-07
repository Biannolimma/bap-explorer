import type { NextApiRequest, NextApiResponse } from 'next'

type Contract = {
  id: string
  address: string
  name: string
  type: 'NFT' | 'Token' | 'Game' | 'Other'
  verified: boolean
  deployedAt: string
  transactionCount: number
  creator: string
}

type ContractMethod = {
  name: string
  type: 'read' | 'write'
  inputs: string[]
  outputs: string[]
}

type ContractResponse = {
  contract: Contract
  methods: ContractMethod[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContractResponse | { error: string }>
) {
  const { address } = req.query

  // Mock response - integrate with actual blockchain API
  const mockContract: Contract = {
    id: '1',
    address: (address as string) || '0x0000000000000000000000000000000000000000',
    name: 'BAP NFT Contract',
    type: 'NFT',
    verified: true,
    deployedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    transactionCount: 5678,
    creator: '0x1234567890123456789012345678901234567890'
  }

  const mockMethods: ContractMethod[] = [
    {
      name: 'mint',
      type: 'write',
      inputs: ['address to', 'uint256 tokenId'],
      outputs: []
    },
    {
      name: 'balanceOf',
      type: 'read',
      inputs: ['address owner'],
      outputs: ['uint256']
    }
  ]

  res.status(200).json({ contract: mockContract, methods: mockMethods })
}
