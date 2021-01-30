import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FilterContainer,
  Form,
  Input,
  BigInput,
  BotonContainer,
} from "../elements/FormElements";
import Alert from "../elements/Alert";
import { Boton } from "../elements/Boton";
import { ReactComponent as PlusIcon } from "../img/plus.svg";
import SelectCategories from "./SelectCategories";
import DatePicker from "./DatePicker";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import AddExpense from "../firebase/AddExpense";
import editExpense from "../firebase/editExpense";

const ExpenseForm = ({ expense }) => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [category, setCategory] = useState("hogar");
  const [date, setDate] = useState(new Date());
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    // Check if there´s any expense
    // Set all the State with the expense values
    if (expense) {
      // Check if the expense is the actual user´s
      // We check the uid saved with the user uid´s
      if (expense.data().uidUsuario === user.uid) {
        setCategory(expense.data().categoria);
        setDate(fromUnixTime(expense.data().fecha));
        setDescriptionInput(expense.data().descripcion);
        setQuantityInput(expense.data().cantidad);
      } else {
        history.push("/lista");
      }
    }
  }, [expense, user, history]);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setDescriptionInput(e.target.value);
    } else if (e.target.name === "quantity") {
      setQuantityInput(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Transform the quantity into a number and 2 decimals
    let quantity = parseFloat(quantityInput).toFixed(2);

    // Check if there´s description and value
    if (descriptionInput !== "" && quantityInput !== "") {
      if (quantity) {
        if (expense) {
          editExpense({
            id: expense.id,
            category: category,
            description: descriptionInput,
            quantity: quantity,
            date: getUnixTime(date),
          })
            .then(() => history.push("/lista"))
            .catch((error) => console.log(error));
        } else {
          AddExpense({
            category: category,
            description: descriptionInput,
            quantity: quantity,
            date: getUnixTime(date),
            uidUser: user.uid,
          })
            .then(() => {
              setCategory("hogar");
              setDescriptionInput("");
              setQuantityInput("");
              setDate(new Date());

              setAlertState(true);
              setAlert({
                type: "success",
                message: "El gasto fue agregado correctamente",
              });
            })
            .catch((error) => {
              setAlertState(true);
              setAlert({
                type: "error",
                message: "Hubo un problema al intentar agregar tu gasto",
              });
            });
        }
      } else {
        setAlertState(true);
        setAlert({
          type: "error",
          message: "El valor que ingresaste no es correcto",
        });
      }
    } else {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Por favor rellena todos los campos",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FilterContainer>
        <SelectCategories category={category} setCategory={setCategory} />
        <DatePicker date={date} setDate={setDate} />
      </FilterContainer>
      <div>
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Descripción del gasto"
          value={descriptionInput}
          onChange={handleChange}
        />
        <BigInput
          type="text"
          name="quantity"
          id="quantity"
          placeholder="$0.00"
          value={quantityInput}
          onChange={handleChange}
        />
      </div>
      <BotonContainer>
        <Boton as="button" primary withIcon type="submit">
          {expense ? "Editar gasto" : "Agregar gasto"}
          <PlusIcon />
        </Boton>
      </BotonContainer>
      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </Form>
  );
};

export default ExpenseForm;
