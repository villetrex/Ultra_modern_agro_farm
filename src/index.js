import React from "react";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

// Redux
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

const renderApp = () =>
  render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant,
           consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>,
      document.querySelector("#root"),
  );

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

if (process.env.NODE_ENV !== "production") {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
