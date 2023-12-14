import React from "react";
import styled from "styled-components";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function MenuBox() {
  return (
    <Container>
      <Box>
        <h3>와인 추천받기</h3>
        <LinkItem to="/recommend">
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </LinkItem>
      </Box>
      <Box>
        <h3>페어링 추천받기</h3>
        <LinkItem to="/pairing">
          <FaArrowRightLong style={{ width: "30px", height: "20px" }} />
        </LinkItem>
      </Box>
      <Box>
        <h3>About</h3>
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
  background-color: rgba(172, 45, 49, 0.5);
  /* background-color: #eae0db; */

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Box = styled.div`
  background-color: white;
  width: 300px;
  height: 170px;
  border-radius: 10px;
  border: 1px solid gray;

  box-sizing: border-box;
  padding: 30px;

  & h3 {
    margin: 0;
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
