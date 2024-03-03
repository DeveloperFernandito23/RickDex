import { createContext, useState } from 'react';

export const PartyContext = createContext();

export const PartyProvider = ({ children }) => {
  const [party, setParty] = useState('-false');

  return (
    <PartyContext.Provider value={{ party, setParty }}>
      {children}
    </PartyContext.Provider>
  );
};