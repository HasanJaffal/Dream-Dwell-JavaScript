/* eslint-disable react/prop-types */
// MyProvider.jsx
import { useState } from 'react';
import UserContext from './UserContext'

const MyProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('userData'));

    const updateUser = (newValue) => {
        console.log('Updating user with:', newValue);
        setUser({newValue });
    };


    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default MyProvider;
