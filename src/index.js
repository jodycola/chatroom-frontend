import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import actionCable from 'actioncable';
import './index.css';

// Create a Action Cable connection
const connection = {}
connection.cable = actionCable.createConsumer(process.env.REACT_APP_WSS)


ReactDOM.render(
  <React.StrictMode>
    <App connection={connection}/>
  </React.StrictMode>,
  document.getElementById('root')
);
