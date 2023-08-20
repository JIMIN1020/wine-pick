import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Loading from "../component/Loading";
import MessageBox from "../component/MessageBox";
import InputForm from "../component/InputForm";
import WineInfo from "../component/WineInfo";
import axios from "axios";

const Home = () => {
  const [response, setResponse] = useState(""); // GPT 응답
  const [keywords, setKeywords] = useState([]); // GPT 답변 가공한 검색 키워드들
  const [wineData, setWineData] = useState([]); // 네이버에게 전달받은 와인 데이터
  const [loading, setLoading] = useState(false); // 로딩중 사인

  const wineBoxRef = useRef(null);
  const axiosInstance = axios.create({
    baseURL: "https://wine-bot.fly.dev",
  });

  /* ------------- 결과 포커싱 ------------- */
  useEffect(() => {
    if (wineData.length > 0 && !loading && wineBoxRef.current) {
      wineBoxRef.current.scrollIntoView({
        behavior: "smooth", // Use "auto" for instant scroll, "smooth" for smooth animation
      });
    }
  }, [wineData, loading]);

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
        await axiosInstance
          .post("/search/encyc", { query: word })
          .then((res) => setWineData((prev) => [...prev, res.data.items[0]]))
          .catch((err) => console.log("error!: ", err));
      });
      setLoading(false);
    };
    // 키워드 5개가 존재하면 검색 시작!
    if (keywords.length === 5 && loading) {
      encycSearch();
    }
  }, [keywords]);

  /* ------------- OpenAI API 요청 ------------- */
  const onSendClick = async (msg) => {
    setLoading(true);
    setWineData([]);
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
    await axiosInstance
      .post("/chat", newMessage)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err);
      });
  };

  return (
    <>
      <FormBox>
        {loading && <Loading />}
        <MessageBox />
        <InputForm onSendClick={onSendClick} />
      </FormBox>
      {wineData.length > 0 && !loading ? (
        <WineBox tabIndex={0} ref={wineBoxRef}>
          <h2>내 취향에 맞는 와인은?</h2>
          <Wines>
            {!loading && wineData.length > 0
              ? wineData.map((wine, i) => {
                  if (wine) {
                    return <WineInfo wine={wine} id={i} />;
                  } else {
                    return null;
                  }
                })
              : undefined}
          </Wines>
        </WineBox>
      ) : undefined}
    </>
  );
};

export default Home;

const FormBox = styled.div`
  width: 1100px;
  height: 600px;
  border-radius: 10px;
  margin: 0 0;
  position: relative;

  display: flex;

  background-color: rgba(256, 256, 256, 0.97);
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);

  @media screen and (max-width: 1150px) {
    width: 97%;
  }

  @media screen and (max-width: 990px) {
    width: 520px;
    flex-direction: column;
    align-items: center;
    height: 1170px;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    flex-direction: column;
    align-items: center;
    height: 1250px;
  }
`;

const WineBox = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0;

  h2 {
    font-size: 27px;
    color: white;
  }
`;

const Wines = styled.div`
  display: grid;
  grid-template-columns: 550px 550px;
  @media screen and (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
