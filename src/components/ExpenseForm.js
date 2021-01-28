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

const ExpenseForm = () => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [category, setCategory] = useState("hogar");
  const [date, setDate] = useState(new Date());
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

    let quantity = parseFloat(quantityInput).toFixed(2);
    AddExpense({
      category: category,
      description: descriptionInput,
      quantity: quantity,
      date: getUnixTime(date),
      uidUser: user.uid,
    });
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
    </Form>
  );
};

export default ExpenseForm;
