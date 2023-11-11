import React, { createContext, useState } from 'react'


export let UserDetailsContext = createContext(null)


function UserContext({ children }) {

    let [user, setUser] = useState({ status: false, userId: '', username: '', email: '' });

    return (
        <UserDetailsContext.Provider value={{ user, setUser }}>
            {children}
        </ UserDetailsContext.Provider>

    )
}

export default UserContext;