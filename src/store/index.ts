import { create, type StateCreator } from "zustand";
import { persist } from 'zustand/middleware'


interface WishSlice {
wishes: string[],
owner: string,
createWish: (wish: string) => void
}
const wishSlice: StateCreator<
WishSlice & RatingSlice,
[],
[],
WishSlice
> = (set) => ({
 wishes: [],
 owner: '',
 createWish(wish) {
   set(({wishes}) => ({
    wishes: [...wishes, wish]
   }))
 },
});

interface RatingSlice {
  rating: number,
  updateRating: (type: 'increase' | 'decrease') => void,
}

const ratingSlice: StateCreator<
WishSlice & RatingSlice,
[],
[],
RatingSlice
> = (set) => ({
rating: 0,
updateRating(type) {
  const ratings = {
    increase: set(({rating}) => ({ rating: rating + 1 })),
    decrease:set(({rating}) => ({ rating: rating - 1 }))
  }
  return ratings[type]
},
});

export const wishListStore = create<WishSlice & RatingSlice>()(persist(
  (...a) => ({
    ...wishSlice(...a),
    ...ratingSlice(...a)
  }), {
    name: "wishes"
  })
);
