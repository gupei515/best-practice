/**
 * https://github.com/pmndrs/zustand
 */
import create from "zustand";

const useStore = create((set: any) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state?.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}));
