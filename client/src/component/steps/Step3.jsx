import React from "react";
import styled from "styled-components";

function Step3({ tannin, setTannin }) {
  return (
    <Container>
      <Title>타닌 선택</Title>
      <Form>
        <TypeButton selected={tannin === "low"}>
          <input
            type="radio"
            checked={tannin === "low"}
            readOnly
            onClick={() => setTannin("low")}
          />
          <span>low</span>
        </TypeButton>
        <TypeButton selected={tannin === "medium-"}>
          <input
            type="radio"
            checked={tannin === "medium-"}
            readOnly
            onClick={() => setTannin("medium-")}
          />
          <span>medium-</span>
        </TypeButton>
        <TypeButton selected={tannin === "medium"}>
          <input
            type="radio"
            checked={tannin === "medium"}
            readOnly
            onClick={() => setTannin("medium")}
          />
          <span>medium</span>
        </TypeButton>
        <TypeButton selected={tannin === "medium+"}>
          <input
            type="radio"
            checked={tannin === "medium+"}
            readOnly
            onClick={() => setTannin("medium+")}
          />
          <span>medium+</span>
        </TypeButton>
        <TypeButton selected={tannin === "strong"}>
          <input
            type="radio"
            checked={tannin === "strong"}
            readOnly
            onClick={() => setTannin("strong")}
          />
          <span>strong</span>
        </TypeButton>
      </Form>
    </Container>
  );
}

export default Step3;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  height: 70px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 280px;
  gap: 20px;
  align-items: center;
`;

const TypeButton = styled.label`
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49, 1)" : "rgb(236, 236, 236)"};
  width: 100px;
  height: 200px;
  font-size: 16px;
  font-weight: 550;
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "rgb(25, 25, 25)")};

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 0px;
    height: 0px;
    display: none;
    font-size: 13px;
  }

  &:hover {
    background-color: ${(props) =>
      props.selected ? "rgb(172, 45, 49, 1)" : "rgb(214, 214, 214)"};
  }
`;