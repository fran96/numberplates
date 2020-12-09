import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout } from "./layouts";

import { NumberPlatesSearchView } from "./views";

const Routes = () => {
	return (
		<Switch>
			<Redirect exact from="/" to="/NumberPlatesSearchView" />
			<RouteWithLayout
				component={NumberPlatesSearchView}
				exact
				layout={MainLayout}
				path="/NumberPlatesSearchView"
			/>
		</Switch>
	);
};

export default Routes;
