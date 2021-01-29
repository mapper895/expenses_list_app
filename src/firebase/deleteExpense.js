import { db } from "./firebaseConfig";

const deleteExpense = (id) => {
  db.collection("gastos").doc(id).delete();
};

export default deleteExpense;
