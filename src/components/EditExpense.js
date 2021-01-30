import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";
import TotalExpensesBar from "./TotalExpensesBar";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import useGetExpense from "../hooks/useGetExpense";

const EditExpense = () => {
  const { id } = useParams();
  const [expense] = useGetExpense(id);

  return (
    <>
      <Helmet>
        <title>Editar Gasto</title>
      </Helmet>

      <Header>
        <ReturnBtn rute="/lista" />
        <Title>Editar Gasto</Title>
      </Header>
      <ExpenseForm expense={expense} />
      <TotalExpensesBar />
    </>
  );
};

export default EditExpense;
