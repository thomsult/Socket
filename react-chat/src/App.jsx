import React, { useState, useEffect } from "react";
import ChatPanel from "./chatPanel";

export default function App({ socket }) {
  const [login, SetLogin] = useState("");

  const GetLogin = () => {
    const firstName = prompt("Name?")?.trim();
    if (firstName) {
      socket.emit("login", {
        first_name: firstName?.toLocaleLowerCase(),
        last_name: "",
        email: "thomsult",
        avatar: "",
        address: "",
      });
      SetLogin(firstName);
    }
  };

  useEffect(() => {
    return () => {
      if (!login) {
        GetLogin();
      }
    };
  }, []);

  if (login) {
    return <ChatPanel socket={socket} login={login} />;
  } else {
    return <h2>Loading</h2>;
  }
}
