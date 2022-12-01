const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
const cors = require("cors");

app.use(cors());

var clients = {

};
const users = [
  {
    id: 1,
    name: 'Alexa'
}
]

io.on("connection", function(client) {

  client.on("sign-in", e => {
    console.log("test",e)
    let user_id = e.id;
    if (!user_id) return;
    client.user_id = user_id;
    if (clients[user_id]) {
      clients[user_id].push(client);
    } else {
      clients[user_id] = [client];
      console.log(clients)
    }
  });

  client.on("message", e => {
    console.log("test1",e)
    let targetId = e.to;
    let sourceId = client.user_id;
    if(targetId && clients[targetId]) {
      clients[targetId].forEach(cli => {
        cli.emit("message", e);
      });
    }

    if(sourceId && clients[sourceId]) {
      clients[sourceId].forEach(cli => {
        cli.emit("message", e);
      });
    }
  });

  client.on("disconnect", function() {
    if (!client.user_id || !clients[client.user_id]) {
      return;
    }
    let targetClients = clients[client.user_id];
    for (let i = 0; i < targetClients.length; ++i) {
      if (targetClients[i] == client) {
        targetClients.splice(i, 1);
      }
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get("/users", (req, res) => {
  res.send({ data: users });
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);