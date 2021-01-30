import React from "react";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";
import TotalExpensesBar from "./TotalExpensesBar";
import useGetCategoryMonthExpenses from "../hooks/useGetCategoryMonthExpenses";
import {
  CategoryList,
  CategoryListElements,
  Category,
  Value,
} from "../elements/ListElements";
import CategoryIcon from "../elements/CategoryIcon";
import ConvertToCurrency from "../functions/ConvertToCurrency";

const CategoryExpenses = () => {
  const categoryExpenses = useGetCategoryMonthExpenses();

  return (
    <>
      <Helmet>
        <title>Gastos por Categoría</title>
      </Helmet>

      <Header>
        <ReturnBtn />
        <Title>Gastos por Categoría</Title>
      </Header>

      <CategoryList>
        {categoryExpenses.map((element, index) => (
          <CategoryListElements key={index}>
            <Category>
              <CategoryIcon id={element.categoria} /> {element.categoria}
            </Category>
            <Value>{ConvertToCurrency(element.cantidad)}</Value>
          </CategoryListElements>
        ))}
      </CategoryList>

      <TotalExpensesBar />
    </>
  );
};

export default CategoryExpenses;
