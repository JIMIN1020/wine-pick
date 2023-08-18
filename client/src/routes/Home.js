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
  const [wineData, setWineData] = useState([
    {
      description:
        "테이스팅 노트 신선하면서 균형이 잘 잡힌 전형적인 끼안티 클라시코의 특성이 잘 표현된 와인입니다. 산지오베제의 특성이 매력적으로 표현되어 적절한 산도와 탄닌의 조화가 인상적입니다. 현대적인... ",
      link: "https://terms.naver.com/entry.naver?docId=801483&cid=48185&categoryId=48300",
      thumbnail:
        "http://openapi-dbscthumb.phinf.naver.net/3165_000_1/20140612183139303_9SVI1DTLF.jpg/B68712.jpg?type=m160_160",
      title: "반피끼안티클라시코",
    },
    {
      description: "",
      link: "https://terms.naver.com/entry.naver?docId=2840704&cid=48185&categoryId=48300",
      thumbnail:
        "http://openapi-dbscthumb.phinf.naver.net/3165_000_4/20170929032813631_4859EICUT.jpg/W0142610.jpg?type=m160_160",
      title: "란 크리안자 2017",
    },
    {
      description:
        "붉은 과일류의 진한 아로마가 향신료, 가죽, 블랙 체리의 향과 조화를 이루어 후각을 흥미롭게 한다. 살짝 달콤한 향이 감돌며 부드럽고 긴 여운을 남기는 메를로에 시라의 진득한 과실향의 캐릭터가 더해져... ",
      link: "https://terms.naver.com/entry.naver?docId=2837507&cid=48185&categoryId=48300",
      thumbnail:
        "http://openapi-dbscthumb.phinf.naver.net/3165_000_12/20220316014104601_D22SBHFX9.png/T0158270_004.png?type=m160_160",
      title: "샤토 생 미셸, 컬럼비아 밸리 메를로 2017",
    },
  ]); // 네이버에게 전달받은 와인 데이터
  const [loading, setLoading] = useState(false); // 로딩중 사인

  const wineBoxRef = useRef(null);

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
        await axios
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
    await axios
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
  width: 95%;
  height: 600px;
  border-radius: 10px;
  margin: 0 0;
  position: relative;

  display: flex;

  background-color: rgba(256, 256, 256, 0.97);
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
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
