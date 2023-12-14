import React from "react";
import styled from "styled-components";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function MenuBox() {
  return (
    <Container>
      <Box>
        <div>
          <h3>와인 추천받기</h3>
          <span>원하는 취향에 맞는 와인을 추천받을 수 있습니다.</span>
        </div>

        <LinkItem to="/recommend">
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </LinkItem>
      </Box>
      <Box>
        <div>
          <h3>페어링 추천받기</h3>
          <span>음식과 페어링할 와인을 추천받을 수 있습니다.</span>
        </div>

        <LinkItem to="/pairing">
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </LinkItem>
      </Box>
      <Box>
        <div>
          <h3>About</h3>
          <span>이 어플리케이션에 대한 정보입니다.</span>
        </div>

        <LinkItem to="/about">
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </LinkItem>
      </Box>
    </Container>
  );
}

export default MenuBox;

const Container = styled.div`
  width: 100%;
  height: 350px;
  /* background-color: rgba(172, 45, 49, 0.248); */
  background-color: rgba(172, 45, 49, 0.7);
  /* background-color: #d8d8d8; */

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Box = styled.div`
  background-color: white;
  width: 300px;
  height: 180px;
  border-radius: 10px;
  border: 1px solid gray;

  box-sizing: border-box;
  padding: 30px;

  & h3 {
    margin: 0;
    margin-bottom: 10px;
  }

  & span {
    font-size: 14px;
    color: #646464;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #151515;
  display: flex;
  justify-content: flex-end;
`;
