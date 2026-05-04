const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("New socket!");

  socket.emit("test", "hello from server");
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose.connect('mongodb://localhost:27017/NewWaveDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/testimonials', require('./routes/testimonials.routes'));
app.use('/api/concerts', require('./routes/concerts.routes'));
app.use('/api/seats', require('./routes/seats.routes'));


app.use(express.static(path.join(__dirname, 'client/build')));


app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not found...' });
});


server.listen(process.env.PORT || 8000, () => {
  console.log('Server is running');
});