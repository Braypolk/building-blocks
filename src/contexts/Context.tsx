import React, { createContext, useContext, useState } from 'react';

// Create the context with a default value
const HabitContext = createContext(null);

export const useHabitContext = () => useContext(HabitContext);

export const ContextProvider = ({ children }) => {
  const [habitList, setHabitList] = useState([
    {
      "id": 3,
      "finalGoal": "test",
      "steps": [
        "test"
      ],
      "selectedDays": [
        false,
        false,
        false,
        false,
        true,
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
    },
    {
      "id": 2,
      "finalGoal": "thing",
      "steps": [
        "one",
        "more",
        "step",
        "thing"
      ],
      "selectedDays": [
        false,
        false,
        true,
        true,
        false,
        false,
        false
      ],
      "reminder": true,
      "habitTimes": [
        "2024-06-24T09:46:00"
      ],
      "financialIncentive": {
        "active": true,
        "amount": "1",
        "lockTimeNumber": 1,
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