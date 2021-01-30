import React, { useState, useEffect, useContext } from "react";
import useGetMonthExpenses from "../hooks/useGetMonthExpenses";

const TotalSpentContext = React.createContext();

const useTotalMonth = () => useContext(TotalSpentContext);

const TotalSpentProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const expenses = useGetMonthExpenses();

  useEffect(() => {
    let accumulated = 0;
    expenses.forEach((expense) => {
      accumulated += expense.cantidad;
    });

    setTotal(accumulated);
  }, [expenses]);

  return (
    <TotalSpentContext.Provider value={{ total: total }}>
      {children}
    </TotalSpentContext.Provider>
  );
};

export { TotalSpentProvider, useTotalMonth };
