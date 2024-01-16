import React, { createContext, useContext, ReactNode, useState } from 'react';
import { PromptMode } from '../model/PromptMode';

interface PromptModeContextProps {
    promptMode: PromptMode; 
    setPromptMode: React.Dispatch<React.SetStateAction<PromptMode>>;
}

const PromptModeContext = createContext<PromptModeContextProps | undefined>(undefined);

export const PromptModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [promptMode, setPromptMode] = useState<PromptMode>(PromptMode.Text);

    return (
        <PromptModeContext.Provider value={{ promptMode, setPromptMode }}>
            {children}
        </PromptModeContext.Provider>
    );
};

export const usePromptMode = () => {
    const context = useContext(PromptModeContext);
    if (!context) {
        throw new Error('usePromptMode must be used within a PromptModeProvider');
    }
    return context;
};
