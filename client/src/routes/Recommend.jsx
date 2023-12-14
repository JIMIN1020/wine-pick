import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import TypeStep from "../component/steps/TypeStep";
import RangeStep from "../component/steps/RangeStep";
import axios from "axios";
import Loading from "../component/Loading";
import Steps from "../component/Steps";
import Result from "../component/Result";
import LastStep from "../component/steps/LastStep";
import Selected from "../component/Selected";

function Recommend() {
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState({
    type: "Red",
    body: "light",
    tannin: "low",
    acidity: "low",
    sweetness: "dry",
  });

  const [buttonName, setButtonName] = useState("다음");

  const [response, setResponse] = useState(""); // GPT 응답
  const [keywords, setKeywords] = useState([]); // GPT 답변 가공한 검색 키워드들
  const [wineData, setWineData] = useState([]); // Vivino에서 가져온 와인 데이터
  const [loading, setLoading] = useState(false); // 로딩 여부

  const wineBoxRef = useRef(null); // 결과물 포커싱
  const axiosInstance = axios.create({
    baseURL: "https://wine-pick.fly.dev",
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
    const { type, body, tannin, sweetness, acidity } = msg;
    setLoading(true);
    setWineData([]);
    // 메세지 만들기
    const question = `Please recommend 5 ${type} wine products which is ${body} bodied, ${tannin} tannin, ${
      sweetness === "dry" ? "dry" : sweetness + " sweetness"
    }, ${acidity} acidity. Answer specific wine product names only without numbering.`;

    // message 배열
    const newMessage = [
      {
        role: "system",
        content: "You are a wine sommelier who can recommend perfect wine.",
      },
      {
        role: "user",
        content:
          "Please recommend 5 red wine products which is full bodied, medium tannin, dry, medium acidity. Answer specific wine product names only without numbering.",
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
      setStep(6);
      gptCall(options);
    }
  };

  const clearAll = () => {
    setStep(1);
    setOptions({
      type: "Red",
      body: "light",
      tannin: "low",
      acidity: "low",
      sweetness: "dry",
    });
    setResponse("");
    setWineData([]);
  };

  return (
    <>
      <Container>
        <Title>
          <div>
            <h1>와인 추천받기</h1>
            <p>취향에 맞는 와인을 추천받을 수 있어요!</p>
            <p>
              타입, 바디감, 타닌, 산도, 당도를
              <br />
              원하는 취향으로 선택해주세요.
            </p>
          </div>
          <Selected step={step} options={options} />
        </Title>
        <FormBox>
          <Steps step={step} />
          {loading && <Loading />}
          {step === 1 && (
            <TypeStep
              type={options.type}
              setOptions={setOptions}
              onClick={onClick}
            />
          )}
          {step === 2 && (
            <RangeStep
              name="바디감"
              state={options.body}
              setState={(value) => setOptions({ ...options, body: value })}
              first="light"
              last="full"
              onClick={onClick}
              buttonName={buttonName}
              setMainStep={setStep}
            />
          )}
          {step === 3 && (
            <RangeStep
              name="타닌"
              state={options.tannin}
              setState={(value) => setOptions({ ...options, tannin: value })}
              first="low"
              last="strong"
              onClick={onClick}
              buttonName={buttonName}
              setMainStep={setStep}
            />
          )}
          {step === 4 && (
            <RangeStep
              name="산도"
              state={options.acidity}
              setState={(value) => setOptions({ ...options, acidity: value })}
              first="low"
              last="high"
              onClick={onClick}
              buttonName={buttonName}
              setMainStep={setStep}
            />
          )}
          {step === 5 && (
            <RangeStep
              name="당도"
              state={options.sweetness}
              setState={(value) => setOptions({ ...options, sweetness: value })}
              first="dry"
              last="high"
              onClick={onClick}
              buttonName={buttonName}
              setMainStep={setStep}
            />
          )}
          {step === 6 && <LastStep clearAll={clearAll} height={400} />}
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
  animation: ${fadein} 1s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Title = styled.div`
  width: 350px;
  height: 600px;
  margin: 0px 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
