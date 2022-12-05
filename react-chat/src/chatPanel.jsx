// @ts-nocheck
import "./chatPanel.scss";
import React, { useEffect, useState, useRef } from "react";
import { Resizable } from 'react-resizable';

function User({ data, onClick }) {
  const { first_name, last_name, email, avatar,online } = data;
  return (
    first_name && (
      <li onClick={onClick}>
        {avatar && <img src={avatar.replace("=set1", "=set5")} alt="" />}
        <div>
          <h2>{`${first_name} ${last_name}`}</h2>
          <small>{email}</small>
          <h3>
            <span className={online ? "status green" : "status orange"}></span>
            {online ? "Online" : "Offline"}
          </h3>
        </div>
      </li>
    )
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
          {props.AuthorName}: {date.toLocaleTimeString()}
        </h3>
      </div>
      <div className="message">{props.children}</div>
    </li>
  );
}

function Chat({ messageList, self }) {
  return (
    <ul id="chat">
      {messageList &&
        messageList.map(({ authorName, date, message }, index) => {
          return (
            message && (
              <Message
                Author={authorName === self ? "me" : "other"}
                AuthorName={authorName}
                Date={date}
                key={index}
              >
                {message}
              </Message>
            )
          );
        })}
    </ul>
  );
}

function Footer({ onSubmit }) {
  return (
    <footer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target[0].value);
          e.target[0].value = null;
        }}
      >
        <input placeholder="Type your message"></input>
        <button type="submit">
          <img src="./paper-plane-solid.svg" alt="svg" />
        </button>
      </form>
    </footer>
  );
}

function ChatPanel({ socket,login }) {
  const [userList, SetUserList] = useState();
  const [messageList, SetMessageList] = useState([]);
  const [SelectedUser, SetSelectedUser] = useState();
  useEffect(() => {

    socket.on("UserList", (UserList) => {
      SetUserList(UserList);
    });

    socket.on("message", (message) => {
      console.log(message);
      SetMessageList(message);
    });
  }, []);

  const onSubmit = (e) => {
    socket.emit("message", {
      authorID: socket.id,
      authorName:login,
      date: new Date(),
      message: e,
    });
  };
  const [main, SetMain] = useState({
      width: 500,
      height: 90,
  });

  const onResize = (event, {element, size, handle}) => {
    size.width > 498&&SetMain({width: size.width, height: size.height});
    
  };

  return (
    <div className="App">
      <Resizable height={main.height} width={main.width} onResize={onResize}
      handle={<span className="custom-handle custom-handle-se" />}
      axis="x"
      >
      <div id="container" style={{width: main.width + 'px', height: main.height + 'vh'}}>
        <aside>
            <header>
              <input type="text" placeholder="search" />
            </header>
            <ul>
              {userList &&
                userList.map((el) => (
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
            {userList&&
            <>
              <Header user={SelectedUser} />
              <Chat messageList={messageList} self={login} />
              <Footer onSubmit={onSubmit} />
            </>}
          </main>
          </div>
        </Resizable>
    </div>
  );
}

export default ChatPanel;
