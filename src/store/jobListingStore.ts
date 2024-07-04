import { create } from 'zustand';

interface JobListingState {
  isAddingJobToListing: boolean;
  setIsAddingJobToListing: (value: boolean) => void;
}

export const useJobListingStore = create<JobListingState>()((set) => ({
  isAddingJobToListing: false,
  setIsAddingJobToListing: (value) => set({ isAddingJobToListing: value }),
}));
