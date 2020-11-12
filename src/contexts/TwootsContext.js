import React, { createContext, useEffect, useState } from 'react'
import jsonInitialTwoots from '../data/initialTwoots.json'

const TwootsContext = createContext();

const TwootsProvider = ({ children }) => {
  const [twoots, setTwoots] = useState(null);

  useEffect(() => {
    setTwoots(jsonInitialTwoots);
  }, [])

  return (
    <TwootsContext.Provider value={[twoots, setTwoots]}>
      {children}
    </TwootsContext.Provider>
  );
}

export { TwootsContext, TwootsProvider };
