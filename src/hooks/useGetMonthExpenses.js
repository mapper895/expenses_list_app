import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { endOfMonth, getUnixTime, startOfMonth } from "date-fns";
import { useAuth } from "../contexts/AuthContext";

const useGetMonthExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const unsuscribe = db
        .collection("gastos")
        .orderBy("fecha", "desc")
        .where("fecha", ">=", getUnixTime(startOfMonth(new Date())))
        .where("fecha", "<=", getUnixTime(endOfMonth(new Date())))
        .where("uidUsuario", "==", user.uid)
        .onSnapshot((snapshot) => {
          setExpenses(
            snapshot.docs.map((document) => {
              return { ...document.data(), id: document.id };
            })
          );
        });
      return unsuscribe;
    }
  }, [user]);

  return [expenses];
};

export default useGetMonthExpenses;
