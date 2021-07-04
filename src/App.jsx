import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import React from "react";
import MainPage from "./Components/MainPage/MainPage";
import { Redirect } from "react-router-dom";
import EditForm from "./Components/Form/EditForm";

const Container = styled.div`
  width: 50%;
  margin: 100px auto 0 auto;
`

function App() {
  return (
    <Router>
      <Container className="app">
        <Redirect to="/services" />
        <Switch>
            <Route path='/services/:id'>
                <EditForm/>
            </Route>
            <Route path='/services'>
              <MainPage />
            </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;