import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Template } from '../model/Template';

interface SelectedTemplatesContextProps {
    selectedTemplates: Template[];
    setSelectedTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

const SelectedTemplatesContext = createContext<SelectedTemplatesContextProps | undefined>(undefined);

export const SelectedTemplatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([]);

    return (
        <SelectedTemplatesContext.Provider value={{ selectedTemplates: selectedTemplates, setSelectedTemplates: setSelectedTemplates }}>
            {children}
        </SelectedTemplatesContext.Provider>
    );
};

export const useSelectedTemplates = () => {
    const context = useContext(SelectedTemplatesContext);
    if (!context) {
        throw new Error('useSelectedTemplates must be used within a SelectedTemplatesProvider');
    }
    return context;
};
