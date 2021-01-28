import React, { useState } from "react";
import {
  FilterContainer,
  Form,
  Input,
  BigInput,
  BotonContainer,
} from "../elements/FormElements";
import { Boton } from "../elements/Boton";
import { ReactComponent as PlusIcon } from "../img/plus.svg";
import SelectCategories from "./SelectCategories";
import DatePicker from "./DatePicker";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import AddExpense from "../firebase/AddExpense";
import { useAuth } from "../contexts/AuthContext";
import Alert from "../elements/Alert";

const ExpenseForm = () => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [category, setCategory] = useState("hogar");
  const [date, setDate] = useState(new Date());
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const { user } = useAuth();

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
          Agregar Gasto <PlusIcon />
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
