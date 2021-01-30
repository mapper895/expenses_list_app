import { db } from "./firebaseConfig";

const editExpense = ({ id, category, description, quantity, date }) => {
  return db
    .collection("gastos")
    .doc(id)
    .update({
      categoria: category,
      descripcion: description,
      cantidad: Number(quantity),
      fecha: date,
    });
};

export default editExpense;
