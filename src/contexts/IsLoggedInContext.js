import React, { createContext, useState } from 'react'

const IsLoggedInContext = createContext();

const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </IsLoggedInContext.Provider>
  );
}

export { IsLoggedInContext, IsLoggedInProvider };
