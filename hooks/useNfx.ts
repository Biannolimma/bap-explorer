import { useState, useEffect } from 'react'

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

interface UseNfxListResult {
  nfx: Nfx[]
  loading: boolean
  error: Error | null
  total: number
  refetch: () => void
}

/**
 * Hook to fetch NFX (Non-Fungible eXpanding Islands) list from the blockchain
 * 
 * This hook currently uses mock data. To integrate with the real blockchain API:
 * 1. Set up environment variable NEXT_PUBLIC_NFX_CONTRACT with the contract address
 * 2. Update the API route at /pages/api/nfx.ts to query the blockchain
 * 3. Replace mock data generation with actual contract calls using Web3/ethers.js
 * 
 * @param page - Page number for pagination
 * @param limit - Number of NFX per page
 * @returns NFX data, loading state, error, total count, and refetch function
 * 
 * @example
 * ```tsx
 * const { nfx, loading, error, total, refetch } = useNfxList(1, 12)
 * ```
 */
export function useNfxList(page: number = 1, limit: number = 12): UseNfxListResult {
  const [nfx, setNfx] = useState<Nfx[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  const fetchNfx = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/nfx?page=${page}&limit=${limit}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setNfx(data.nfx || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching NFX:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNfx()
  }, [page, limit])

  return {
    nfx,
    loading,
    error,
    total,
    refetch: fetchNfx,
  }
}

interface UseNfxStatusResult {
  nfx: NfxDetail | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch detailed NFX (Non-Fungible eXpanding Island) status by ID
 * 
 * This hook currently uses mock data. To integrate with the real blockchain API:
 * 1. Ensure NEXT_PUBLIC_NFX_CONTRACT environment variable is set
 * 2. Update the API route at /pages/api/nfx/[id].ts to query blockchain
 * 3. Implement contract methods to fetch:
 *    - Basic NFX properties (owner, size, reputation, value)
 *    - Statistics (visits, active users, transactions)
 *    - Governance data (voting power, proposals, decisions)
 *    - Event history from blockchain events/logs
 *    - Deposited assets list
 *    - Partners and contributions
 *    - Subspaces information
 * 
 * @param nfxId - NFX identifier
 * @returns Detailed NFX data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { nfx, loading, error, refetch } = useNfxStatus('nfx-1')
 * ```
 */
export function useNfxStatus(nfxId: string | undefined): UseNfxStatusResult {
  const [nfx, setNfx] = useState<NfxDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchNfxDetail = async () => {
    if (!nfxId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/nfx/${nfxId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setNfx(data.nfx || null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching NFX details:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNfxDetail()
  }, [nfxId])

  return {
    nfx,
    loading,
    error,
    refetch: fetchNfxDetail,
  }
}
