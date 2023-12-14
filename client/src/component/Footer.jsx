import React from "react";
import styled from "styled-components";
import { SiGmail, SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Container>
      <Logo>Wine Pick!</Logo>
      <LinkBar>
        <LinkItem to="/">Home</LinkItem>
        <LinkItem to="/recommend">Recommend</LinkItem>
        <LinkItem to="/pairing">Pairing</LinkItem>
        <LinkItem to="/about">About</LinkItem>
      </LinkBar>
      <Copyright>ⓒ 2023. Jimin Ryu. All rights reserved.</Copyright>
      <Icons>
        <a href="mailto:jimins4920@gmail.com">
          <SiGmail className="icon" />
        </a>
        <a href="https://github.com/JIMIN1020/wine-pick">
          <SiGithub className="icon" />
        </a>
      </Icons>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  width: 100vw;
  padding: 20px 0px;
  box-sizing: border-box;
  background-color: rgba(172, 45, 49, 0.8);
  color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.span`
  display: flex;
  align-items: center;
  font-weight: 550;
  font-size: 22px;
  font-family: "Ubuntu", sans-serif;
  margin: 10px 0px;
`;

const LinkBar = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #efefef;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  height: 16px;

  &:hover {
    border-bottom: 0.7px solid white;
  }
`;

const Copyright = styled.span`
  font-size: 12px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;

  & a {
    color: #efefef;
    cursor: pointer;
    margin: 0px 10px;
  }

  .icon {
    width: 22px;
    height: 22px;
  }
`;
