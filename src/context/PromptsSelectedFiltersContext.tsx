import React, { createContext, useContext, ReactNode, useState } from 'react';
import { PromptsSelectedFilters } from '../model/PromptsSelectedFilters';

interface PromptsSelectedFiltersContextProps {
    promptsSelectedFilters: PromptsSelectedFilters;
    setPromptsSelectedFilters: React.Dispatch<React.SetStateAction<PromptsSelectedFilters>>;
}

const PromptsSelectedFiltersContext = createContext<PromptsSelectedFiltersContextProps | undefined>(undefined);

export const PromptsSelectedFiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [promptsSelectedFilters, setPromptsSelectedFilters] = useState<PromptsSelectedFilters>(new PromptsSelectedFilters());

    return (
        <PromptsSelectedFiltersContext.Provider value={{ promptsSelectedFilters, setPromptsSelectedFilters }}>
            {children}
        </PromptsSelectedFiltersContext.Provider>
    );
};

export const usePromptsSelectedFilters = () => {
    const context = useContext(PromptsSelectedFiltersContext);
    if (!context) {
        throw new Error('useSelectedFilters must be used within a PromptsSelectedFiltersProvider');
    }
    return context;
};
