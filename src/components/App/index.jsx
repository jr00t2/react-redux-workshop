import React from 'react';
import Header from './Header';
import Routes from 'components/App/Routes';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    );
  }
}
