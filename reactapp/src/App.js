import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import Routes from "./Routes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

const browserHistory = createBrowserHistory();

export default class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Router history={browserHistory}>
					<Routes />
				</Router>
			</ThemeProvider>
		);
	}
}
