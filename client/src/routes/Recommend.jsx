import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TypeStep from "../component/steps/TypeStep";
import RangeStep from "../component/steps/RangeStep";
import axios from "axios";
import WineInfo from "../component/WineInfo";
import Loading from "../component/Loading";
import Steps from "../component/Steps";

function Recommend() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("Red");
  const [body, setBody] = useState("light");
  const [tannin, setTannin] = useState("low");
  const [acidity, setAcidity] = useState("low");
  const [sweetness, setSweetness] = useState("low");
  const [buttonName, setButtonName] = useState("다음");

  const [response, setResponse] = useState(""); // GPT 응답
  const [keywords, setKeywords] = useState([]); // GPT 답변 가공한 검색 키워드들
  const [wineData, setWineData] = useState([]); // 네이버에게 전달받은 와인 데이터
  const [loading, setLoading] = useState(false); // 로딩 여부

  const wineBoxRef = useRef(null); // 결과물 포커싱
  const axiosInstance = axios.create({
    // baseURL: "https://wine-bot.fly.dev",
    baseURL: "http://localhost:4000",
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

  /* ------------- 비비노 검색하기 ------------- */
  useEffect(() => {
    // 비비노 API 요청 함수
    const getWineData = async () => {
      await axiosInstance
        .post("/vivino", { query: keywords })
        .then((res) => {
          // 데이터 가공 -> 오류가 넘어온 경우 제거
          const data = res.data.filter(
            (data) => !data.hasOwnProperty("status")
          );
          setWineData(data);
          setLoading(false);
        })
        .catch((err) => console.log("error!: ", err));
    };
    // 키워드 5개가 존재하면 검색 시작!
    if (keywords.length === 5 && loading) {
      getWineData();
    }
  }, [keywords]);

  /* ------------- OpenAI API 요청 ------------- */
  const gptCall = async (msg) => {
    setLoading(true);
    setWineData([]);
    // 메세지 만들기
    const question = `please recommend 5 ${msg.type} wine products which is ${
      msg.body
    } bodied, ${msg.tannin} tannin, ${
      msg.sweetness === "dry" ? "dry" : msg.sweetness + " sweetness"
    }, ${
      msg.acidity
    } acidity. Answer specific wine names only without numbering.`;

    // message 배열
    const newMessage = [
      {
        role: "system",
        content: "You are a wine sommelier who can recommend perfect wine.",
      },
      {
        role: "user",
        content:
          "please recommend 5 red wine products which is full bodied, medium tannin, dry, medium acidity. Answer specific wine names only without numbering.",
      },
      {
        role: "assistant",
        content:
          "Screaming Eagle The Flight\nLicenciado Rioja Gran Reserva\nPio Cesare Barolo\nE. Guigal Côte-Rôtie La Turque\nGaja Ca'Marcanda Promis Toscana",
      },
      {
        role: "user",
        content: question,
      },
    ];

    // openAI API 요청
    await axiosInstance
      .post("/api/chat", newMessage)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err);
      });
  };

  const onClick = async (e) => {
    if (step < 5) {
      if (step === 4) setButtonName("추천받기");
      setStep((prev) => prev + 1);
    } else if (step === 5) {
      let msg = { type, body, tannin, sweetness, acidity };
      gptCall(msg);
    }
  };
  return (
    <>
      <Container>
        <Steps step={step} />
        <FormBox>
          {loading && <Loading />}
          {step === 1 && <TypeStep type={type} setType={setType} />}
          {step === 2 && (
            <RangeStep
              name="바디감"
              state={body}
              setState={setBody}
              first="light"
              last="full"
            />
          )}
          {step === 3 && (
            <RangeStep
              name="타닌"
              state={tannin}
              setState={setTannin}
              first="low"
              last="strong"
            />
          )}
          {step === 4 && (
            <RangeStep
              name="산도"
              state={acidity}
              setState={setAcidity}
              first="low"
              last="high"
            />
          )}
          {step === 5 && (
            <RangeStep
              name="당도"
              state={sweetness}
              setState={setSweetness}
              first="dry"
              last="high"
            />
          )}
          <Bottom>
            {step >= 2 && (
              <Button onClick={() => setStep((prev) => prev - 1)}>Back</Button>
            )}
            <Button onClick={onClick}>{buttonName}</Button>
          </Bottom>
        </FormBox>
      </Container>
      <Result>
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
      </Result>
    </>
  );
}

export default Recommend;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Result = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(172, 45, 49, 0.6);
`;

const FormBox = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  border: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const Bottom = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  height: 40px;
  width: 100px;
  background-color: rgba(172, 45, 49);
  color: white;
  cursor: pointer;
  margin: 10px;
`;

const WineBox = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;

  h2 {
    font-size: 27px;
    color: white;
  }
`;

const Wines = styled.div`
  display: flex;
  gap: 20px;
`;
