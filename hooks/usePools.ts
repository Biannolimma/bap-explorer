import { useState, useEffect } from 'react'

interface ValidationPool {
  id: string
  name: string
  totalStake: string
  validators: number
  commission: string
  status: 'active' | 'inactive'
  performance: number
}

interface UsePoolsResult {
  pools: ValidationPool[]
  loading: boolean
  error: Error | null
  total: number
  refetch: () => void
}

/**
 * Hook to fetch validation pools from the blockchain
 * 
 * @param status - Optional filter by pool status ('active' | 'inactive')
 * @returns Pool data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { pools, loading, error, total, refetch } = usePools('active')
 * ```
 */
export function usePools(status?: 'active' | 'inactive'): UsePoolsResult {
  const [pools, setPools] = useState<ValidationPool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  const fetchPools = async () => {
    try {
      setLoading(true)
      setError(null)
      const statusParam = status ? `?status=${status}` : ''
      const response = await fetch(`/api/pools${statusParam}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPools(data.pools || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching pools:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPools()
  }, [status])

  return {
    pools,
    loading,
    error,
    total,
    refetch: fetchPools,
  }
}
