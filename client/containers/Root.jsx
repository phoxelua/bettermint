import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <div style={{ height: '100%' }}>
        <Router history={props.history}>
          {props.routes}
        </Router>
      </div>
    </Provider>
  );
};

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;
