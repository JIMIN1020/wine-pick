# Wine Bot

> https://wine-bot.netlify.app/

**React, Node.js**를 기반으로 개발한 와인 추천 앱입니다.

사용자가 와인에 대한 취향을 입력하고 **`추천받기`** 버튼을 클릭하면, 취향에 맞는 와인을 추천받을 수 있습니다.

입력 값에 따라 그에 맞는 와인을 찾는 과정은 **Chat GPT API (OpenAI API**를 활용하였고, **Naver Search API**를 통해 와인에 대한 정보를 가져오는 방식으로 구성되었습니다.

<br>

## 개발 기간

2023.08.15 ~ 2023.08.20 (약 5일)

<br>

## 기술 스택 & 사용한 라이브러리

### 기술 스택

- React
- Node.js (Express)

### 배포

- Netlify
- Fly.io

### API

- OpenAI API (Chat GPT)
- Naver Search API

### 라이브러리

- axios
- react-icons
- lottie-react
- styled-components
- react-router-dom
- react-type-animation
- react-spinners

<br>

## 한계점

1. Chat GPT의 추천이 때로는 적절하지 않습니다.

2. 추천한 와인에 대한 정보를 Naver로부터 받아오는 과정에서, 관련 없는 정보(ex. 산지, 와이너리)가 나타나기도 합니다.

3. 네이버 API로부터 받아온 이미지 데이터가 http 경로로 되어있어서 엑박이 뜨는 문제를 처리했는데 다른 PC, 브라우저에서 여전히 엑박이 뜰 수 있습니다.