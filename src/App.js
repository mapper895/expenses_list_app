import React from "react";
import { Helmet } from "react-helmet";
import {
  Header,
  Title,
  HeaderContainer,
  BotonContainer,
} from "./elements/Header";
import { Boton } from "./elements/Boton";
import LogOutBoton from "./elements/LogOutBoton";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Agregar Gasto</Title>
          <BotonContainer>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <LogOutBoton />
          </BotonContainer>
        </HeaderContainer>
      </Header>
    </>
  );
};

export default App;
