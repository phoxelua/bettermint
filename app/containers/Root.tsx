import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

interface IRootProps extends React.Props<any> {
    history: any;
    routes: any;
    store: any;
}

const Root = (props: IRootProps) => {
  return (
    <Provider store={props.store}>
      <div style={{ height: "100%" }}>
        <Router history={props.history}>
          {props.routes}
        </Router>
      </div>
    </Provider>
  );
};

export default Root;
