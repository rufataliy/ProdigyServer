import React, { useState, useEffect, useContext } from "react";
import { MessageProvider } from "./MessageProvider";
import { ChatProvider } from "./ChatProvider";
import io from "socket.io-client";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  const [online, setOnline] = useState(false);
  useEffect(() => {
    const newSocket = io("/chat", { reconnectionDelay: 2000 });
    setSocket(newSocket);
    newSocket.on("disconnect", (a) => {
      setOnline(false);
    });
    newSocket.on("reconnecting", (number) => {
      if (number > 10) setOnline(false);
    });
    newSocket.on("reconnect", (number) => {
      setOnline(true);
    });
    newSocket.on("connected", (response) => {
      setOnline(response.connected);
    });
    newSocket.on("connect", (response) => {
      console.log("chat connected");
      setOnline(true);
    });

    window.addEventListener("offline", () => setOnline(false));

    const cleanup = () => {
      window.removeEventListener("offline", () => () => setOnline(false));
      newSocket.close();
    };
    return cleanup;
  }, []);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      <ChatProvider>
        <MessageProvider>{children}</MessageProvider>
      </ChatProvider>
    </SocketContext.Provider>
  );
};

export function useSocket() {
  return useContext(SocketContext);
}

export default SocketProvider;
