import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./component/NavBar";
import GlobalStyle from "./GlobalStyle";
import { styled } from "styled-components";
import MessageBox from "./component/MessageBox";
import InputForm from "./component/InputForm";
import WineInfo from "./component/WineInfo";
import Loading from "./component/Loading";

function App() {
  const [response, setResponse] = useState(""); // GPT 응답
  const [keywords, setKeywords] = useState([]); // GPT 답변 가공한 검색 키워드들
  const [wineData, setWineData] = useState([]); // 네이버에게 전달받은 와인 데이터
  const [loading, setLoading] = useState(false); // 로딩중 사인

  /* ------------- GPT 답변 가공하기 ------------- */
  useEffect(() => {
    const getKeywords = () => {
      const words = response.split("\n");
      setKeywords(words);
    };
    getKeywords();
  }, [response]);

  /* ------------- 네이버 검색하기 ------------- */
  useEffect(() => {
    // 네이버 API 요청 함수
    const encycSearch = () => {
      keywords.forEach(async (word) => {
        await axios
          .post("/search/encyc", { query: word })
          .then((res) => setWineData((prev) => [...prev, res.data.items[0]]))
          .catch((err) => console.log("error!: ", err));
      });
      setLoading(false);
    };
    // 키워드 5개가 존재하면 검색 시작!
    if (keywords.length === 5) {
      encycSearch();
    }
  }, [keywords]);

  /* ------------- OpenAI API 요청 ------------- */
  const onSendClick = async (msg) => {
    setLoading(true);
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
    await axios
      .post("/chat", newMessage)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err);
      });

    // Naver API 요청
    // axios
    //   .post("/search/encyc", { query: "레드와인" })
    //   .then((res) => console.log("response -->", res.data.items[0]))
    //   .catch((err) => console.log("error!: ", err));
  };

  return (
    <Container>
      <GlobalStyle />
      <NavBar />
      <FormBox>
        {loading && <Loading />}
        <MessageBox />
        <InputForm onSendClick={onSendClick} />
      </FormBox>
      {!loading && wineData.length > 0 ? (
        <Temp>
          <h2>내 취향에 맞는 와인은?</h2>
        </Temp>
      ) : undefined}
      <WineBox>
        {!loading && wineData.length > 0
          ? wineData.map((wine, i) => {
              if (wine) {
                return <WineInfo wine={wine} id={i} />;
              } else {
                return null;
              }
            })
          : undefined}
      </WineBox>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  position: relative;
`;

const FormBox = styled.div`
  width: 95%;
  height: 600px;
  border-radius: 10px;
  margin: 0 0;

  display: flex;

  background-color: white;
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
`;

const Temp = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;

const WineBox = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
