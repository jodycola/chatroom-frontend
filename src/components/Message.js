import React from 'react';
import styled from 'styled-components';

export default function Message({ message, messages, currentUser }) {

    
    // State and variables
    let displayMessages

    // Display JSX
    if (messages.length > 0) {
        displayMessages = messages.map((message, index) => {
            return (
            <div key={index} className={`message ${message.messages.user.id === currentUser.id ? 'sent' : 'received'}`}>
                <div className='text'> {message.messages.message} </div>

                <div className='author'> {message.messages.user.name} </div>

            </div>
            )
        })
    }


    return (
        <MessageStyle>
        <div className="container">
            {displayMessages}
        </div>
        </MessageStyle>
    )
}

// CSS
const MessageStyle = styled.div`
.container {
    display: flex;
    flex-flow: column;
    overflow-y: scroll;
}

.message {
    width: fit-content;
    max-width: 250px;
    word-wrap: break-word;
}

.text {
    color: #FFF;
    border-radius: 10px;
    font-size: 22px;
    padding: 4px 8px;
}

.author {
    font-size: 12px;
    color: #777777;
    margin: auto;
}

.message.sent {
    flex-direction: row-reverse;
    align-self: flex-end;
    .text {
        background-image: linear-gradient(#99c2ff, #0066ff);
    }
}

.message.received {
    flex-direction: row;
    align-self: flex-start;
    .text {
        background-image: linear-gradient(#FFA387, #FF3C00);
    }
}

`