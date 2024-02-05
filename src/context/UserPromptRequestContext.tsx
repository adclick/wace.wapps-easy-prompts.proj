import React, { createContext, useContext, ReactNode, useState } from 'react';
import { PromptRequest } from '../models/PromptRequest';

interface UserPromptRequestContextProps {
    userPromptRequest: PromptRequest;
    setUserPromptRequest: React.Dispatch<React.SetStateAction<PromptRequest>>;
}

const UserPromptRequestContext = createContext<UserPromptRequestContextProps | undefined>(undefined);

export const UserPromptRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userPromptRequest, setUserPromptRequest] = useState<PromptRequest>(new PromptRequest());

    return (
        <UserPromptRequestContext.Provider value={{ userPromptRequest, setUserPromptRequest }}>
            {children}
        </UserPromptRequestContext.Provider>
    );
};

export const useUserPromptRequest = () => {
    const context = useContext(UserPromptRequestContext);
    if (!context) {
        throw new Error('useUserPromptRequest must be used within a userPromptRequestProvider');
    }
    return context;
};
