import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatWebSocket from './ChatWebSocket';
import Input from './Input';
import Message from './Message';
import NavBar from './NavBar';
import { currentRoomFetch, createMessageFetch } from '../services/Requests';


export default function Chat({ currentUser, setCurrentUser }) {

    // STATES AND VARIABLES
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({ messages: [] });
    const [currentRoom, setCurrentRoom] = useState(null);
    const room = (new URLSearchParams(window.location.search)).get('room');

    // CURRENT ROOM SETTER
    useEffect(() => {
      currentRoomFetch(room)
      .then(data => setCurrentRoom(data))
    }, [setCurrentRoom])


    // SENDING MESSAGE HANDLER & MESSAGE STATE RESET
    const sendMessage = (e) => {
      e.preventDefault()
      createMessageFetch(message, currentUser, currentRoom)
      setMessage('')
    };


    // UPDATES STATE COLLECTION OF MESSAGES
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
        
          <ChatWebSocket room={room} updateMessages={updateMessages} />
        </ChatStyled>
    )
}


// STYLED COMPONENTS 
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