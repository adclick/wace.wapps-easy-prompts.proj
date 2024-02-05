import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Modifier } from '../models/Modifier';

interface SelectedModifiersContextProps {
    selectedModifiers: Modifier[];
    setSelectedModifiers: React.Dispatch<React.SetStateAction<Modifier[]>>;
}

const SelectedModifiersContext = createContext<SelectedModifiersContextProps | undefined>(undefined);

export const SelectedModifiersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedModifiers, setSelectedModifiers] = useState<Modifier[]>([]);

    return (
        <SelectedModifiersContext.Provider value={{ selectedModifiers: selectedModifiers, setSelectedModifiers: setSelectedModifiers }}>
            {children}
        </SelectedModifiersContext.Provider>
    );
};

export const useSelectedModifiers = () => {
    const context = useContext(SelectedModifiersContext);
    if (!context) {
        throw new Error('useSelectedModifiers must be used within a SelectedModifiersProvider');
    }
    return context;
};
