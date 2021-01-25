import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Boton } from "../elements/Boton";
import { Form, Input, BotonContainer } from "../elements/FormElements";
import { ReactComponent as SvgLogin } from "../img/registro.svg";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import Alert from "../elements/Alert";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      default:
        break;
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
    if (email === "" || password === "" || password2 === "") {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Por favor llene todos los datos",
      });
      return;
    }
    if (password !== password2) {
      setAlertState(true);
      setAlert({
        type: "error",
        message: "Las contraseñas no son iguales",
      });
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (e) {
      setAlertState(true);

      let message;
      switch (e.code) {
        case "auth/invalid-password":
          message = "La contraseña debe de ser de al menos 6 caracteres";
          break;
        case "auth/email-already-in-use":
          message =
            "Ya existe una cuenta con el correo electrónico proporcionado.";
          break;
        case "auth/invalid-email":
          message = "El correo electrónico no es válido.";
          break;
        default:
          message = "Hubo un error al intentar crear la cuenta.";
          break;
      }
      setAlert({ type: "error", message: message });
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear cuenta</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Crear Cuenta</Title>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
        <Input
          type="password"
          name="password2"
          placeholder="Repetir la contraseña"
          value={password2}
          onChange={handleChange}
        />
        <BotonContainer>
          <Boton as="button" primary type="submit">
            Crear Cuenta
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
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

export default SignUp;
