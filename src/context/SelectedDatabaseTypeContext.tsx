import React, { createContext, useContext, ReactNode, useState } from 'react';
import { SelectedDatabaseType } from '../model/SelectedDatabaseType';

interface SelectedDatabaseTypeContextProps {
    selectedDatabaseType: SelectedDatabaseType;
    setSelectedDatabaseType: React.Dispatch<React.SetStateAction<SelectedDatabaseType>>;
}

const SelectedDatabaseTypeContext = createContext<SelectedDatabaseTypeContextProps | undefined>(undefined);

export const SelectedDatabaseTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDatabaseType, setSelectedDatabaseType] = useState<SelectedDatabaseType>(new SelectedDatabaseType());

    return (
        <SelectedDatabaseTypeContext.Provider value={{ selectedDatabaseType, setSelectedDatabaseType }}>
            {children}
        </SelectedDatabaseTypeContext.Provider>
    );
};

export const useSelectedDatabaseType = () => {
    const context = useContext(SelectedDatabaseTypeContext);
    if (!context) {
        throw new Error('useSelectedDatabaseType must be used within a SelectedDatabaseTypeProvider');
    }
    return context;
};
