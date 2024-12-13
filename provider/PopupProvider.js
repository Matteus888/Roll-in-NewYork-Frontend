import React, { createContext, useContext, useState } from "react";

// Contexte pour gérer les pop-ups
const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [activePopupId, setActivePopupId] = useState(null);

  return (
    <PopupContext.Provider value={{ activePopupId, setActivePopupId }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => useContext(PopupContext);