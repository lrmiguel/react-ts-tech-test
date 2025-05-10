import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { FavouritesProvider, useFavourites, Favourite } from "./FavouritesContext";

describe("FavouritesProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <FavouritesProvider>{children}</FavouritesProvider>
    );

    it("returns true when the favourite exists", () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        const favourite: Favourite = { id: "1", name: "Test Favourite", rating: "5" };

        act(() => {
            result.current.toggleFavourite(favourite);
        });

        expect(result.current.isFavourited(favourite.id)).toBe(true);
    });

    it("returns false when the favourite does not exist", () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        expect(result.current.isFavourited("non-existent-id")).toBe(false);
    });

    it("adds a new favourite", () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        const newFav: Favourite = { id: "1", name: "Test Fav", rating: "5" };

        act(() => {
            result.current.toggleFavourite(newFav);
        });

        expect(result.current.favourites).toEqual([newFav]);
    });

    it("removes a favourite", () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        const existingFavourite: Favourite = { id: "1", name: "Test Favourite", rating: "5" };

        act(() => {
            result.current.toggleFavourite(existingFavourite); // Add
            result.current.toggleFavourite(existingFavourite); // Remove
        });

        expect(result.current.favourites).toEqual([]);
    });

    it("removes a favourite with id", () => {
        const { result } = renderHook(() => useFavourites(), { wrapper });

        const favouriteToRemove: Favourite = { id: "1", name: "Test Favourite", rating: "5" };

        act(() => {
            result.current.toggleFavourite(favouriteToRemove); // Add
            result.current.removeFavourite(favouriteToRemove.id); // Remove
        });

        expect(result.current.favourites).toEqual([]);
    });
});