import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Input from './Input';
import Message from './Message';
import ChatWebSocket from './ChatWebSocket';
import styled from 'styled-components';

export default function Chat({ connection, currentUser, setCurrentUser }) {

    // States & variables
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({ messages: [] });
    const [currentRoom, setCurrentRoom] = useState(null);
    const room = (new URLSearchParams(window.location.search)).get('room');

    // Update the currentRoom state
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}room/${room}`)
            .then(res => res.json())
            .then(data => setCurrentRoom(data))
    }, [setCurrentRoom])

    // Send Message handler
    const sendMessage = (e) => {
      e.preventDefault()
      fetch(`${process.env.REACT_APP_API}add`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ message, currentUser, currentRoom })
      })
      .then(res => res.json())
      setMessage('')
    };

    // Message list updater
    const updateMessages = (data) => {
      setMessages(prevState => [ ...prevState, { messages: data } ]);
    }
  
    return (
        <ChatStyled>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <div className="chatroom">
            <Message currentUser={currentUser} message={message} messages={messages} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        
        <ChatWebSocket connection={connection} room={room} updateMessages={updateMessages} />
        </ChatStyled>
    )
}

// CSS
// @media (min-width: 320px) and (max-width: 480px) {
//   .container {
//     height: 100%;
//     width: 100%;
//   }
// }

// @media (min-width: 480px) and (max-width: 1200px) {
//   .container {
//     width: 100%;
//   }
// }
const ChatStyled = styled.div`
.chatroom {
  position: relative;
  top: 80px;
  margin: auto;
  height: 525px;
  width: 65%;
  background-color: white;
}

`