import React, { createContext, useContext } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({ user, children }) {
    const userValue = user || {};
  return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
}
