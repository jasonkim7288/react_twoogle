import React, { createContext, useState } from 'react'

const TwootsContext = createContext();

const TwootsProvider = ({ children }) => {
  const [twoots, setTwoots] = useState(null);

  return (
    <TwootsContext.Provider value={[twoots, setTwoots]}>
      {children}
    </TwootsContext.Provider>
  );
}

export { TwootsContext, TwootsProvider };
