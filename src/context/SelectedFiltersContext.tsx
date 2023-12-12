import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Filters } from '../model/Filters';

interface SelectedFiltersContextProps {
    selectedFilters: Filters; // Replace YourFiltersType with the actual type of your filters
    setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const SelectedFiltersContext = createContext<SelectedFiltersContextProps | undefined>(undefined);

export const SelectedFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedFilters, setSelectedFilters] = useState<Filters>(new Filters());

    return (
        <SelectedFiltersContext.Provider value={{ selectedFilters, setSelectedFilters }}>
            {children}
        </SelectedFiltersContext.Provider>
    );
};

export const useSelectedFilters = () => {
    const context = useContext(SelectedFiltersContext);
    if (!context) {
        throw new Error('useSelectedFilters must be used within a FiltersProvider');
    }
    return context;
};
