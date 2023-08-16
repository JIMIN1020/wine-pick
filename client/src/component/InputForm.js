import React, { useState } from "react";
import { styled } from "styled-components";
import RangeInput from "./RangeInput";
import Types from "./Types";

const InputForm = ({ onSendClick }) => {
  const [type, setType] = useState("Red");
  const [body, setBody] = useState("3");
  const [tannin, setTannin] = useState("3");
  const [sweetness, setSweetness] = useState("3");
  const [acidity, setAcidity] = useState("3");

  /* ------------- 취향 기반 메세지 만들기 ------------- */
  const makeMessage = () => {
    let msg = { type: type, body: "", tannin: "", sweetness: "", acidity: "" };
    switch (body) {
      case "1":
        msg.body = "light";
        break;
      case "2":
        msg.body = "light-medium";
        break;
      case "3":
        msg.body = "medium";
        break;
      case "4":
        msg.body = "medium-full";
        break;
      case "5":
        msg.body = "full";
        break;
      default:
        break;
    }
    switch (tannin) {
      case "1":
        msg.tannin = "smooth";
        break;
      case "2":
        msg.tannin = "a bit smooth";
        break;
      case "3":
        msg.tannin = "medium";
        break;
      case "4":
        msg.tannin = "medium-strong";
        break;
      case "5":
        msg.tannin = "strong";
        break;
      default:
        break;
    }
    switch (sweetness) {
      case "1":
        msg.sweetness = "low";
        break;
      case "2":
        msg.sweetness = "low-medium";
        break;
      case "3":
        msg.sweetness = "medium";
        break;
      case "4":
        msg.sweetness = "medium-high";
        break;
      case "5":
        msg.sweetness = "high";
        break;
      default:
        break;
    }
    switch (acidity) {
      case "1":
        msg.acidity = "low";
        break;
      case "2":
        msg.acidity = "low-medium";
        break;
      case "3":
        msg.acidity = "medium";
        break;
      case "4":
        msg.acidity = "medium-high";
        break;
      case "5":
        msg.acidity = "high";
        break;
      default:
        break;
    }

    onSendClick(msg);
  };
  return (
    <Container>
      <h3>&#x2728; 원하는 취향 입력하기 &#x2728;</h3>
      <Wrapper>
        <Types type={type} setType={setType} />
        <RangeInput
          title="바디"
          left="Light"
          right="Full"
          value={body}
          padding="false"
          setValue={setBody}
        />
        <RangeInput
          title="타닌"
          left="Smooth"
          right="Tannic"
          value={tannin}
          padding="false"
          setValue={setTannin}
        />
        <RangeInput
          title="당도"
          left="Dry"
          right="Sweet"
          value={sweetness}
          padding="true"
          setValue={setSweetness}
        />
        <RangeInput
          title="산도"
          left="Soft"
          right="Acidic"
          value={acidity}
          padding="true"
          setValue={setAcidity}
        />
      </Wrapper>
      <SubmitButton onClick={makeMessage}>추천받기</SubmitButton>
    </Container>
  );
};

export default InputForm;

const Container = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */

  h3 {
    font-size: 22px;
    margin-top: 30px;
    margin-bottom: 10px;
    height: 40px;
    display: flex;
    align-items: center;
  }
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 100px;
  margin: 30px 0px;
  padding: 5px 20px;
  font-size: 16px;
  font-weight: bold;
  background: none;
  border: none;
  border-radius: 10px;
  background-color: rgb(172, 45, 49, 1);
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.07);
  }
`;

const Wrapper = styled.div`
  width: 550px;
  box-sizing: border-box;
  padding: 15px 0px;
  padding-bottom: 10px;
  /* border: 2px solid lightgray; */
  border-radius: 10px;
`;
