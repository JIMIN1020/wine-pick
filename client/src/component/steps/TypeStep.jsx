import React from "react";
import styled from "styled-components";
import { FaWineBottle } from "react-icons/fa";

function TypeStep({ type, setOptions, onClick }) {
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
              onClick={() => setOptions((prev) => ({ ...prev, type: "Red" }))}
            />
            <Icon>
              <FaWineBottle style={{ width: "30px", height: "30px" }} />
            </Icon>
            <Desc>
              <h5>Red</h5>
              <span>적포도로 만든 레드 와인</span>
            </Desc>
          </TypeButton>
          <TypeButton selected={type === "White"}>
            <input
              type="radio"
              checked={type === "White"}
              readOnly
              onClick={() => setOptions((prev) => ({ ...prev, type: "White" }))}
            />
            <Icon>
              <FaWineBottle style={{ width: "30px", height: "30px" }} />
            </Icon>
            <Desc>
              <h5>White</h5>
              <span>청포도로 만든 화이트 와인</span>
            </Desc>
          </TypeButton>
          <TypeButton selected={type === "Sparkling"}>
            <input
              type="radio"
              checked={type === "Sparkling"}
              readOnly
              onClick={() =>
                setOptions((prev) => ({ ...prev, type: "Sparkling" }))
              }
            />
            <Icon>
              <FaWineBottle style={{ width: "30px", height: "30px" }} />
            </Icon>
            <Desc>
              <h5>Sparkling</h5>
              <span>탄산 기포가 있는 스파클링 와인</span>
            </Desc>
          </TypeButton>
          <TypeButton selected={type === "Rosé"}>
            <input
              type="radio"
              checked={type === "Rosé"}
              readOnly
              onClick={() => setOptions((prev) => ({ ...prev, type: "Rosé" }))}
            />
            <Icon>
              <FaWineBottle style={{ width: "30px", height: "30px" }} />
            </Icon>
            <Desc>
              <h5>Rosé</h5>
              <span>장미빛을 띄는 로제 와인</span>
            </Desc>
          </TypeButton>
          <TypeButton selected={type === "Dessert"}>
            <input
              type="radio"
              checked={type === "Dessert"}
              readOnly
              onClick={() =>
                setOptions((prev) => ({ ...prev, type: "Dessert" }))
              }
            />
            <Icon>
              <FaWineBottle style={{ width: "30px", height: "30px" }} />
            </Icon>
            <Desc>
              <h5>Dessert</h5>
              <span>장미빛을 띄는 로제 와인</span>
            </Desc>
          </TypeButton>
          <TypeButton selected={type === "Fortified"}>
            <input
              type="radio"
              checked={type === "Fortified"}
              readOnly
              onClick={() =>
                setOptions((prev) => ({ ...prev, type: "Fortified" }))
              }
            />
            <Icon>
              <FaWineBottle style={{ width: "30px", height: "30px" }} />
            </Icon>
            <Desc>
              <h5>Fortified</h5>
              <span>브랜디를 섞은 주정강화와인</span>
            </Desc>
          </TypeButton>
        </Wrapper>
      </Form>
      <Bottom>
        <Button onClick={onClick}>다음</Button>
      </Bottom>
    </Container>
  );
}

export default TypeStep;

const Container = styled.div`
  width: 100%;
  height: 400px;
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
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;

  display: grid;
  grid-template-columns: 230px 230px;
  grid-template-rows: 60px 60px 60px;
  gap: 20px;
`;

const TypeButton = styled.label`
  background-color: ${(props) =>
    props.selected ? "rgb(172, 45, 49, 1)" : "rgb(255, 255, 255)"};
  width: 230px;
  height: 60px;
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "rgb(65, 65, 65)")};
  border: 1px solid
    ${(props) =>
      props.selected ? "rgb(172, 45, 49, 1)" : "rgb(124, 124, 124)"};

  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 10px;

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

const Desc = styled.div`
  width: 170px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h5 {
    font-size: 16px;
    margin: 3px 0px;
  }

  span {
    font-size: 12px;
  }
`;

const Icon = styled.div`
  width: 50px;
  height: 30px;

  display: flex;
  justify-content: center;
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
