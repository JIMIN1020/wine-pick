const express = require("express"); // express 모듈 불러오기
const app = express(); // app에 express 담기 -> 이를 통해 서버 관리!

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
