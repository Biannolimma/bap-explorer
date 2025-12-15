# Guia de Integração - BAP Explorer com Backend Blockchain

Este documento descreve como integrar o BAP Explorer com o backend real do blockchain Block and Play.

## Visão Geral

O BAP Explorer foi estruturado com uma arquitetura modular que facilita a integração com o backend do blockchain. Atualmente, todas as páginas estão funcionando com dados mockados (simulados), prontos para serem substituídos por chamadas reais à API do blockchain.

## Estrutura de Integração

### 1. API Routes (Backend do Explorer)

As rotas de API em `pages/api/` atuam como camada intermediária entre o frontend e o blockchain:

```
pages/api/
├── blocks.ts         # Endpoints para blocos
├── transactions.ts   # Endpoints para transações
├── pools.ts         # Endpoints para pools de validação
├── penalties.ts     # Endpoints para penalidades
└── metrics.ts       # Endpoints para métricas da rede
```

**Responsabilidades:**
- Receber requisições HTTP do frontend
- Conectar ao node blockchain via REST API ou RPC
- Formatar e retornar dados para o frontend
- Gerenciar erros e timeouts

### 2. Hooks Customizados (Frontend)

Os hooks em `hooks/` encapsulam a lógica de fetch de dados:

```
hooks/
├── useBlocks.ts        # Hook para buscar blocos
├── useTransactions.ts  # Hook para buscar transações
├── usePools.ts        # Hook para buscar pools
├── usePenalties.ts    # Hook para buscar penalidades
└── useMetrics.ts      # Hook para buscar métricas
```

**Vantagens:**
- Reutilização de código
- Loading e error states automáticos
- Suporte a paginação
- Suporte a auto-refresh (métricas)

### 3. Páginas do Explorer

Páginas principais implementadas:

- **Dashboard** (`/dashboard`) - Visão geral da rede
- **Blocks** (`/blocks`) - Lista e busca de blocos
- **Transactions** (`/transactions`) - Lista e busca de transações
- **Pools** (`/pools`) - Pools de validação
- **Penalties** (`/penalties`) - Penalidades da rede

## Integrando com o Backend Real

### Opção 1: REST API

Se o seu blockchain expõe uma REST API, modifique os arquivos em `pages/api/`:

```typescript
// pages/api/blocks.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL || 'http://localhost:26657'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', limit = '20' } = req.query
  
  try {
    // Chamar API real do blockchain
    const response = await axios.get(`${BLOCKCHAIN_API_URL}/blocks`, {
      params: { page, limit }
    })
    
    // Transformar dados se necessário
    const blocks = response.data.result.blocks.map((block: any) => ({
      height: parseInt(block.header.height),
      hash: block.block_id.hash,
      timestamp: block.header.time,
      transactions: block.data.txs?.length || 0,
      validator: block.header.proposer_address,
      size: block.block_size,
    }))
    
    res.status(200).json({ 
      blocks, 
      total: response.data.result.total_count 
    })
  } catch (error) {
    console.error('Error fetching blocks from blockchain:', error)
    res.status(500).json({ error: 'Failed to fetch blocks' })
  }
}
```

### Opção 2: RPC Direto

Para conexão RPC direta (ex: Tendermint/CometBFT):

```typescript
import { JsonRpcProvider } from 'ethers' // ou outra biblioteca RPC

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blockNumber = await provider.getBlockNumber()
    const block = await provider.getBlock(blockNumber)
    
    res.status(200).json({
      height: block.number,
      hash: block.hash,
      timestamp: new Date(block.timestamp * 1000).toISOString(),
      transactions: block.transactions.length,
      // ... outros campos
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch block data' })
  }
}
```

### Opção 3: WebSocket para Dados em Tempo Real

Para updates em tempo real (ex: novos blocos):

```typescript
// hooks/useRealtimeBlocks.ts
import { useEffect, useState } from 'react'

export function useRealtimeBlocks() {
  const [latestBlock, setLatestBlock] = useState(null)
  
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!)
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        method: 'subscribe',
        params: ['tm.event=\'NewBlock\'']
      }))
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.result?.data?.value?.block) {
        setLatestBlock(data.result.data.value.block)
      }
    }
    
    return () => ws.close()
  }, [])
  
  return latestBlock
}
```

## Endpoints do Backend Blockchain Necessários

Para integração completa, seu backend deve expor:

### 1. Blocos
- `GET /blocks?page=1&limit=20` - Lista blocos com paginação
- `GET /blocks/{height}` - Retorna um bloco específico
- `GET /blocks/{hash}` - Busca bloco por hash

### 2. Transações
- `GET /transactions?page=1&limit=20` - Lista transações
- `GET /transactions/{hash}` - Retorna transação específica
- `GET /transactions?address={address}` - Transações de um endereço

### 3. Validadores e Pools
- `GET /validators` - Lista validadores ativos
- `GET /validators/{address}` - Detalhes de um validador
- `GET /staking/pools` - Lista pools de validação

### 4. Penalidades
- `GET /slashing/signing_infos` - Informações de penalidades
- `GET /slashing/validators/{address}/penalties` - Penalidades de um validador

### 5. Métricas da Rede
- `GET /status` - Status geral da rede
- `GET /net_info` - Informação da rede P2P
- `GET /consensus_state` - Estado do consenso

## Variáveis de Ambiente

Configure em `.env.local`:

```bash
# Blockchain Node Configuration
BLOCKCHAIN_API_URL=https://api.blockandplay.io
NEXT_PUBLIC_RPC_URL=https://rpc.blockandplay.io
NEXT_PUBLIC_WS_URL=wss://ws.blockandplay.io

# Network Configuration
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_CHAIN_ID=blockandplay-1
NEXT_PUBLIC_CHAIN_NAME=Block And Play Mainnet

# Explorer Configuration
NEXT_PUBLIC_ITEMS_PER_PAGE=20
NEXT_PUBLIC_AUTO_REFRESH_INTERVAL=30000
```

## Testando a Integração

1. **Teste com dados mock primeiro:**
   ```bash
   npm run dev
   ```
   Verifique se todas as páginas carregam corretamente.

2. **Substitua um endpoint por vez:**
   Comece com o endpoint mais simples (ex: `/api/metrics`)

3. **Use logs para debug:**
   ```typescript
   console.log('Blockchain response:', response.data)
   ```

4. **Teste tratamento de erros:**
   - Node offline
   - Timeout de requisição
   - Dados malformados

## Próximos Passos

### Fase 1 - Integração Básica ✅ (Atual)
- [x] Estrutura de páginas criada
- [x] API routes com mock data
- [x] Hooks customizados
- [x] Navegação implementada

### Fase 2 - Integração Real (Próximo)
- [ ] Conectar API routes ao backend real
- [ ] Implementar tratamento de erros robusto
- [ ] Adicionar caching de dados
- [ ] Implementar rate limiting

### Fase 3 - Funcionalidades Avançadas
- [ ] WebSocket para updates em tempo real
- [ ] Busca avançada e filtros
- [ ] Gráficos e visualizações
- [ ] Exportação de dados

### Fase 4 - Otimização
- [ ] Server-side rendering (SSR)
- [ ] Infinite scroll nas listas
- [ ] Progressive Web App (PWA)
- [ ] Otimização de performance

## Exemplos de Integração por Tipo de Blockchain

### Cosmos SDK / Tendermint

```typescript
import axios from 'axios'

const cosmosClient = axios.create({
  baseURL: process.env.BLOCKCHAIN_API_URL,
  timeout: 10000,
})

// Buscar bloco
const block = await cosmosClient.get(`/cosmos/base/tendermint/v1beta1/blocks/${height}`)

// Buscar transações
const txs = await cosmosClient.get(`/cosmos/tx/v1beta1/txs?events=tx.height=${height}`)

// Buscar validadores
const validators = await cosmosClient.get('/cosmos/staking/v1beta1/validators')
```

### Ethereum-like (EVM)

```typescript
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)

// Buscar bloco
const block = await provider.getBlock(blockNumber)

// Buscar transação
const tx = await provider.getTransaction(txHash)

// Buscar saldo
const balance = await provider.getBalance(address)
```

### Substrate

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api'

const wsProvider = new WsProvider(process.env.NEXT_PUBLIC_WS_URL)
const api = await ApiPromise.create({ provider: wsProvider })

// Buscar bloco
const blockHash = await api.rpc.chain.getBlockHash(blockNumber)
const block = await api.rpc.chain.getBlock(blockHash)

// Buscar validadores
const validators = await api.query.session.validators()
```

## Suporte

Para dúvidas sobre integração:
1. Consulte a documentação do seu blockchain
2. Verifique os logs do servidor (`npm run dev`)
3. Teste endpoints manualmente com curl ou Postman
4. Abra uma issue no repositório

## Conclusão

Este guia fornece a base necessária para integrar o BAP Explorer com qualquer backend blockchain. A estrutura modular permite que você integre gradualmente, testando cada componente antes de avançar para o próximo.
