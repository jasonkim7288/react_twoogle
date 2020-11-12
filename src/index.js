import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AllContextsProvider from './contexts/AllContexts';

ReactDOM.render(
  <AllContextsProvider>
    <App />
  </AllContextsProvider>
  , document.getElementById('root')
);