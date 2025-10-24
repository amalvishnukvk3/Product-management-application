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

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      favoriteCount,
      updateFavoriteCount
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
