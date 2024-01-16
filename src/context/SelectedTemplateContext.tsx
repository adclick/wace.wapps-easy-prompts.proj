import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Template } from '../model/Template';

interface SelectedTemplateContextProps {
    selectedTemplate: Template;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<Template>>;
}

const SelectedTemplateContext = createContext<SelectedTemplateContextProps | undefined>(undefined);

export const SelectedTemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template>(new Template());

    return (
        <SelectedTemplateContext.Provider value={{ selectedTemplate: selectedTemplate, setSelectedTemplate: setSelectedTemplate }}>
            {children}
        </SelectedTemplateContext.Provider>
    );
};

export const useSelectedTemplate = () => {
    const context = useContext(SelectedTemplateContext);
    if (!context) {
        throw new Error('useSelectedTemplates must be used within a SelectedTemplatesProvider');
    }
    return context;
};
