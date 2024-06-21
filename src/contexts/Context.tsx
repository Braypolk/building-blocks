import React, { createContext, useContext, useState } from 'react';

// Create the context with a default value
const HabitContext = createContext(null);

export const useHabitContext = () => useContext(HabitContext);

export const ContextProvider = ({ children }) => {
  const [habitList, setHabitList] = useState([
    {
        "id": 1,
        "finalGoal": "test",
        "steps": [],
        "selectedDays": [
            false,
            false,
            false,
            true,
            false,
            false,
            false
        ],
        "reminder": false,
        "habitTimes": [],
        "financialIncentive": {
            "active": false,
            "amount": 0,
            "lockTimeNumber": 0,
            "lockTimeType": "day"
        }
    }
]);

  return (
    <HabitContext.Provider value={{ habitList, setHabitList }}>
      {children}
    </HabitContext.Provider>
  );
};