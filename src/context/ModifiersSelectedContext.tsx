import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Modifier } from '../model/Modifier';

interface ModifiersSelectedContextProps {
    modifiersSelected: Modifier[];
    setModifiersSelected: React.Dispatch<React.SetStateAction<Modifier[]>>;
}

const ModifiersSelectedContext = createContext<ModifiersSelectedContextProps | undefined>(undefined);

export const ModifiersSelectedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modifiersSelected, setModifiersSelected] = useState<Modifier[]>([]);

    return (
        <ModifiersSelectedContext.Provider value={{ modifiersSelected, setModifiersSelected }}>
            {children}
        </ModifiersSelectedContext.Provider>
    );
};

export const useModifiersSelected = () => {
    const context = useContext(ModifiersSelectedContext);
    if (!context) {
        throw new Error('useModifiersSelected must be used within a ModifiersSelectedProvider');
    }
    return context;
};
