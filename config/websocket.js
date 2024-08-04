const WebSocket = require('ws');

let wss; // WebSocket Server instance

function initWebSocket(server) {
    wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');
        
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

function broadcastTransactionUpdate(transactionHistory) {
    if (!wss) {
        console.error('WebSocket server not initialized');
        return;
    }

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'transaction-update', data: transactionHistory }));
        }
    });
}

module.exports = { initWebSocket, broadcastTransactionUpdate };
