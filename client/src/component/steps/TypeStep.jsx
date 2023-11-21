import React from "react";
import styled from "styled-components";

function TypeStep({ type, setType }) {
  return (
    <Container>
      <Title>
        <h1>타입 선택</h1>
        <p>원하는 와인의 타입을 선택해주세요.</p>
      </Title>
      <Form>
        <Wrapper>
          <TypeButton selected={type === "Red"}>
            <input
              type="radio"
              checked={type === "Red"}
              readOnly
              onClick={() => setType("Red")}
            />
            <span>Red</span>
          </TypeButton>
          <TypeButton selected={type === "White"}>
            <input
              type="radio"
              checked={type === "White"}
              readOnly
              onClick={() => setType("White")}
            />
            <span>White</span>
          </TypeButton>
          <TypeButton selected={type === "Sparkling"}>
            <input
              type="radio"
              checked={type === "Sparkling"}
              readOnly
              onClick={() => setType("Sparkling")}
            />
            <span>Sparkling</span>
          </TypeButton>
          <TypeButton selected={type === "Rosé"}>
            <input
              type="radio"
              checked={type === "Rosé"}
              readOnly
              onClick={() => setType("Rosé")}
            />
            <span>Rosé</span>
          </TypeButton>
          <TypeButton selected={type === "Dessert"}>
            <input
              type="radio"
              checked={type === "Dessert"}
              readOnly
              onClick={() => setType("Dessert")}
            />
            <span>Dessert</span>
          </TypeButton>
          <TypeButton selected={type === "Fortified"}>
            <input
              type="radio"
              checked={type === "Fortified"}
              readOnly
              onClick={() => setType("Fortified")}
            />
            <span>Fortified</span>
          </TypeButton>
        </Wrapper>
      </Form>
    </Container>
  );
}

export default TypeStep;

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
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;

  display: grid;
  grid-template-columns: 180px 180px 180px;
  grid-template-rows: 50px 50px;
  gap: 20px;
`;

const TypeButton = styled.label`
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49, 1)" : "rgb(255, 255, 255)"};
  width: 180px;
  height: 50px;
  font-size: 16px;
  font-weight: 550;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "rgb(65, 65, 65)")};
  border: 1px solid
    ${(props) =>
      props.selected ? "rgb(172, 45, 49, 1)" : "rgb(124, 124, 124)"};

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
