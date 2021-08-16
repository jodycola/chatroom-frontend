import actionCable from 'actioncable';

const websocket = 'ws://localhost:3000/cable'

const connection = {};
connection.cable = actionCable.createConsumer(websocket);

export {
    connection
}