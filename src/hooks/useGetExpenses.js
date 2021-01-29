import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const useGetExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([1, 2, 3]);

  useEffect(() => {
    const unsuscribe = db
      .collection("gastos")
      .where("uidUsuario", "==", user.uid)
      .orderBy("fecha", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setExpenses(
          snapshot.docs.map((expense) => {
            return { ...expense.data(), id: expense.id };
          })
        );
      });

    return unsuscribe;
  }, [user]);
  return [expenses];
};

export default useGetExpenses;
