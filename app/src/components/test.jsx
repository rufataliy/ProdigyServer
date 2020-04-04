import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
const handleSubmit = (values) => console.log(values);

export const ValidationSchemaExample = () => {
  const [state, setState] = useState();
  const [inputValue, setInputValue] = useState("");
  const socket = io("https://localhost:3000");

  socket.on("chat", (a) => setState(a.msg));
  useEffect(() => {
    socket.on("connected", (a) => setState(a));
  }, []);
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    socket.emit("chat", { msg: inputValue });
  };
  return (
    <div>
      <h1>Playground component</h1>
      <input type="text" onChange={handleChange} />
      <pre>{JSON.stringify(state)}</pre>
    </div>
  );
};
