import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Boton } from "../elements/Boton";
import { Form, Input, BotonContainer } from "../elements/FormElements";
import { ReactComponent as SvgLogin } from "../img/login.svg";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import Alert from "../elements/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertState(false);
    setAlert({});

    // We check on the client side if the email is valid.
    const regularExpression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!regularExpression.test(email)) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Por favor ingrese un correo válido",
      });
      return;
    }
    if (email === "" || password === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Por favor llene todos los datos",
      });
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (e) {
      setAlertState(true);

      let message;
      switch (e.code) {
        case "auth/wrong-password":
          message = "La contraseña no es correcta.";
          break;
        case "auth/user-not-found":
          message = "No se encontró ninguna cuenta con ese correo.";
          break;
        default:
          message = "Hubo un error al intentar iniciar sesión.";
          break;
      }
      setAlert({ type: "error", message: message });
    }
  };
  return (
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Iniciar Sesion</Title>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </HeaderContainer>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <BotonContainer>
          <Boton as="button" primary type="submit">
            Iniciar Sesion
          </Boton>
        </BotonContainer>
      </Form>
      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        setAlertState={setAlertState}
      />
    </>
  );
};

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`;

export default Login;
