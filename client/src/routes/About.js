import React from "react";
import { styled } from "styled-components";

const About = () => {
  return (
    <>
      <FormBox>d</FormBox>
    </>
  );
};

export default About;

const FormBox = styled.div`
  width: 95%;
  height: 600px;
  border-radius: 10px;
  margin: 0 0;
  position: relative;

  display: flex;

  background-color: white;
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
`;
