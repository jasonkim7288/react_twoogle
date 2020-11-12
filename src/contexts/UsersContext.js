import React, { createContext, useEffect, useState } from 'react'
import initialUser from '../data/initialUser.json'

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setUsers(initialUser);
  }, [])

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
