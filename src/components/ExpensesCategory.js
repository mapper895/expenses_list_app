import React from "react";
import {
  Header,
  Title,
  HeaderContainer,
  BotonContainer,
} from "../elements/Header";
import { Helmet } from "react-helmet";

const CategoryExpenses = () => {
  return (
    <>
      <Helmet>
        <title>Gastos por Categoría</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Gastos por Categoría</Title>
        </HeaderContainer>
      </Header>
    </>
  );
};

export default CategoryExpenses;
