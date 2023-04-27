import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('chat_view.html', { root: 'public'})
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('chat message', (msg) => {
    socket.broadcast.emit("rightMessage", msg)
    socket.emit("leftMessage", msg)
    //console.log(`Message: ${msg}`);
    //io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


server.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})