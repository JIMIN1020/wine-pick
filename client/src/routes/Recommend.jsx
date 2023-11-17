import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Step1 from "../component/steps/Step1";
import Step2 from "../component/steps/Step2";
import Step3 from "../component/steps/Step3";
import Step4 from "../component/steps/Step4";
import Step5 from "../component/steps/Step5";
import axios from "axios";
import WineInfo from "../component/WineInfo";
import Loading from "../component/Loading";

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

  /* ------------- 네이버 검색하기 ------------- */
  useEffect(() => {
    // 네이버 API 요청 함수
    const encycSearch = () => {
      keywords.forEach(async (wine) => {
        // await axiosInstance
        //   .post("/api/search/encyc", { query: wine })
        //   .then((res) => setWineData((prev) => [...prev, res.data.items[0]]))
        //   .catch((err) => console.log("error!: ", err));
        await axiosInstance
          .post("/vivino", { query: wine })
          .then((res) => console.log(res.data))
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
  const gptCall = async (msg) => {
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
      .post("/api/chat", newMessage)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error response:", err);
      });
  };

  const onClick = (e) => {
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
        <StepBox>
          <Step>
            <Num step={step >= 1}>1</Num>
            <span>타입</span>
            <Line step={step >= 2} />
          </Step>
          <Step>
            <Num step={step >= 2}>2</Num>
            <span>바디감</span>
            <Line step={step >= 3} />
          </Step>
          <Step>
            <Num step={step >= 3}>3</Num>
            <span>타닌</span>
            <Line step={step >= 4} />
          </Step>
          <Step>
            <Num step={step >= 4}>4</Num>
            <span>산도</span>
            <Line step={step >= 5} />
          </Step>
          <Step>
            <Num step={step >= 5}>5</Num>
            <span>당도</span>
          </Step>
        </StepBox>
        <FormBox>
          {loading && <Loading />}
          {step === 1 && <Step1 type={type} setType={setType} />}
          {step === 2 && <Step2 body={body} setBody={setBody} />}
          {step === 3 && <Step3 tannin={tannin} setTannin={setTannin} />}
          {step === 4 && <Step4 acidity={acidity} setAcidity={setAcidity} />}
          {step === 5 && (
            <Step5 sweetness={sweetness} setSweetness={setSweetness} />
          )}
          <Bottom>
            <Button onClick={onClick}>{buttonName}</Button>
          </Bottom>
        </FormBox>
      </Container>
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

const StepBox = styled.div`
  width: 800px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
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

const Step = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0px 5px;

  & span {
    margin: 0px 10px;
    color: #222222;
    font-weight: 600;
  }
`;

const Num = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => (props.step ? "rgb(172, 45, 49)" : "#e2e2e2")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.step ? "white" : "rgb(46, 46, 46)")};
  font-weight: 900;
`;

const Line = styled.div`
  width: 50px;
  height: 3px;
  border-radius: 5px;
  background-color: ${(props) => (props.step ? "rgb(172, 45, 49)" : "#e2e2e2")};
`;

const Bottom = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-right: 30px;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  height: 30px;
  width: 100px;
  background-color: rgba(172, 45, 49);
  color: white;
  cursor: pointer;
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
`;
