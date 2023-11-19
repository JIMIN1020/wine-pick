// 필요한 모듈 불러오기
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const https = require("https");
const axios = require("axios");
const axiosInstance = axios.create({
  // baseURL: "https://wine-bot.fly.dev",
  baseURL: "http://localhost:4000",
});
const { run } = require("./vivino");
const app = express(); // app에 express 담기 -> 이를 통해 서버 관리!

// body-parser 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));

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
app.post("/api/chat", async (req, res) => {
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
app.post("/api/search/encyc", function (req, res) {
  var api_url =
    "https://openapi.naver.com/v1/search/encyc?query=" +
    encodeURI(req.body.query) +
    "&display=1";
  var request = require("request");
  var options = {
    url: api_url,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
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

/* ------------- Vivino API ------------- */
app.post("/vivino", async function (req, res) {
  const { query: wines } = req.body;
  console.log("wine->", wines);

  // vivino API call
  const result = await Promise.all(
    wines.map(async (wine) => {
      let info = await run(wine);

      try {
        // Call the /translate API and update the info
        const translationResult = await axiosInstance.post("/translate", {
          name: info.name,
        });
        info.ko_name = translationResult.data;
      } catch (err) {
        console.log("Error response:", err);
      }

      return info;
    })
  );

  res.send(result);
});

/* ------------- Papago API ------------- */
app.post("/translate", function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  var options = {
    url: api_url,
    form: { source: "fr", target: "ko", text: req.body.name },
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const responseBody = JSON.parse(body);
      const translationResult = responseBody.message.result.translatedText;
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(translationResult);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
