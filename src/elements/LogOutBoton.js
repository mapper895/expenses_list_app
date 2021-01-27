import React from "react";
import { ReactComponent as LogOutIcon } from "../img/log-out.svg";
import { Boton } from "./Boton";
import { auth } from "../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const LogOutBoton = () => {
  const history = useHistory();

  const logOut = async () => {
    try {
      await auth.signOut();
      history.push("/iniciar-sesion");
    } catch (e) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <Boton bigIcon as="button" onClick={logOut}>
      <LogOutIcon />
    </Boton>
  );
};

export default LogOutBoton;
