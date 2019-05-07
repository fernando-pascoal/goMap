import React, { Component } from "react";
import { Provider } from "react-redux";
import "./config/reactotron";

import Main from "./pages/Main";
import store from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
