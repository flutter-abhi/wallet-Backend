const express = require("express");
const http = require("http");
const { initWebSocket } = require("./config/websocket");
const db = require("./config/database");
require("dotenv").config();
const router = require("./Routs/routs");
const cloudinary = require("./config/cloudinnary");
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app); // Create HTTP server

// Initialize WebSocket server
initWebSocket(server);

app.use(express.json());
app.use("/wallet", router);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cookieParser());

db.database(); // Connect to database
cloudinary.cloudinaryConnection(); // Connect to Cloudinary

// Start HTTP server and WebSocket server
const port = process.env.PORT || 3400;

server.listen(port, '0.0.0.0', () => {
    console.log(`app started at port ${port}`);
});

app.get("/", (req, res) => {
    res.send(
        "<h1>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>"
    );
});
