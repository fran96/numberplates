import React from "react";
import { Switch } from "react-router-dom";
import { RouteWithLayout } from "./components";
import { Main as MainLayout } from "./layouts";
import { NumberPlatesSearchView } from "./views";
import { CreatorsView } from "./views";
import { CommentsTable } from "./views/NumberPlatesSearchView/components";

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={CommentsTable}
        exact
        layout={MainLayout}
        path="/comments"
      />
      <RouteWithLayout
        component={CreatorsView}
        exact
        layout={MainLayout}
        path="/creators"
      />

      <RouteWithLayout
        component={NumberPlatesSearchView}
        exact
        layout={MainLayout}
      />
    </Switch>
  );
};

export default Routes;
