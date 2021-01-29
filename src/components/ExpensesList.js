import React from "react";
import { Link } from "react-router-dom";
import { Header, Title } from "../elements/Header";
import { Helmet } from "react-helmet";
import ReturnBtn from "../elements/ReturnBtn";
import TotalExpensesBar from "./TotalExpensesBar";
import useGetExpenses from "../hooks/useGetExpenses";
import {
  List,
  ListElement,
  Category,
  Description,
  Value,
  Date,
  BotonContainer,
  ActionBoton,
  LoadMoreBoton,
  CentralBotonContainer,
  SubtitleContainer,
  Subtitle,
} from "../elements/ListElements";
import CategoryIcon from "../elements/CategoryIcon";
import ConvertToCurrent from "../functions/ConvertToCurrency";
import { ReactComponent as EditIcon } from "../img/editar.svg";
import { ReactComponent as DeleteIcon } from "../img/borrar.svg";
import { Boton } from "../elements/Boton";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";

const ExpensesList = () => {
  const [expenses, getMoreExpenses, moreToLoad] = useGetExpenses();

  const formatDate = (date) => {
    if (date) {
      return format(fromUnixTime(date), "dd 'de' MMMM 'de' yyyy", {
        locale: es,
      });
    }
  };

  const isEqualDate = (expenses, index, expense) => {
    if (index !== 0) {
      const actualDate = formatDate(expense.fecha);
      const previousExpenseDate = formatDate(expenses[index - 1].fecha);

      if (actualDate === previousExpenseDate) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <ReturnBtn />
        <Title>Lista de Gastos</Title>
      </Header>

      <List>
        {expenses.map((expense, index) => (
          <div key={index}>
            {!isEqualDate(expenses, index, expense) && (
              <Date>{formatDate(expense.fecha)}</Date>
            )}

            <ListElement key={expense.id}>
              <Category>
                <CategoryIcon id={expense.categoria} />
                {expense.categoria}
              </Category>

              <Description>{expense.descripcion}</Description>
              <Value>
                {expense.cantidad ? ConvertToCurrent(expense.cantidad) : ""}
              </Value>

              <BotonContainer>
                <ActionBoton as={Link} to={`/editar/${expense.id}`}>
                  <EditIcon />
                </ActionBoton>
                <ActionBoton>
                  <DeleteIcon />
                </ActionBoton>
              </BotonContainer>
            </ListElement>
          </div>
        ))}

        {moreToLoad && (
          <CentralBotonContainer>
            <LoadMoreBoton onClick={() => getMoreExpenses()}>
              Cargar más
            </LoadMoreBoton>
          </CentralBotonContainer>
        )}

        {expenses.length === 0 && (
          <SubtitleContainer>
            <Subtitle>No hay gastos por mostrar</Subtitle>
            <Boton as={Link} to="/">
              Agregar Gasto
            </Boton>
          </SubtitleContainer>
        )}
      </List>

      <TotalExpensesBar />
    </>
  );
};

export default ExpensesList;
