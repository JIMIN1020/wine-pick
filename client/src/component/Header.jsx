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
        <LinkItem to="/recommend">Recommend</LinkItem>
        <LinkItem to="/pairing">Pairing</LinkItem>
        <LinkItem to="/about">About</LinkItem>
      </Nav>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  width: 100vw;
  height: 80px;
  background-color: rgba(172, 45, 49);
  display: flex;
  align-items: center;
  z-index: 999;

  position: fixed;
  top: 0;
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
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
  padding: 5px 7px;
  border-radius: 7px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 32px;
  color: white;
  margin-right: 15px;

  .icon {
    width: 30px;
    height: 30px;
    margin: 0px 10px;
  }
`;
