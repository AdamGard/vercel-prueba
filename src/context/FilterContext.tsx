import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Category, SortBy, FilterContextType } from '../types';

const FilterContext = createContext<FilterContextType | undefined>(undefined);

type FilterProviderProps = {
  children: ReactNode; // ReactNode: Permite que el proveedor envuelva cualquier cosa que React pueda renderizar
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All Categories'>('All Categories');
  const [sortBy, setSortBy] = useState<SortBy>('Most Upvoted');

  const value: FilterContextType = {
    selectedCategory,
    sortBy,
    setSelectedCategory,
    setSortBy,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
