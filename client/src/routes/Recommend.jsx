import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import TypeStep from "../component/steps/TypeStep";
import RangeStep from "../component/steps/RangeStep";
import axios from "axios";
import Loading from "../component/Loading";
import Steps from "../component/Steps";
import Result from "../component/Result";

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
        <Title>
          <h1>와인 추천받기</h1>
          <p>취향에 맞는 와인을 추천받을 수 있어요!</p>
          <p>
            와인과 페어링하고 싶은 음식을 선택하고,
            <br />
            음식의 특징에 대한 키워드를 선택해주세요.
          </p>
          <div>wine box</div>
        </Title>
        <FormBox>
          <Steps step={step} />
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
      <Result
        title="내 취향에 맞는 와인은?"
        wineData={wineData}
        wineBoxRef={wineBoxRef}
        loading={loading}
      />
    </>
  );
}

export default Recommend;

const fadein = keyframes`
  /* from {
      opacity:0;
  }
  to {
      opacity:1;
  } */
  0% {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  overflow: auto;
  animation: ${fadein} 2s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Title = styled.div`
  width: 350px;
  height: 600px;
  margin: 0px 30px;

  & h1 {
    font-size: 34px;
  }

  & p {
    line-height: 25px;
  }
`;

const FormBox = styled.div`
  width: 700px;
  height: 600px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  border: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Bottom = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
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
  font-weight: 600;

  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
