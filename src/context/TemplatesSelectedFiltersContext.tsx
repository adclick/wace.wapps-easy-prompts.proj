import React, { createContext, useContext, ReactNode, useState } from 'react';
import { TemplatesSelectedFilters } from '../model/TemplatesSelectedFilters';

interface TemplatesSelectedFiltersContextProps {
    templatesSelectedFilters: TemplatesSelectedFilters;
    setTemplatesSelectedFilters: React.Dispatch<React.SetStateAction<TemplatesSelectedFilters>>;
}

const TemplatesSelectedFiltersContext = createContext<TemplatesSelectedFiltersContextProps | undefined>(undefined);

export const TemplatesSelectedFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [templatesSelectedFilters, setTemplatesSelectedFilters] = useState<TemplatesSelectedFilters>(new TemplatesSelectedFilters());

    return (
        <TemplatesSelectedFiltersContext.Provider value={{ templatesSelectedFilters, setTemplatesSelectedFilters }}>
            {children}
        </TemplatesSelectedFiltersContext.Provider>
    );
};

export const useTemplatesSelectedFilters = () => {
    const context = useContext(TemplatesSelectedFiltersContext);
    if (!context) {
        throw new Error('useSelectedFilters must be used within a TemplatesSelectedFiltersProvider');
    }
    return context;
};
