import { useState, useEffect } from 'react'

interface Penalty {
  id: string
  validator: string
  type: 'slash' | 'jail' | 'downtime'
  reason: string
  amount: string
  blockHeight: number
  timestamp: string
}

interface UsePenaltiesResult {
  penalties: Penalty[]
  loading: boolean
  error: Error | null
  total: number
  refetch: () => void
}

/**
 * Hook to fetch penalties from the blockchain
 * 
 * @param page - Page number for pagination
 * @param limit - Number of penalties per page
 * @param type - Optional filter by penalty type
 * @returns Penalty data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { penalties, loading, error, total, refetch } = usePenalties(1, 20, 'slash')
 * ```
 */
export function usePenalties(
  page: number = 1,
  limit: number = 20,
  type?: 'slash' | 'jail' | 'downtime'
): UsePenaltiesResult {
  const [penalties, setPenalties] = useState<Penalty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  const fetchPenalties = async () => {
    try {
      setLoading(true)
      setError(null)
      const typeParam = type ? `&type=${type}` : ''
      const response = await fetch(`/api/penalties?page=${page}&limit=${limit}${typeParam}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPenalties(data.penalties || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching penalties:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPenalties()
  }, [page, limit, type])

  return {
    penalties,
    loading,
    error,
    total,
    refetch: fetchPenalties,
  }
}
