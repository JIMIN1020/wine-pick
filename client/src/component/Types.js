import React from "react";
import { styled } from "styled-components";

const Types = ({ type, setType }) => {
  return (
    <Container>
      <h4>와인 종류</h4>
      <div>
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
        {/* <TypeButton selected={selected === "Champagne"}>
          <input
            type="radio"
            checked={selected === "Champagne"}
            onClick={() => setSelected("Champagne")}
          />
          <span>Champagne</span>
        </TypeButton> */}
      </div>
    </Container>
  );
};

export default Types;

const Container = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin: 10px 0px;
  }

  div {
    display: flex;
  }
`;

const TypeButton = styled.label`
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49, 1)" : "rgb(236, 236, 236)"};
  font-size: 16px;
  font-weight: 550;
  padding: 0px 12px;
  height: 30px;
  border-radius: 30px;
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
`;
