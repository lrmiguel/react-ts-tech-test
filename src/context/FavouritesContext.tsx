import React, { createContext, useContext, useState } from "react";

export interface Favourite {
  id: string;
  name: string;
  rating: string;
}

interface FavouritesContextType {
  favourites: Favourite[];
  toggleFavourite: (fav: Favourite) => void;
  removeFavourite: (id: string) => void;
  isFavourited: (id: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  const toggleFavourite = (fav: Favourite) => {
    setFavourites((prev) =>
      prev.some((f) => f.id === fav.id)
        ? prev.filter((f) => f.id !== fav.id)
        : [...prev, fav]
    );
  };

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavourited = (id: string) => {
    return favourites.some((f) => f.id === id);
  };
  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, removeFavourite, isFavourited }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
};
