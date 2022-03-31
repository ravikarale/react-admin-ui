import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import User from "./containers/User";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/users" component={User} />
            <Route exact path="/" render={(props) => {
              return <Redirect to="/users" />
            }} />
          </Switch>
          <ToastContainer autoClose={4000} draggable={false} />

        </BrowserRouter>
      </Provider>  
    );
  }
}

export default App;
