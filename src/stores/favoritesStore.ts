import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GiphyResponse } from "../types/GiphyResponse";

export const useFavoritesStore = create<{
    favorites: GiphyResponse[];
    addFavorite: (gif: GiphyResponse) => void;
    removeFavorite: (id: string) => void;
}>()(
    devtools(
        persist(
            (set) => ({
                favorites: [],
                addFavorite: (gif: GiphyResponse) =>
                    set((store) => ({
                        favorites: [
                            ...store.favorites,
                            gif,
                        ],
                    })),
                removeFavorite: (id: string) =>
                    set((store) => {
                        console.log("Before removal", store.favorites);
                        const newFavorites = store.favorites.filter((favorite) => favorite.id !== id);
                        console.log("After removal", newFavorites);
                        return { favorites: newFavorites };
                    }),
            }),
            {
                name: "favorites-storage",
            }
        )
    )
);