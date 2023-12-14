import React from "react";
import styled from "styled-components";

function KeywordStep({ keys, selected, setSelected, gptCall }) {
  return (
    <Container>
      <h3>특징 선택</h3>
      <p>이 음식의 특징과 관련된 키워드를 선택해주세요.</p>
      <p style={{ color: "gray", fontSize: "12px" }}>
        (ex. 갈비찜인데 간장만 사용한 경우)
      </p>
      <KeywordBox>
        {keys.map((key) => (
          <Keyword key={key} selected={selected.includes(key)}>
            <input
              type="checkbox"
              checked={selected.includes(key)}
              readOnly
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(key)
                    ? prev.filter((item) => item !== key)
                    : [...prev, key]
                )
              }
            />
            <span>{key}</span>
          </Keyword>
        ))}
      </KeywordBox>
      <Bottom>
        <Button onClick={gptCall}>추천받기</Button>
      </Bottom>
    </Container>
  );
}

export default KeywordStep;

const Container = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KeywordBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0px;
`;

const Keyword = styled.label`
  padding: 5px 10px;
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49)" : "#e2e2e2"};
  border-radius: 15px;
  color: ${(props) => (props.selected ? "white" : "black")};
  font-size: 14px;
  font-weight: 550;
  cursor: pointer;

  & input {
    width: 0;
    height: 0;
    display: none;
  }

  transition: transform 0.1s ease-in;
  &:hover {
    background-color: ${(props) =>
      props.selected ? "rgba(172, 45, 49)" : "#e2e2e2"};
    transform: scale(1.1);
  }
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
