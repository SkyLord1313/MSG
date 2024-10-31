const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Initialize socket.io with the server

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Handle new socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data); // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Serve messaging area
app.get('/messaging', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'messaging.html'));
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
