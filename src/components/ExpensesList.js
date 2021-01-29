import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";
import TotalExpensesBar from "./TotalExpensesBar";
import useGetExpenses from "../hooks/useGetExpenses";

const ExpensesList = () => {
  const { expenses } = useGetExpenses();

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <ReturnBtn />
        <Title>Lista de Gastos</Title>
      </Header>
      <TotalExpensesBar />
    </>
  );
};

export default ExpensesList;
