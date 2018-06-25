import React from 'react';

export class UserProductAuth extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <Route
        {...props}
        render={props => (
          this.state.authenticated ?
            <Component {...props} /> :
            <Redirect to="/login" />
        )}
      />
    );
  }
}
