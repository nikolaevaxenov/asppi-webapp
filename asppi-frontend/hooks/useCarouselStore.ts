import { create } from "zustand";

type CarouselState = {
  index: number;
};

type CarouselAction = {
  updateIndex: (index: CarouselState["index"]) => void;
};

export const useCarouselStore = create<CarouselState & CarouselAction>(
  (set) => ({
    index: 0,
    updateIndex: (index) => set(() => ({ index: index })),
  })
);
