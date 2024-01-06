import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Request } from '../model/Request';
import { PromptRequest } from '../model/PromptRequest';

interface PromptsRequestsContextProps {
    promptsRequests: PromptRequest[]; 
    setPromptsRequests: React.Dispatch<React.SetStateAction<PromptRequest[]>>;
}

const PromptsRequestsContext = createContext<PromptsRequestsContextProps | undefined>(undefined);

export const PromptsRequestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [promptsRequests, setPromptsRequests] = useState<PromptRequest[]>([]);

    return (
        <PromptsRequestsContext.Provider value={{ promptsRequests, setPromptsRequests }}>
            {children}
        </PromptsRequestsContext.Provider>
    );
};

export const usePromptsRequests = () => {
    const context = useContext(PromptsRequestsContext);
    if (!context) {
        throw new Error('usePromptsRequests must be used within a PromptsRequestsProvider');
    }
    return context;
};
