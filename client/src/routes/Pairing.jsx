import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { keyword } from "../assets/keyword";
import axios from "axios";
import Loading from "../component/Loading";
import Result from "../component/Result";
import KeywordStep from "../component/steps/KeywordStep";
import LastStep from "../component/steps/LastStep";

function Pairing() {
  const [food, setFood] = useState("");
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);

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
        .post("/api/vivino", { query: keywords })
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
    setStep((prev) => prev + 1);

    // 메세지 만들기
    const question = `please recommend 5 wine products which would go well with ${food}. ${
      selected.length > 0
        ? "The keywords for this dish are" + selected.join(", ") + "."
        : ""
    } Answer specific wine names only without numbering.`;

    // message 배열
    const newMessage = [
      {
        role: "system",
        content:
          "You are a wine sommelier who can recommend perfect wine for korean food.",
      },
      {
        role: "user",
        content:
          "Please recommend 5 wine products which would go well with 갈비찜. The keywords for this menu are 매콤한, 달콤한, 간장 베이스. Answer specific wine names only without numbering.",
      },
      {
        role: "assistant",
        content:
          "Clos Galena Galena\nChâteau Maillet Pomerol\nFrank Family Cabernet Sauvignon\nLenotti Amarone della Valpolicella Classico\nGaja Ca'Marcanda Promis Toscana",
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err);
      });
  };

  const handleStep = () => {
    if (food.trim() === "") {
      alert("값을 입력해주세요.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const clearAll = () => {
    setStep(1);
    setFood("");
    setResponse("");
    setSelected([]);
    setKeywords([]);
    setWineData([]);
  };

  return (
    <>
      <Container>
        <Title>
          <h1>페어링 추천받기</h1>
          <p>음식에 어울리는 와인을 추천받을 수 있어요!</p>
          <p>
            와인과 페어링하고 싶은 음식을 선택하고,
            <br />
            음식의 특징에 대한 키워드를 선택해주세요.
          </p>
        </Title>
        <FormBox step={step === 1}>
          <Step>
            <Num>Step 1</Num>
          </Step>
          <Content>
            <h3>음식 선택</h3>
            <p>와인과 페어링하고 싶은 음식을 선택해주세요.</p>
            <Input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
            />
            <Bottom>
              <Button onClick={handleStep}>다음</Button>
            </Bottom>
          </Content>

          {step >= 2 && <Disabled />}
        </FormBox>
        <FormBox step={step === 2}>
          <Step>
            <Num>Step 2</Num>
          </Step>
          {step <= 2 && (
            <KeywordStep
              keys={keyword.key}
              selected={selected}
              setSelected={setSelected}
              gptCall={gptCall}
            />
          )}
          {step === 3 && <LastStep clearAll={clearAll} height={300} />}
          {step === 1 && <Disabled />}
          {loading && <Loading />}
        </FormBox>
      </Container>
      <Result
        title={`${food}에 페어링 하기 좋은 와인은?`}
        wineData={wineData}
        wineBoxRef={wineBoxRef}
        loading={loading}
      />
    </>
  );
}

export default Pairing;

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

  & h1 {
    font-size: 34px;
  }

  & p {
    line-height: 25px;
  }
`;

const FormBox = styled.div`
  width: 350px;
  height: 600px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border: 0.5px solid gray;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 40px 20px;

  & h1 {
    font-size: 20px;
  }

  & h3 {
    font-weight: 550;
    margin: 20px 0px;
  }

  & p {
    margin: 0;
    margin-bottom: 10px;
  }
`;

const Content = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Disabled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 20px;
  background-color: #ffffff81;
`;

const Step = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0px 5px;

  & span {
    margin: 0px 10px;
    color: rgb(172, 45, 49);
    font-weight: 700;
  }
`;

const Num = styled.div`
  border-radius: 20px;
  background-color: rgb(172, 45, 49);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  padding: 7px 15px;
`;

const Input = styled.input`
  width: 200px;
  height: 25px;
  border-radius: 10px;
  border: 1px solid gray;
  text-align: center;
  &:focus {
    outline: none;
  }
  margin: 50px 0px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  background-color: rgba(172, 45, 49);
  color: white;
  cursor: pointer;
  padding: 10px 23px;
  font-weight: 600;
  margin: 10px 0px;

  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
