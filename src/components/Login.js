import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Boton } from "../elements/Boton";
import { Form, Input, BotonContainer } from "../elements/FormElements";
import { ReactComponent as SvgLogin } from "../img/login.svg";
import styled from "styled-components";

const Login = () => {
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

      <Form>
        <Svg />
        <Input type="email" name="email" placeholder="Correo Electronico" />
        <Input type="password" name="password" placeholder="Contraseña" />
      </Form>
      <BotonContainer>
        <Boton as="button" primary type="submit">
          Iniciar Sesion
        </Boton>
      </BotonContainer>
    </>
  );
};

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`;

export default Login;
