// @ts-nocheck
import React,{useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";
const socket = socketClient(SERVER);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socket={socket}/>
    
    
  </React.StrictMode>
)
