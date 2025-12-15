import { useState, useEffect } from 'react'

interface NetworkMetrics {
  blockHeight: number
  totalTransactions: number
  activeValidators: number
  networkHashRate: string
  averageBlockTime: string
  totalPenalties: number
}

interface UseMetricsResult {
  metrics: NetworkMetrics | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch network metrics from the blockchain
 * 
 * @param autoRefresh - Whether to automatically refresh metrics every interval
 * @param refreshInterval - Refresh interval in milliseconds (default: 30000ms = 30s)
 * @returns Metrics data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { metrics, loading, error, refetch } = useMetrics(true, 30000)
 * ```
 */
export function useMetrics(
  autoRefresh: boolean = false,
  refreshInterval: number = 30000
): UseMetricsResult {
  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/metrics')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setMetrics(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching metrics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()

    if (autoRefresh) {
      const interval = setInterval(fetchMetrics, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval])

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  }
}
