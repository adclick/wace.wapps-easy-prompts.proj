import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Thread } from '../model/Thread';

interface ThreadsContextProps {
    threads: Thread[]; 
    setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
}

const ThreadsContext = createContext<ThreadsContextProps | undefined>(undefined);

export const ThreadsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [threads, setThreads] = useState<Thread[]>([]);

    return (
        <ThreadsContext.Provider value={{ threads, setThreads }}>
            {children}
        </ThreadsContext.Provider>
    );
};

export const useThreads = () => {
    const context = useContext(ThreadsContext);
    if (!context) {
        throw new Error('useThreads must be used within a ThreadsProvider');
    }
    return context;
};
