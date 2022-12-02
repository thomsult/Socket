const express = require("express")
const socketIo = require("socket.io")
const http = require("http")
const PORT = process.env.PORT || 4000
const app = express()
const server = http.createServer(app)
// @ts-ignore
const io = new socketIo(server,{ 
    cors: {
      origin: "http://127.0.0.1:5173"
    }
}) //in case server and client run on different urlsio.on("connection’,(socket)=>{
  console.log("client connected: ",io.id)
  
  io.join("clock-room")
  
  io.on("disconnect",(reason)=>{
    console.log(reason)
  })
  
  setInterval(()=>{
     io.to("clock-room").emit("time", new Date())
},1000)

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log("Server running on Port ", PORT)
})