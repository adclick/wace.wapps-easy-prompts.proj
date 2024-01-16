import React, { createContext, useContext, ReactNode, useState } from 'react';
import { ModifiersSelectedFilters } from '../model/ModifiersSelectedFilters';

interface ModifiersSelectedFiltersContextProps {
    modifiersSelectedFilters: ModifiersSelectedFilters;
    setModifiersSelectedFilters: React.Dispatch<React.SetStateAction<ModifiersSelectedFilters>>;
}

const ModifiersSelectedFiltersContext = createContext<ModifiersSelectedFiltersContextProps | undefined>(undefined);

export const ModifiersSelectedFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modifiersSelectedFilters, setModifiersSelectedFilters] = useState<ModifiersSelectedFilters>(new ModifiersSelectedFilters());

    return (
        <ModifiersSelectedFiltersContext.Provider value={{ modifiersSelectedFilters, setModifiersSelectedFilters }}>
            {children}
        </ModifiersSelectedFiltersContext.Provider>
    );
};

export const useModifiersSelectedFilters = () => {
    const context = useContext(ModifiersSelectedFiltersContext);
    if (!context) {
        throw new Error('useSelectedFilters must be used within a ModifiersSelectedFiltersProvider');
    }
    return context;
};
