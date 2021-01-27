import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";
import { useAuth } from "../contexts/AuthContext";

const ExpensesList = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <ReturnBtn />
        <Title>Lista de Gastos</Title>
      </Header>
    </>
  );
};

export default ExpensesList;
