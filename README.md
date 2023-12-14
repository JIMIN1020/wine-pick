# Wine Pick!

> https://wine-bot.netlify.app/

![wine gif](https://github.com/JIMIN1020/wine-bot/assets/121474189/38b4e7cd-f4b3-4d5a-80ac-28d75d41e924)

**React, Node.js**를 기반으로 개발한 와인 추천 앱입니다.

사용자가 와인에 대한 취향을 입력하고 **`추천받기`** 버튼을 클릭하면, 취향에 맞는 와인을 추천받을 수 있습니다.

추천 받은 와인을 클릭하면 해당 와인의 상세 정보 페이지(외부 URL)로 이동합니다.

입력 값에 따라 그에 맞는 와인을 찾는 과정은 **Chat GPT API**(OpenAI API)를 활용하였고, **Naver Search API**를 통해 와인에 대한 정보를 가져오는 방식으로 구성되었습니다.

<br>

<br>

## 유의사항

1. Chat GPT의 추천이 때로는 적절하지 않습니다.

2. 추천한 와인에 대한 정보를 Naver로부터 받아오는 과정에서, 관련 없는 정보(ex. 산지, 와이너리)가 나타나기도 합니다.

3. 네이버 API로부터 받아온 이미지 데이터가 http 경로로 되어있어서 엑박이 뜨는 문제를 아직 완벽히 해결하지 못해 이미지가 안보일 수 있습니다.

<br>

## 기술 스택 & 사용한 라이브러리

<img width="1017" alt="스크린샷 2023-08-28 오후 2 01 29" src="https://github.com/JIMIN1020/wine-bot/assets/121474189/374f6f69-a19f-441c-b967-cd6ecdf38415">

<br>
<br>
