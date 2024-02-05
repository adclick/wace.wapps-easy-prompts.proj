import React, { createContext, useContext, ReactNode, useState } from 'react';
import { SelectedFilters } from '../models/SelectedFilters';

interface SelectedFiltersContextProps {
    selectedFilters: SelectedFilters;
    setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

const SelectedFiltersContext = createContext<SelectedFiltersContextProps | undefined>(undefined);

export const SelectedFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(new SelectedFilters());

    return (
        <SelectedFiltersContext.Provider value={{ selectedFilters, setSelectedFilters }}>
            {children}
        </SelectedFiltersContext.Provider>
    );
};

export const useSelectedFilters = () => {
    const context = useContext(SelectedFiltersContext);
    if (!context) {
        throw new Error('useSelectedFilters must be used within a SelectedFiltersProvider');
    }
    return context;
};
