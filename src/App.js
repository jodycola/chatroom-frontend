import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { authenticateUserFetch } from './services/Requests';
import Join from './components/Join';
import Chat from './components/Chat';

export default function App() {

  // States and variables
  const [currentUser, setCurrentUser] = useState(null);

  // Sets current user local storage token
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      authenticateUserFetch(token).then(setCurrentUser)
    }
  }, [])

  return (
    <Router>
        <Route exact path="/">
          <Join
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/chat">
          <Chat
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
    </Router>
  );
}