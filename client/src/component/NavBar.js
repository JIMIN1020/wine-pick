import React from "react";
import { styled } from "styled-components";
import { FaWineGlass } from "react-icons/fa";

const NavBar = () => {
  return (
    <Navigation>
      <AppName>
        <FaWineGlass className="icon" />
        Wine Bot
      </AppName>
      <span>About</span>
    </Navigation>
  );
};

export default NavBar;

const Navigation = styled.nav`
  width: 1200px;
  height: 70px;
  background-color: white;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 50px;

  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);

  span {
    font-size: 22px;
  }
`;

const AppName = styled.span`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-weight: 600;

  .icon {
    width: 20px;
    height: 20px;
    margin: 0px 10px;
  }
`;
