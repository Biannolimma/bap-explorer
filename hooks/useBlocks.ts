import { useState, useEffect } from 'react'

interface Block {
  height: number
  hash: string
  timestamp: string
  transactions: number
  validator: string
  size: number
}

interface UseBlocksResult {
  blocks: Block[]
  loading: boolean
  error: Error | null
  total: number
  refetch: () => void
}

/**
 * Hook to fetch blocks from the blockchain
 * 
 * @param page - Page number for pagination
 * @param limit - Number of blocks per page
 * @returns Block data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { blocks, loading, error, total, refetch } = useBlocks(1, 20)
 * ```
 */
export function useBlocks(page: number = 1, limit: number = 20): UseBlocksResult {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  const fetchBlocks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/blocks?page=${page}&limit=${limit}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setBlocks(data.blocks || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching blocks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlocks()
  }, [page, limit])

  return {
    blocks,
    loading,
    error,
    total,
    refetch: fetchBlocks,
  }
}

/**
 * Hook to fetch a single block by height or hash
 * 
 * @param blockId - Block height or hash
 * @returns Block data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { block, loading, error, refetch } = useBlock('12345')
 * ```
 */
export function useBlock(blockId: string | number) {
  const [block, setBlock] = useState<Block | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchBlock = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/blocks/${blockId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setBlock(data.block || null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      console.error('Error fetching block:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (blockId) {
      fetchBlock()
    }
  }, [blockId])

  return {
    block,
    loading,
    error,
    refetch: fetchBlock,
  }
}
