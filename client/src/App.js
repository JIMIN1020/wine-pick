import axios from "axios";
import { useState } from "react";
import NavBar from "./component/NavBar";
import GlobalStyle from "./GlobalStyle";
import FormBox from "./component/FormBox";
import { styled } from "styled-components";

function App() {
  const [response, setResponse] = useState("");

  const onSendClick = async (msg) => {
    // 새로운 message 만들기
    const newMessage = [
      {
        role: "system",
        content: "You are a wine sommelier who can recommend perfect wine.",
      },
      {
        role: "user",
        content: `Can you recommend 5 ${msg.type} wines which is ${msg.body} bodied, ${msg.tannin} tannin, ${msg.sweetness} sweetness, ${msg.acidity} acidity? answer me with specific wine name only.`,
      },
    ];

    // 서버에 요청 보내기
    axios
      .post("/chat", newMessage)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err.response);
      });
  };

  return (
    <Container>
      <GlobalStyle />
      <NavBar />
      <FormBox onSendClick={onSendClick} />
      <div>{response}</div>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
