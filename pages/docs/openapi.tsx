import Head from 'next/head'

export default function OpenAPIPage() {
  const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Block And Play Explorer API',
      version: '1.0.0',
      description: 'API for querying NFTs, tokens, evolution history, and smart contracts in the Block And Play ecosystem',
      contact: {
        name: 'BAP Team',
        url: 'https://blockandplay.example.com'
      }
    },
    servers: [
      {
        url: 'https://explorer.blockandplay.testnet.example.com',
        description: 'Testnet server'
      },
      {
        url: 'https://explorer.blockandplay.mainnet.example.com',
        description: 'Mainnet server'
      }
    ],
    paths: {
      '/api/nfts': {
        get: {
          summary: 'Query NFTs',
          description: 'Search for NFTs by token ID, owner address, or contract address',
          parameters: [
            {
              name: 'type',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
                enum: ['tokenId', 'owner', 'contract']
              },
              description: 'Type of search to perform'
            },
            {
              name: 'query',
              in: 'query',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Search query value'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      nfts: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/NFT'
                        }
                      },
                      total: {
                        type: 'integer'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/tokens': {
        get: {
          summary: 'Get token information',
          description: 'Retrieve token details and recent transfers',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Token contract address'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: {
                        $ref: '#/components/schemas/Token'
                      },
                      transfers: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/TokenTransfer'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/history': {
        get: {
          summary: 'Get evolution history',
          description: 'Retrieve complete evolution history for an asset',
          parameters: [
            {
              name: 'assetId',
              in: 'query',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Asset or token ID'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      events: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/EvolutionEvent'
                        }
                      },
                      total: {
                        type: 'integer'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/contracts': {
        get: {
          summary: 'Get contract details',
          description: 'Retrieve smart contract information and available methods',
          parameters: [
            {
              name: 'address',
              in: 'query',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Smart contract address'
            }
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      contract: {
                        $ref: '#/components/schemas/Contract'
                      },
                      methods: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/ContractMethod'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        NFT: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            owner: { type: 'string' },
            tokenId: { type: 'string' },
            contract: { type: 'string' },
            metadata: {
              type: 'object',
              properties: {
                image: { type: 'string' },
                description: { type: 'string' }
              }
            }
          }
        },
        Token: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            symbol: { type: 'string' },
            name: { type: 'string' },
            address: { type: 'string' },
            totalSupply: { type: 'string' },
            decimals: { type: 'integer' },
            holders: { type: 'integer' }
          }
        },
        TokenTransfer: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            from: { type: 'string' },
            to: { type: 'string' },
            amount: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            txHash: { type: 'string' }
          }
        },
        EvolutionEvent: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            assetId: { type: 'string' },
            eventType: {
              type: 'string',
              enum: ['minted', 'transferred', 'evolved', 'burned']
            },
            from: { type: 'string' },
            to: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            txHash: { type: 'string' },
            metadata: { type: 'object' }
          }
        },
        Contract: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            address: { type: 'string' },
            name: { type: 'string' },
            type: {
              type: 'string',
              enum: ['NFT', 'Token', 'Game', 'Other']
            },
            verified: { type: 'boolean' },
            deployedAt: { type: 'string', format: 'date-time' },
            transactionCount: { type: 'integer' },
            creator: { type: 'string' }
          }
        },
        ContractMethod: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: {
              type: 'string',
              enum: ['read', 'write']
            },
            inputs: {
              type: 'array',
              items: { type: 'string' }
            },
            outputs: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>OpenAPI Specification - BAP Explorer</title>
        <meta name="description" content="OpenAPI specification for BAP Explorer API" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">OpenAPI Specification</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete API specification for the Block And Play Explorer
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">API Specification (OpenAPI 3.0)</h2>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(openApiSpec, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'bap-explorer-openapi.json'
                a.click()
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Download JSON
            </button>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            <pre className="text-sm">
              <code>{JSON.stringify(openApiSpec, null, 2)}</code>
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Using the Specification</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Import into API Tools</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                This specification can be imported into various API development tools:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Postman - for API testing and documentation</li>
                <li>Swagger UI - for interactive API exploration</li>
                <li>OpenAPI Generator - to generate client SDKs</li>
                <li>Insomnia - for API design and testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Generate Client Code</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Use OpenAPI Generator to create client libraries in various languages:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
                openapi-generator-cli generate -i bap-explorer-openapi.json -g typescript-axios -o ./client
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">API Endpoints</h3>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="font-mono font-bold">GET /api/nfts</span> - Query NFTs
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="font-mono font-bold">GET /api/tokens</span> - Get token information
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="font-mono font-bold">GET /api/history</span> - Get evolution history
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="font-mono font-bold">GET /api/contracts</span> - Get contract details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
