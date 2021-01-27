import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import { Container } from "./elements/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditExpense from "./components/EditExpense";
import ExpensesCategory from "./components/ExpensesCategory";
import ExpensesList from "./components/ExpensesList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Helmet } from "react-helmet";
import favicon from "./img/logo.png";
import Background from "./elements/Background";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

WebFont.load({
  google: {
    // Work+Sans:wght@400;500;700
    families: ["Work Sans: 400,500,700", "sans-serif"],
  },
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Container>
            <Switch>
              <Route path="/iniciar-sesion" component={Login} />
              <Route path="/crear-cuenta" component={SignUp} />
              <PrivateRoute path="/categorias">
                <ExpensesCategory />
              </PrivateRoute>
              <PrivateRoute path="/lista">
                <ExpensesList />
              </PrivateRoute>
              <PrivateRoute path="/editar/:id">
                <EditExpense />
              </PrivateRoute>
              <PrivateRoute path="/">
                <App />
              </PrivateRoute>
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>

      <Background />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
