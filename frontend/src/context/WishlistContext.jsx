//@ts-nocheck
import React, { createContext, useState } from 'react';

// 1. Create context
export const ThemeContext = createContext();

// 2. Create provider component
export const ThemeProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Favorite count state

  const [favoriteCount, setFavoriteCount] = useState(0);

  // Function to update favorite count
  const updateFavoriteCount = (count) => {
    setFavoriteCount(count);
  };

  const [products, setProducts] = useState([]);
  // Function to update favorite count
  const updateProducts = (products) => {
    setProducts(products);
  };
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const updatePage = (page) => {
    setPage(page);
  };
  const updateTotalPages = (totalPages) => {
    setTotalPages(totalPages);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      favoriteCount,
      updateFavoriteCount,
      products, updateProducts,
      page, updatePage,
      totalPages, updateTotalPages

    }}>
      {children}
    </ThemeContext.Provider>
  );
};
