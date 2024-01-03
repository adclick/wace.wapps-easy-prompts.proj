import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Request } from '../model/Request';
import { useAuth0 } from '@auth0/auth0-react';

interface UserRequestContextProps {
    userRequest: Request;
    setUserRequest: React.Dispatch<React.SetStateAction<Request>>;
}

const UserRequestContext = createContext<UserRequestContextProps | undefined>(undefined);

export const UserRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userRequest, setUserRequest] = useState<Request>(new Request());

    return (
        <UserRequestContext.Provider value={{ userRequest, setUserRequest }}>
            {children}
        </UserRequestContext.Provider>
    );
};

export const useUserRequest = () => {
    const context = useContext(UserRequestContext);
    if (!context) {
        throw new Error('useUserRequest must be used within a userRequestProvider');
    }
    return context;
};
