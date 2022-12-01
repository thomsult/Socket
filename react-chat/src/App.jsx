import "./App.css";
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

function Header() {
  return (
    <header>
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
        alt=""
      />
      <div>
        <h2>Chat with Vincent Porter</h2>
        <h3>already 1902 messages</h3>
      </div>
    </header>
  );
}


function App() {
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios(
        "https://random-data-api.com/api/users/random_user?size=10"
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
                    console.log(e);
                  }}
                  key={el.id}
                ></User>
              ))}
          </ul>
        </aside>
        <main>
          <Header />
          <ul id="chat">
            <li className="you">
              <div className="entete">
                <span className="status green"></span>
                <h2>Vincent</h2>
                <h3>10:12AM, Today</h3>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span className="status blue"></span>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span className="status blue"></span>
              </div>
              <div className="message">OK</div>
            </li>
            <li className="you">
              <div className="entete">
                <span className="status green"></span>
                <h2>Vincent</h2>
                <h3>10:12AM, Today</h3>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span className="status blue"></span>
              </div>
              <div className="message">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
            </li>
            <li className="me">
              <div className="entete">
                <h3>10:12AM, Today</h3>
                <h2>Vincent</h2>
                <span className="status blue"></span>
              </div>
              <div className="message">OK</div>
            </li>
          </ul>
          <footer>
            <textarea placeholder="Type your message"></textarea>
            <button type="button">Send</button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
