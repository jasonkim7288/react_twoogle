import React, { createContext, useEffect, useState } from 'react'

const IsLoggedInContext = createContext();

const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  }, [])

  return (
    <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </IsLoggedInContext.Provider>
  );
}

export { IsLoggedInContext, IsLoggedInProvider };
