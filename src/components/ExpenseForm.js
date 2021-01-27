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

const ExpenseForm = () => {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [category, setCategory] = useState("hogar");

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setDescriptionInput(e.target.value);
    } else if (e.target.name === "quantity") {
      setQuantityInput(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  return (
    <Form>
      <FilterContainer>
        <SelectCategories category={category} setCategory={setCategory} />
        <p>Date Picker</p>
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
