import React from "react";
import { styled } from "styled-components";
import { FaWineGlass } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navigation>
      <Link to="/" style={{ textDecoration: "none", color: "rgb(25, 25, 25)" }}>
        <AppName>
          <FaWineGlass className="icon" />
          Wine Bot
        </AppName>
      </Link>
      <Link
        to="/about"
        style={{ textDecoration: "none", color: "rgb(25, 25, 25)" }}
      >
        <About>About</About>
      </Link>
    </Navigation>
  );
};

export default NavBar;

const Navigation = styled.nav`
  width: 100%;
  height: 70px;
  /* background-color: rgba(256, 256, 256, 0.97); */
  border-radius: 30px;
  margin-top: 10px;
  margin-bottom: 50px;

  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding-left: 20px;
  /* box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1); */
`;

const AppName = styled.span`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-weight: 600;
  color: white;
  font-size: 35px;

  .icon {
    width: 30px;
    height: 30px;
    margin: 0px 10px;
  }
`;

const About = styled.span`
  width: 83px;
  height: 35px;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 550;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
