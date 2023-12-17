// 필요한 모듈 불러오기
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const https = require("https");
const puppeteer = require("puppeteer");
const minimist = require("minimist");

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
app.post("/api/vivino", async function (req, res) {
  const { query: wines } = req.body;
  // const code = {
  //   France: "fr",
  //   Italy: "it",
  //   Germany: "de",
  //   Spain: "es",
  // };

  // const getCode = (country) => {
  //   return code.hasOwnProperty(country) ? code[country] : "en";
  // };

  let result = {};
  try {
    result = await run(wines);

    // Call the /translate API and update the info
    // for (const wine of result) {
    //   const translationResult = await axiosInstance.post("/translate", {
    //     name: wine.name,
    //     code: getCode(wine.country),
    //   });
    //   wine.ko_name = translationResult.data;
    // }
    res.send(result);
  } catch (err) {
    console.log("Error response:", err);
  }
});

/* ------------- Papago API ------------- */
app.post("/api/translate", function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  var options = {
    url: api_url,
    form: { source: req.body.code, target: "ko", text: req.body.name },
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

const run = async (
  names,
  countryCode = "US",
  stateCode = "",
  minPrice,
  maxPrice,
  noPriceIncluded,
  minRatings,
  maxRatings,
  minAverage,
  maxAverage
) => {
  let result = [];

  // set country and state
  const setShipTo = async (countryCode, stateCode) => {
    return await page.evaluate(
      async (countryCode, stateCode) => {
        const fetchResult = await fetch("https://www.vivino.com/api/ship_to/", {
          headers: {
            "content-type": "application/json",
            "x-csrf-token": document.querySelector('[name="csrf-token"]')
              .content,
          },
          body: JSON.stringify({
            country_code: countryCode,
            state_code: stateCode,
          }),
          method: "PUT",
        });
        if (fetchResult.status === 200) {
          const result = await fetchResult.json();
          if (
            result.ship_to.country_code.toLowerCase() ===
              countryCode.toLowerCase() &&
            result.ship_to.state_code.toLowerCase() === stateCode.toLowerCase()
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      countryCode,
      stateCode
    );
  };

  // check country and state
  const isShipTo = async (countryCode, stateCode) => {
    return await page.evaluate(
      (countryCode, stateCode) => {
        if (
          countryCode.toLowerCase() ===
            window.__PRELOADED_COUNTRY_CODE__.toLowerCase() &&
          stateCode.toLowerCase() ===
            window.__PRELOADED_STATE_CODE__.toLowerCase()
        ) {
          return true;
        }
        return false;
      },
      countryCode,
      stateCode
    );
  };

  // collect items from the page
  const collectItems = () => {
    const numerize = (stringNumber) => {
      const str = stringNumber.replace(/[^0-9,.]+/g, "").replace(",", ".");
      return parseFloat(str);
    };

    const CARDS_SELECTOR = ".card.card-lg";
    const NAME_SELECTOR = ".wine-card__name";
    const COUNTRY_SELECTOR = '.wine-card__region [data-item-type="country"]';
    const REGION_SELECTOR = ".wine-card__region .link-color-alt-grey";
    const AVERAGE_RATING_SELECTOR = ".average__number";
    const RATINGS_SELECTOR = ".average__stars .text-micro";
    const RATING_REPLACMENT = "ratings";
    const LINK_SELECTOR = "a";
    const THUMB_SELECTOR = "figure";
    const THUMB_REGEX = /"(.*)"/;
    const PRICE_SELECTOR = ".wine-price-value";

    try {
      const data = [...document.querySelectorAll(CARDS_SELECTOR)].map((e) => {
        const name = e.querySelector(NAME_SELECTOR).textContent.trim();
        const link = e.querySelector(LINK_SELECTOR).href;
        const thumb = e.querySelector(THUMB_SELECTOR)
          ? "https:" +
            e
              .querySelector(THUMB_SELECTOR)
              .style.backgroundImage.match(THUMB_REGEX)[1]
          : undefined;
        const country = e.querySelector(COUNTRY_SELECTOR).textContent.trim();
        const region = e.querySelector(REGION_SELECTOR).textContent.trim();
        const average_rating = e.querySelector(AVERAGE_RATING_SELECTOR)
          ? numerize(
              e.querySelector(AVERAGE_RATING_SELECTOR).textContent.trim()
            )
          : undefined;
        const ratings = e.querySelector(RATINGS_SELECTOR)
          ? Number(
              e
                .querySelector(RATINGS_SELECTOR)
                .textContent.replace(RATING_REPLACMENT, "")
                .trim()
            )
          : undefined;
        const price = e.querySelector(PRICE_SELECTOR)
          ? numerize(e.querySelector(PRICE_SELECTOR).textContent.trim())
          : undefined;

        return {
          name: name,
          link: link,
          thumb: thumb,
          country: country,
          region: region,
          average_rating: average_rating,
          ratings: ratings,
          price: price,
        };
      });
      return data;
    } catch (err) {
      // result.status = "NO_RESULT";
      console.log("[evaluation error]: " + err.message);
    }
  };

  // Set default state for the US
  if (countryCode.toLowerCase() === "us" && stateCode === "") {
    stateCode = "CA";
  }

  const BASE_URL = "https://www.vivino.com";
  const SEARCH_PATH = "/search/wines?q=";
  const STATUS_FULL = "FULL_DATA";
  const STATUS_ERROR_RESPONSE = "RESPONSE_ERROR";
  const STATUS_ERROR_SHIP_TO = "SHIP_TO_ERROR";
  const STATUS_ERROR_SHIP_TO_CONFIRM = "SHIP_TO_CONFIRM_ERROR";
  const STATUS_ERROR_EXCEPTION = "SOME_EXCEPTION";
  const PAUSE_MULTIPLIER = 1;

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath: "/usr/bin/chromium",
    defaultViewport: { width: 1920, height: 1040 },
    devtools: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // need to set User Agent else an empty result
  // it seems they detect headless Chrome
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  );

  // To save bandwidth block all types of requests except "document", "xhr", "fetch"
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (
      ["document", "xhr", "fetch", "script"].includes(request.resourceType())
    ) {
      request.continue();
    } else {
      request.abort();
    }
  });

  try {
    page.setDefaultNavigationTimeout(0);

    // load home page
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    // check the country and state
    let isDestinationRight = await isShipTo(countryCode, stateCode);
    if (!isDestinationRight) {
      // set country and state
      const resultSetShipTo = await setShipTo(countryCode, stateCode);
      if (resultSetShipTo) {
        await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
        // check the country and state
        isDestinationRight = await isShipTo(countryCode, stateCode);
        if (!isDestinationRight) {
          // console.log('"Ship To" changing can not be confirmed!');
          result.status = STATUS_ERROR_SHIP_TO_CONFIRM;
          return;
        }
      } else {
        // console.log('"Ship To" was not changed!');
        result.status = STATUS_ERROR_SHIP_TO;
        return;
      }
    }

    for (const name of names) {
      let index = 1;
      let pause = 0;
      let data = [];
      while (!data || data.length < 1) {
        const response = await page.goto(
          `${BASE_URL}${SEARCH_PATH}${name}&start=${index}`,
          {
            waitUntil: "domcontentloaded",
          }
        );

        if (response.ok()) {
          pause = 0;
          const pageItems = await page.evaluate(collectItems);
          if (pageItems.length) {
            // console.log("Results were collected from the page:", index);
            data.push(...pageItems);
            index++;
          } else {
            // no more data
            result.status = STATUS_FULL;
          }
        } else if (response.status() === 429) {
          pause++;
          await page.waitForTimeout(pause * PAUSE_MULTIPLIER * 1000);
          console.log(
            `Waited for ${
              pause * PAUSE_MULTIPLIER
            } seconds on the page ${index}`
          );
        } else {
          // return some error info
          result.http_status = response.status(); // http status
          result.page_index = index; // index of the problem page
          result.status = STATUS_ERROR_RESPONSE;
        }
      }
      result.push(data[0]);
    }
    return result;
  } catch (error) {
    result.status = STATUS_ERROR_EXCEPTION;
    result.message = error;
    console.log("Exception:", error);
  } finally {
    // console.log("Finish!");

    await browser.close();
  }
};
