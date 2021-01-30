import { useState, useEffect } from "react";
import useGetMonthExpenses from "./useGetMonthExpenses";

const useGetCategoryMonthExpenses = () => {
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const expenses = useGetMonthExpenses();

  useEffect(() => {
    const expensesSum = expenses.reduce(
      (resultingObject, currentObject) => {
        const currentCategory = currentObject.categoria;
        const currentQuantity = currentObject.cantidad;

        resultingObject[currentCategory] += currentQuantity;

        return resultingObject;
      },
      {
        comida: 0,
        "cuentas y pagos": 0,
        hogar: 0,
        transporte: 0,
        ropa: 0,
        "salud e higiene": 0,
        compras: 0,
        diversion: 0,
      }
    );

    setCategoryExpenses(
      Object.keys(expensesSum).map((element) => {
        return { categoria: element, cantidad: expensesSum[element] };
      })
    );
  }, [expenses]);

  return categoryExpenses;
};

export default useGetCategoryMonthExpenses;
