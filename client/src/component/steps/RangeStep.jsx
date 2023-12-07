import React, { useState } from "react";
import styled from "styled-components";

const description = {
  바디감:
    "바디감은 입안에서 느껴지는 와인의 무게감을 뜻합니다.\n보통 타닌이 풍부할 수록, 알코올 도수가 높을 수록 와인의 바디감은 높게 느껴집니다.",
  타닌: "타닌은 와인에서 떫은 맛을 내는 성분입니다.\n일반적인 레드와인은 medium 정도의 타닌을 가지고 있으며, 타닌이 풍부할수록 바디감이 높아집니다.",
  산도: "산도는 와인에서 느껴지는 신 맛의 정도를 말합니다.\n산도는 레드 와인, 화이트 와인에 모두 존재하며 산도가 높을 수록 힘과 견고함을 가집니다.",
  당도: "당도는 와인에서 느껴지는 단 맛의 정도를 말합니다.\n일반적인 레드 와인, 화이트 와인은 거의 대부분의 와인이 dry type에 속합니다.",
};

function RangeStep({
  name,
  state,
  setState,
  first,
  last,
  onClick,
  buttonName,
  setMainStep,
}) {
  const [step, setStep] = useState(1);

  return (
    <Container>
      <Title>
        <h1>{name} 선택</h1>
        <p>{description[name]}</p>
      </Title>
      <Form>
        <TypeButton>
          <Radio
            type="radio"
            checked={state === first}
            readOnly
            selected={step >= 1}
            onClick={() => {
              setState(first);
              setStep(1);
            }}
          />
          <span>{first}</span>
        </TypeButton>
        <TypeButton>
          <Radio
            type="radio"
            checked={state === "medium-"}
            readOnly
            selected={step >= 2}
            onClick={() => {
              setState("medium-");
              setStep(2);
            }}
          />
          <span>medium-</span>
        </TypeButton>
        <TypeButton>
          <Radio
            type="radio"
            checked={state === "medium"}
            readOnly
            selected={step >= 3}
            onClick={() => {
              setState("medium");
              setStep(3);
            }}
          />
          <span>medium</span>
        </TypeButton>
        <TypeButton>
          <Radio
            type="radio"
            checked={state === "medium+"}
            readOnly
            selected={step >= 4}
            onClick={() => {
              setState("medium+");
              setStep(4);
            }}
          />
          <span>medium+</span>
        </TypeButton>
        <TypeButton>
          <Radio
            type="radio"
            checked={state === last}
            readOnly
            selected={step >= 5}
            onClick={() => {
              setState(last);
              setStep(5);
            }}
          />
          <span>{last}</span>
        </TypeButton>
      </Form>
      <Bottom>
        <Button onClick={() => setMainStep((prev) => prev - 1)}>Back</Button>
        <Button onClick={onClick}>{buttonName}</Button>
      </Bottom>
    </Container>
  );
}

export default RangeStep;

const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  & h1 {
    margin: 10px 0px;
    font-size: 28px;
  }

  & p {
    margin: 10px 0px;
    white-space: pre-wrap;
    text-align: center;
    line-height: 30px;
  }
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;
  gap: 20px;
  align-items: center;
`;

const TypeButton = styled.label`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Radio = styled.input`
  width: 40px;
  height: 40px;
  font-size: 13px;
  appearance: none;
  margin-bottom: 10px;
  cursor: pointer;

  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.selected ? "rgb(172, 45, 49, 1)" : "rgb(89, 89, 89)")};
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49, 1)" : "rgb(255, 255, 255)"};

  transition: transform 0.1s ease-in;
  &:hover {
    background-color: ${(props) =>
      props.selected ? "rgba(172, 45, 49)" : "rgb(214, 214, 214)"};
    transform: scale(1.1);
  }
`;

const Bottom = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  height: 40px;
  width: 100px;
  background-color: rgba(172, 45, 49);
  color: white;
  cursor: pointer;
  margin: 10px;
  font-weight: 600;

  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
