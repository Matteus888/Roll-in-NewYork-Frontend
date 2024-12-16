import React, { createContext, useContext, useState } from "react";

// Contexte pour gérer les pop-ups
const PopupContext = createContext();
const PlanDayContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePopupId, setActivePopupId] = useState(null); // Pour les pop-ups
  const [isPlanDay, setIsPlanDay] = useState(false); // Pour le mode Plan My Day

  return (
    <PopupContext.Provider value={{ activePopupId, setActivePopupId }}>
      <PlanDayContext.Provider value={{ isPlanDay, setIsPlanDay }}>
        {children}
      </PlanDayContext.Provider>
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => useContext(PopupContext);
export const usePlanDayContext = () => useContext(PlanDayContext);