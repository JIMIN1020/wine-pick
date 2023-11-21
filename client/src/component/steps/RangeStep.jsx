import React, { useState } from "react";
import styled from "styled-components";

function RangeStep({ name, state, setState, first, last }) {
  const [step, setStep] = useState(1);
  return (
    <Container>
      <Title>
        <h1>{name} 선택</h1>
        <p>원하는 와인의 타입을 선택해주세요.</p>
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
    </Container>
  );
}

export default RangeStep;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  & h1 {
    margin: 0;
    font-size: 28px;
  }

  & p {
    margin: 10px 0px;
  }
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
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
