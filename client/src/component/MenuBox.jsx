import React from "react";
import styled from "styled-components";
import { FaArrowRightLong } from "react-icons/fa6";

function MenuBox() {
  return (
    <Container>
      <Box>
        <h3>와인 추천받기</h3>
        <div>
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </div>
      </Box>
      <Box>
        <h3>페어링 추천받기</h3>
        <div>
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </div>
      </Box>
      <Box>
        <h3>About this App</h3>
        <div>
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </div>
      </Box>
    </Container>
  );
}

export default MenuBox;

const Container = styled.div`
  width: 100%;
  height: 400px;
  background-color: rgba(172, 45, 49, 0.248);
  /* background-color: #eae0db; */

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Box = styled.div`
  background-color: white;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid gray;

  box-sizing: border-box;
  padding: 30px;

  & h3 {
    margin: 0;
  }

  & div {
    display: flex;
    justify-content: flex-end;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
