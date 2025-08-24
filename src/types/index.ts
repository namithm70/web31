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
  asset: Address;
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
  chains: ChainId[];
  category: 'lending' | 'dex' | 'yield' | 'stablecoin';
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
