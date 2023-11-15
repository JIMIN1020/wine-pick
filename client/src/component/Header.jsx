import React from "react";
import styled from "styled-components";
import { FaWineGlass } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderBar>
      <Nav>
        <Logo to="/">
          <FaWineGlass className="icon" />
          Wine Bot
        </Logo>
        <LinkItem to="/recommend">추천받기</LinkItem>
        <LinkItem to="/pairing">페어링</LinkItem>
        <LinkItem to="/about">About</LinkItem>
      </Nav>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  width: 100vw;
  height: 80px;
  /* background-color: rgba(172, 45, 49); */
  background-color: white;
  display: flex;
  align-items: center;
  z-index: 999;

  position: fixed;
  top: 0;
  /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 1250px;
  margin: auto;
  display: flex;
  align-items: center;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #151515;
  font-size: 18px;
  font-weight: 500;
  margin: 10px;
  padding: 5px 7px;
  border-radius: 7px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 32px;
  color: rgba(172, 45, 49);
  margin-right: 15px;
  font-family: "Ubuntu", sans-serif;

  .icon {
    width: 30px;
    height: 30px;
    margin: 0px 10px;
  }
`;
