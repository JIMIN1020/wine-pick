import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaWineGlass } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";

const Header = () => {
  const [shadow, setShadow] = useState(false);

  /* ------------- 스크롤 시 헤더 그림자 부여 ------------- */
  useEffect(() => {
    // 핸들러 함수 -> 스크롤 될 시 true
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setShadow(isScrolled);
    };

    // scroll event
    window.addEventListener("scroll", handleScroll);

    // clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <HeaderBar shadow={shadow}>
      <Nav>
        <Links>
          <Logo to="/">
            <FaWineGlass className="icon" />
            Wine Pick!
          </Logo>
          <LinkItem to="/recommend">와인 추천</LinkItem>
          <LinkItem to="/pairing">페어링 추천</LinkItem>
        </Links>

        <LinkItem to="/about">
          <GrCircleInformation style={{ width: "22px", height: "22px" }} />
        </LinkItem>
      </Nav>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  width: 100vw;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: ${(props) =>
    props.shadow ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "none"};
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 1250px;
  box-sizing: border-box;
  padding: 0px 20px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #151515;
  font-size: 18px;
  font-weight: 500;
  margin: 10px;
  padding: 5px 7px;
  border-radius: 7px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Links = styled.div`
  display: flex;
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
