import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Boton } from "../elements/Boton";
import { Form, Input, BotonContainer } from "../elements/FormElements";
import { ReactComponent as SvgLogin } from "../img/registro.svg";
import styled from "styled-components";

const SignUp = () => {
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

      <Form>
        <Svg />
        <Input type="email" name="email" placeholder="Correo Electronico" />
        <Input type="password" name="password" placeholder="Contraseña" />
        <Input
          type="password"
          name="password2"
          placeholder="Repetir la contraseña"
        />
      </Form>
      <BotonContainer>
        <Boton as="button" primary type="submit">
          Crear Cuenta
        </Boton>
      </BotonContainer>
    </>
  );
};

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

export default SignUp;
