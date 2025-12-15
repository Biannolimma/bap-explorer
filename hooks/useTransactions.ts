import { useState, useEffect } from 'react'

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

interface UseTransactionsResult {
  transactions: Transaction[]
  loading: boolean
  error: Error | null
  total: number
  refetch: () => void
}

/**
 * Hook to fetch transactions from the blockchain
 * 
 * @param page - Page number for pagination
 * @param limit - Number of transactions per page
 * @returns Transaction data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { transactions, loading, error, total, refetch } = useTransactions(1, 20)
 * ```
 */
export function useTransactions(page: number = 1, limit: number = 20): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/transactions?page=${page}&limit=${limit}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setTransactions(data.transactions || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [page, limit])

  return {
    transactions,
    loading,
    error,
    total,
    refetch: fetchTransactions,
  }
}

/**
 * Hook to fetch a single transaction by hash
 * 
 * @param txHash - Transaction hash
 * @returns Transaction data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { transaction, loading, error, refetch } = useTransaction('0x123...')
 * ```
 */
export function useTransaction(txHash: string) {
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTransaction = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/transactions/${txHash}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setTransaction(data.transaction || null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching transaction:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (txHash) {
      fetchTransaction()
    }
  }, [txHash])

  return {
    transaction,
    loading,
    error,
    refetch: fetchTransaction,
  }
}
