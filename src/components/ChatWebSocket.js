import React, { useEffect } from 'react'

export default function ChatWebSocket({ connection, room, updateMessages }) {

    useEffect(() => {
        connection = connection.cable.subscriptions.create({
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