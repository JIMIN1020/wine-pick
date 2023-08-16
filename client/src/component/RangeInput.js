import React from "react";
import { styled } from "styled-components";

const RangeInput = ({ title, left, right, padding, value, setValue }) => {
  return (
    <Container>
      <h4>{title}</h4>
      <RangeBox $padding={padding}>
        <span>{left}</span>
        <Range>
          <Option selected={value === "1"}>
            <input
              type="radio"
              checked={value === "1"}
              readOnly
              onClick={() => setValue("1")}
            />
            <span>1</span>
          </Option>
          <Option selected={value === "2"}>
            <input
              type="radio"
              checked={value === "2"}
              readOnly
              onClick={() => setValue("2")}
            />
            <span>2</span>
          </Option>
          <Option selected={value === "3"}>
            <input
              type="radio"
              checked={value === "3"}
              readOnly
              onClick={() => setValue("3")}
            />
            <span>3</span>
          </Option>
          <Option selected={value === "4"}>
            <input
              type="radio"
              checked={value === "4"}
              readOnly
              onClick={() => setValue("4")}
            />
            <span>4</span>
          </Option>
          <Option selected={value === "5"}>
            <input
              type="radio"
              checked={value === "5"}
              readOnly
              onClick={() => setValue("5")}
            />
            <span>5</span>
          </Option>
        </Range>
        <span>{right}</span>
      </RangeBox>
    </Container>
  );
};

export default RangeInput;

const Container = styled.div`
  width: 550px;
  height: auto;
  margin: 10px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin: 10px 0;
  }
`;

const RangeBox = styled.div`
  display: flex;
  width: 600px;
  justify-content: center;
  box-sizing: border-box;
  padding-left: ${(props) => (props.$padding === "true" ? "25px" : "0")};
`;

const Range = styled.div`
  width: 350px;
  height: 20px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: rgb(236, 236, 236);

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
`;

const Option = styled.label`
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49, 1)" : "rgb(236, 236, 236)"};
  font-size: 10px;
  padding: 0px 20px;
  height: 15px;
  border-radius: 30px;
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
