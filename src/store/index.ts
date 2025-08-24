import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TransactionState } from '@/types';

interface AppState {
  // User preferences
  slippage: number;
  gasMode: 'fast' | 'average' | 'safe';
  selectedChain: number;
  
  // Transaction state
  currentTx: TransactionState | null;
  
  // Actions
  setSlippage: (slippage: number) => void;
  setGasMode: (mode: 'fast' | 'average' | 'safe') => void;
  setSelectedChain: (chainId: number) => void;
  setCurrentTx: (tx: TransactionState | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Default values
      slippage: 0.5, // 0.5%
      gasMode: 'average',
      selectedChain: 1, // Ethereum mainnet
      currentTx: null,
      
      // Actions
      setSlippage: (slippage) => set({ slippage }),
      setGasMode: (mode) => set({ gasMode: mode }),
      setSelectedChain: (chainId) => set({ selectedChain: chainId }),
      setCurrentTx: (tx) => set({ currentTx: tx }),
    }),
    {
      name: 'defi-superapp-storage',
      partialize: (state) => ({
        slippage: state.slippage,
        gasMode: state.gasMode,
        selectedChain: state.selectedChain,
      }),
    }
  )
);
