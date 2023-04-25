import { create } from 'zustand';

interface MarketModelProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMarketModel = create<MarketModelProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useMarketModel;
