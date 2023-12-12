import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Options } from '../model/Options';

interface OptionsContextProps {
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
}

const OptionsContext = createContext<OptionsContextProps | undefined>(undefined);

export const OptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [options, setOptions] = useState<Options>(new Options());

    return (
        <OptionsContext.Provider value={{ options, setOptions }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptions = () => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptions must be used within a OptionsProvider');
    }
    return context;
};
