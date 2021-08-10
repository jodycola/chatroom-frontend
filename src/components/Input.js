import React from 'react'
import styled from 'styled-components';

export default function Input({ message, setMessage, sendMessage }) {

    return (
    <InputStyled>
    <form className="form">
        <input
            className="input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendButton" onClick={(e) => sendMessage(e)}> Send </button>
    </form>
    </InputStyled>
    )
}

// CSS
const InputStyled = styled.div`
.form {
    display: flex;
    position: fixed;
    padding: 10px;
    bottom: 0;
    height: 50px;
    width: 100%;
    left: 20%;
}

input {
    width: 50%;
    font-size: 1.2em;
}

.sendButton {
    color: #fff !important;
    text-transform: uppercase;
    background: #2979FF;
    display: inline-block;
    border: 2px solid #2979FF;
    width: 10%;
}
`