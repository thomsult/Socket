var app = require('express')();
var http = require('http').createServer(app);
const cors = require('cors')
const PORT = 8080;
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "*"
  }
});
let User = []
let messagesList = []
app.use(cors());
app.options('*', cors());

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

  console.log('new client connected', socket.id);
  socket.on('login', (msg) => {
    socket.emit('UserList', User);
    socket.broadcast.emit('UserList', User);
    if (!User.find((el) => el.id === socket.id) && !User.find((el) => el.first_name === msg.first_name)) {
      const { first_name, last_name, email, avatar, address } = msg
      User.push({ id: socket.id, first_name, last_name, email, avatar, address, online: true })
      console.log(User);
      socket.emit('UserList', User);
      socket.broadcast.emit('UserList', User);
    }
    else if (User.find((el) => el.first_name === msg.first_name)) {
      if(User.find((el) => el.first_name === msg.first_name).online !== false){
        console.log('UserExist and Is Online');
        socket.emit('error',"Not false");
      }else{
        const NewUser = User.map((el) => {
          if (el.first_name === msg.first_name) {
            return { id: socket.id, 
              first_name: el.first_name, 
              last_name: el.last_name, 
              email: el.email, 
              avatar:el.avatar, 
              address:el.address, 
              online: true }
          } else {
            return el
          }
        })
        socket.emit('UserList', NewUser);
        socket.broadcast.emit('UserList', NewUser);

      }
      console.log(User)
    }
    socket.emit('message', messagesList);

    
  })
  socket.on('message', (message) => {
    messagesList.push(message)
    socket.emit('message', messagesList);
    socket.broadcast.emit('UserList', User);
    socket.broadcast.emit('message', messagesList);
  })

  socket.emit('UserList', User);
  socket.broadcast.emit('UserList', User);
  socket.on("disconnect", (reason) => {
    User = [...User.map((el) => {
      if (el.id === socket.id) {
        return { ...el, online: false }
      } else {
        return el
      }
    })]
    socket.broadcast.emit('UserList', User);
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});
