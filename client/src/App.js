import axios from "axios";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSendClick = async () => {
    // 새로운 message 만들기
    const newMessage = [
      {
        role: "system",
        content:
          "You are a wine expert who has a detailed and deep knowledge of wine.",
      },
      {
        role: "user",
        content: text,
      },
    ];
    // reset
    setText("");

    // 서버에 요청 보내기
    axios
      .post("/chat", newMessage)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err.response);
      });
  };

  return (
    <div>
      <h1>Wine bot</h1>
      <input type="text" value={text} onChange={onChange} />
      <button onClick={onSendClick}>send</button>
      <br />
      <span></span>
      <span>answer: {messages}</span>
    </div>
  );
}

export default App;
