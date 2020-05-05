const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);


io.on('connection', socket =>{
    
    
})


mongoose.connect("mongodb://localhost:27017/gresp",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
mongoose.set('useFindAndModify',false);

app.use((req,res,next) =>{
    req.io = io;
    return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);