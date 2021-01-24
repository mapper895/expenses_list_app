import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";

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
    </>
  );
};

export default CategoryExpenses;
