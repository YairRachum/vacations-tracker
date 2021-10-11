import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "../register/Register";
import Login from "../login/Login";
import NavBar from "../navBar/NavBar";
import UserVacations from "../vacations/Vacations";
import Chart from "../Chart/Chart";

function Layout() {


  return (
    <BrowserRouter>
      <section className="layout">
        <main>
          <Switch>
            <Route path="/home">
              <NavBar />
              <UserVacations />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/chart">
              <NavBar />
              <Chart />
            </Route>

            <Redirect from="/" to="/login" exact />
          </Switch>
        </main>
      </section>
    </BrowserRouter>
  );
}

export default Layout;