import { db } from "./firebaseConfig";

const AddExpense = ({ category, description, quantity, date, uidUser }) => {
  return db.collection("gastos").add({
    categoria: category,
    descripcion: description,
    cantidad: quantity,
    fecha: date,
    uidUsuario: uidUser,
  });
};

export default AddExpense;
