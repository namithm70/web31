export type ChainId = 1 | 137 | 42161;
export type Address = `0x${string}`;

export interface Quote {
  tokenIn: Address;
  tokenOut: Address;
  amountIn: string;
  amountOut: string;
  route: string;
  priceImpactBps: number;
  gasEstimate: string;
  slippageBps: number;
}

export interface MarketRate {
  asset: `0x${string}`;
  supplyAPY: number;
  borrowAPR: number;
  utilization: number;
}

export interface PositionSummary {
  balances: Record<Address, string>;
  supplied: { asset: Address; amount: string; apy: number }[];
  borrowed: { asset: Address; amount: string; apr: number }[];
  healthFactor?: number;
}

export interface ProtocolData {
  id: string;
  name: string;
  tvl: number;
  tvlChange24h: number;
  apy: number;
  category: string;
  chains: number[];
  risk: 'low' | 'medium' | 'high';
  volume24h: number;
}

export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  value: number;
  change24h: number;
  allocation: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'swap' | 'stake' | 'lend' | 'borrow' | 'transfer';
  from: string;
  to: string;
  amount: number;
  value: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
}

export interface TokenData {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  price?: number;
  volume24h?: number;
  liquidity?: number;
}

export interface PoolData {
  id: string;
  protocol: string;
  token0: TokenData;
  token1: TokenData;
  apr: number;
  tvl: number;
  stakingContract?: Address;
  rewardTokens?: TokenData[];
}

export interface TransactionState {
  status: 'idle' | 'quoting' | 'signing' | 'mining';
  hash?: string;
  error?: string;
}
