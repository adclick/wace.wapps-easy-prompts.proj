import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Request } from '../model/Request';

interface RequestsContextProps {
    requests: Request[]; 
    setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
}

const RequestsContext = createContext<RequestsContextProps | undefined>(undefined);

export const RequestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [requests, setRequests] = useState<Request[]>([]);

    return (
        <RequestsContext.Provider value={{ requests, setRequests }}>
            {children}
        </RequestsContext.Provider>
    );
};

export const useRequests = () => {
    const context = useContext(RequestsContext);
    if (!context) {
        throw new Error('useRequests must be used within a RequestsProvider');
    }
    return context;
};
