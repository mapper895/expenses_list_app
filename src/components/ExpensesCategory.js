import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";
import TotalExpensesBar from "./TotalExpensesBar";

const CategoryExpenses = () => {
  return (
    <>
      <Helmet>
        <title>Gastos por Categoría</title>
      </Helmet>

      <Header>
        <ReturnBtn />
        <Title>Gastos por Categoría</Title>
      </Header>
      <TotalExpensesBar />
    </>
  );
};

export default CategoryExpenses;
