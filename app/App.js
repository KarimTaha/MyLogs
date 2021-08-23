import React from 'react';
import MainNavigation from './navigation';
import {Provider} from 'react-redux';
import redux from './redux';

const App = () => {
  return (
    <Provider store={redux}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
