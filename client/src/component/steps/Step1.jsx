import React from "react";
import styled from "styled-components";

function Step1({ type, setType }) {
  return (
    <Container>
      <Title>와인 종류</Title>
      <Form>
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
      </Form>
    </Container>
  );
}

export default Step1;

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
