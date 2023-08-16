import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./component/NavBar";
import GlobalStyle from "./GlobalStyle";
import { styled } from "styled-components";
import MessageBox from "./component/MessageBox";
import InputForm from "./component/InputForm";

function App() {
  const [response, setResponse] = useState(""); // GPT 응답
  const [keywords, setKeywords] = useState([]); // GPT 답변 가공한 검색 키워드들

  /* ------------- GPT 답변 가공하기 ------------- */
  useEffect(() => {
    const getKeywords = () => {
      const words = response.split("\n");
      setKeywords(words);
      console.log(words);
    };
    getKeywords();
  }, [response]);

  /* ------------- OpenAI API 요청 ------------- */
  const onSendClick = async (msg) => {
    // 메세지 만들기
    const question = `please recommend 5 ${msg.type} wine products which is ${msg.body} bodied, ${msg.tannin} tannin, ${msg.sweetness} sweetness, ${msg.acidity} acidity. Answer specific wine names only without numbering.`;

    // message 배열
    const newMessage = [
      {
        role: "system",
        content: "You are a wine sommelier who can recommend perfect wine.",
      },
      {
        role: "user",
        content:
          "please recommend 5 red wine products which is light bodied, medium tannin, little sweetness, medium acidity. Answer specific wine names only without numbering.",
      },
      {
        role: "assistant",
        content:
          "Pinot Noir, Louis Jadot Bourgogne\nGrenache, Domaine de la Janasse Côtes du Rhône\nBarbera d'Alba, Pio Cesare Fides\nGamay, Marcel Lapierre Morgon\nZweigelt, Laurenz V. Friendly Grüner Veltliner",
      },
      {
        role: "user",
        content: question,
      },
    ];

    // openAI API 요청
    axios
      .post("/chat", newMessage)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err);
      });

    // Naver API 요청
    axios
      .post("/search/encyc", { query: "red wine" })
      .then((res) => console.log("response ->", res.data))
      .catch((err) => console.log("error!: ", err));
  };

  return (
    <Container>
      <GlobalStyle />
      <NavBar />
      <FormBox>
        <MessageBox />
        <InputForm onSendClick={onSendClick} />
      </FormBox>
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

const FormBox = styled.div`
  width: 1100px;
  height: 600px;
  border-radius: 10px;

  display: flex;

  background-color: white;
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
`;
