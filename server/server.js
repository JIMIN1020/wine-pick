// 필요한 모듈 불러오기
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express(); // app에 express 담기 -> 이를 통해 서버 관리!

// body-parser 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// port 할당: 0~65535 사이의 정수로된 임의의 숫자
const PORT = process.env.PORT || 4000;

// 서버를 실행했을 때 응답 출력하기 -> get
app.get("/", (req, res) => {
  res.send(`Response Complate`);
});

// 서버 실행하기 -> listen
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

/* ------------- OpenAI API ------------- */
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// endpoint for chat GPT
app.post("/chat", async (req, res) => {
  // 요청값 -> 메세지 받아오기
  const messages = req.body;

  // 요청 데이터
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  // response
  res.send(chatCompletion.data.choices[0].message.content);
});

/* ------------- Naver API ------------- */
app.post("/search/encyc", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/encyc?query=" +
    encodeURI(req.body.query) +
    "&display=1";
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
