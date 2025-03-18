import { createContext, useState, useContext, useEffect } from "react";
import Favourites from "../pages/favorites";
const MovieContext = createContext();
export const useMovieContext = () => useContext();
export const MovieProvider = ({ children }) => {
  const favKey = "favorites";
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavs = localStorage.getItem(favKey);
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);
  useEffect(() => {
    localStorage.setItem(favKey, JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };
  const isFavorite = (movieId) => {
    return Favourites.some((movie) => movie.id === movieId);
  };
  const values = {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
  
};
