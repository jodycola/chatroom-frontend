import React, { useEffect } from 'react';
import { connection } from '../services/Cable'

export default function ChatWebSocket({ room, updateMessages }) {

    // CREATES A SUBSCRIPTION FOR EACH CLIENT THAT CONNECTS TO A CHANNEL
    // 'CONNECTED' = WHEN CLIENT CONNECTS TO CHANNEL, DEFAULT METHOD
    // 'RECEIVED' = HOW DATA WILL BE CONSUMED BY EACH CLIENT
    useEffect(() => {
        connection.cable.subscriptions.create({
            channel: 'RoomChannel',
            title: room
        },
        {
            connected: function() {
            },
            received: function(data) {
                updateMessages(data)
            }
        })
    }, [connection]);

    return (
        <div>

        </div>
    )
}