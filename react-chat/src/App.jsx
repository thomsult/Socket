import "./App.scss";
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import axios from "axios";
import data from "./message.json";
function User({ data, onClick }) {
  const { first_name, last_name, email, avatar } = data;
  const Online = true;
  return (
    <li onClick={onClick}>
      <img src={avatar.replace("=set1", "=set5")} alt="" />
      <div>
        <h2>{`${first_name} ${last_name}`}</h2>
        <small>{email}</small>
        <h3>
          <span className="status blue"></span>
          {Online ? "Online" : "Offline"}
        </h3>
      </div>
    </li>
  );
}

function Header({ user }) {
  if (user) {
    const { first_name, last_name, email, avatar, address } = user;
    return (
      <header>
        <img src={avatar.replace("=set1", "=set5")} alt="" />
        <div>
          <h2>
            {first_name} {last_name}
          </h2>
          <h3>
            Address: {address.street_address} - {address.city}{" "}
          </h3>
        </div>
      </header>
    );
  }
  return (
    <header>
      <div>
        <h2>Chat is ready</h2>
        <h3>No contact Selected</h3>
      </div>
    </header>
  );
}

function Message(props) {
  const date = new Date(props.Date);
  return (
    <li className={props.Author}>
      <div className="entete">
        <h3>
          {props.Author}: {date.toUTCString()}
        </h3>
      </div>
      <div className="message">{props.children}</div>
    </li>
  );
}

function Chat() {
  return (
    <ul id="chat">
      {data.Messages.map((el, index) => {
        return (
          <Message
            Author={el.AuthorID == 1 ? "me" : "other"}
            Date={el.Date}
            key={index}
          >
            {el.Message}
          </Message>
        );
      })}
    </ul>
  );
}

function Footer({onSubmit}) {
  return (
    <footer>
      <form onSubmit={(e)=>{
        e.preventDefault()
        onSubmit(e.target[0].value)
        e.target[0].value = null
      }} >
        <input placeholder="Type your message"></input>
        <button type="submit" >
          <img src="./paper-plane-solid.svg" alt="svg" />
        </button>
      </form>
    </footer>
  );
}





function App() {
const socket = io("http://localhost:4000");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [SelectedUser, SetSelectedUser] = useState(null);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios(
        "https://random-data-api.com/api/users/random_user?size=5"
      );
      const data = response.data;
      setUser(data);
      setIsLoaded(true);
    }

    //fetchMyAPI();
  }, []);
  const [time, setTime] = useState('fetching')  
  useEffect(()=>{
    const socket = io('http://localhost:4000')    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),4000)
    })   
    socket.on('time', (data)=>setTime(data))
   socket.on('disconnect',()=>setTime('server disconnected'))
 
 },[])
  


const onSubmit = (e)=>{
console.log(e)
}
  return (
    <div className="App">
      <div id="container">
        <aside>
          <header>
            <input type="text" placeholder="search" />
          </header>
          <ul>
            {isLoaded &&
              user.map((el) => (
                <User
                  data={el}
                  onClick={(e) => {
                    SetSelectedUser(el);
                  }}
                  // @ts-ignore
                  key={el.id}
                ></User>
              ))}
          </ul>
        </aside>
        <main>
          <Header user={SelectedUser} />
          <Chat />
          <Footer onSubmit={onSubmit}/>
        </main>
      </div>
    </div>
  );
}

export default App;
