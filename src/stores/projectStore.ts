import { create } from 'zustand';

type ProjectState = {
  stage: string;
  setStage: (stage: string) => void;
  // add more as needed
};

export const useProjectStore = create<ProjectState>((set) => ({
  stage: 'idle',
  setStage: (stage) => set({ stage }),
}));
