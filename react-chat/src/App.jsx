import "./App.scss";
import React, { useEffect, useState } from "react";

import axios from "axios";

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

function Header({user}) {
  
  if(user){
    const { first_name, last_name, email, avatar,address} = user;
    return (
      <header>
        <img
          src={avatar.replace("=set1", "=set5")}
          alt=""
        />
        <div>
          <h2>{first_name} {last_name}</h2>
          <h3>Address: {address.street_address} - {address.city} </h3>
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


function App() {
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [SelectedUser,SetSelectedUser]=useState(null)
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios(
        "https://random-data-api.com/api/users/random_user?size=5"
      );
      const data = response.data;
      setUser(data);
      setIsLoaded(true);
    }

    fetchMyAPI();
  }, []);

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
          <Header user={SelectedUser}/>
          <ul id="chat">
            <li className="you">
              <div className="entete">
                <h3>Vincent: 10:12 AM, Today</h3>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:15 AM, Today</h3>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12 AM, Today</h3>
              </div>
              <div className="message">OK</div>
            </li>
            <li className="you">
              <div className="entete">
                <h3>Vincent: 10:12 AM, Today</h3>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12 AM, Today</h3>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12 AM, Today</h3>
              </div>
              <div className="message">OK</div>
            </li>
          </ul>
          <footer>
            <input placeholder="Type your message"></input>
            <button type="button">
                  
<img src='./paper-plane-solid.svg' alt="svg" />


            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
