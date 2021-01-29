import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const useGetExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([1, 2, 3]);
  const [lastExpense, setLastExpense] = useState(null);
  const [moreToLoad, setMoreToLoad] = useState(false);

  const getMoreExpenses = () => {
    db.collection("gastos")
      .where("uidUsuario", "==", user.uid)
      .orderBy("fecha", "desc")
      .limit(10)
      .startAfter(lastExpense)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setLastExpense(snapshot.docs[snapshot.docs.length - 1]);

          setExpenses(
            expenses.concat(
              snapshot.docs.map((expense) => {
                return { ...expense.data(), id: expense.id };
              })
            )
          );
        } else {
          setMoreToLoad(false);
        }
      });
  };

  useEffect(() => {
    const unsuscribe = db
      .collection("gastos")
      .where("uidUsuario", "==", user.uid)
      .orderBy("fecha", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
          setMoreToLoad(true);
        } else {
          setMoreToLoad(false);
        }
        setExpenses(
          snapshot.docs.map((expense) => {
            return { ...expense.data(), id: expense.id };
          })
        );
      });

    return unsuscribe;
  }, [user]);

  return [expenses, getMoreExpenses, moreToLoad];
};

export default useGetExpenses;
