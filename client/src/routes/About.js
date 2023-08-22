import React from "react";
import { styled } from "styled-components";
import {
  FaGitAlt,
  FaGithub,
  FaAws,
  FaReact,
  FaNodeJs,
  FaKeyboard,
  FaFly,
  FaSpinner,
} from "react-icons/fa";
import { BiLogoJavascript, BiSolidDownArrow } from "react-icons/bi";
import { PiCursorClickFill, PiWarningDiamondFill } from "react-icons/pi";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiNaver,
  SiExpress,
  SiStyledcomponents,
  SiReactrouter,
  SiAxios,
  SiNodemon,
  SiNetlify,
} from "react-icons/si";
import { MdAnimation } from "react-icons/md";
import { TbBrandVscode } from "react-icons/tb";

const About = () => {
  return (
    <>
      <Container>
        <h3>
          About this Application
          <PiCursorClickFill style={{ margin: "0px 10px", height: "23px" }} />
        </h3>
        <Description>
          <p>이 어플리케이션은 React JS와 Node JS를 기반으로 개발되었습니다.</p>
          <p>
            사용자가 와인에 대한 취향을 입력하고 <strong>`추천받기`</strong>{" "}
            버튼을 클릭하면, 취향에 맞는 와인을 추천받을 수 있습니다.
            <br />
          </p>
          <p>
            입력 값에 따라 그에 맞는 와인을 찾는 과정은{" "}
            <strong>Chat GPT API (OpenAI API)</strong>를 활용하였고,{" "}
            <strong>Naver Search API</strong>를 통해 와인에 대한 정보를 가져오는
            방식으로 구성되었습니다.
          </p>
        </Description>
      </Container>
      <Container>
        <h3 style={{ marginTop: "-30px" }}>
          <PiWarningDiamondFill
            style={{ margin: "0px 10px", height: "25px" }}
          />
          유의사항
          <PiWarningDiamondFill
            style={{ margin: "0px 10px", height: "25px" }}
          />
        </h3>
        <Description>
          <p>
            Chat GPT를 활용하기 때문에 때로는{" "}
            <strong>적절하지 않은 추천 와인</strong>이 등장할 수 있습니다.
            <br />
          </p>
          <p>
            Chat GPT로부터 받은 추천 와인에 대한 정보가 Naver에 존재하지 않는
            경우, <strong>연관없는 정보</strong>가 나타날 수 있습니다.
          </p>
        </Description>
      </Container>

      <Container>
        <h3>
          <BiSolidDownArrow style={{ margin: "0px 20px", height: "20px" }} />
          개발에 사용된 Tech Stack
          <BiSolidDownArrow style={{ margin: "0px 20px", height: "20px" }} />
        </h3>
        <TechContainer>
          <RowContainer>
            <Tech>
              <h4>Language</h4>
              <div>
                <BiLogoJavascript className="icon" />
                <span>Javascript</span>
              </div>
            </Tech>

            <Tech>
              <h4>Deploy & Development</h4>
              <div>
                <FaGitAlt className="icon" />
                <span>Git</span>
              </div>
              <div>
                <FaGithub className="icon" />
                <span>GitHub</span>
              </div>
              <div>
                <SiNetlify className="icon" />
                <span>Netlify</span>
              </div>
              <div>
                <FaFly className="icon" />
                <span>Fly.io</span>
              </div>

              <div>
                <TbBrandVscode className="icon" />
                <span>Visual Studio Code</span>
              </div>
            </Tech>
          </RowContainer>
          <RowContainer>
            <Tech>
              <h4>Front-end</h4>
              <div>
                <FaReact className="icon" />
                <span>React JS</span>
              </div>
              <div>
                <SiReactrouter className="icon" />
                <span>React Router Dom</span>
              </div>
              <div>
                <SiStyledcomponents className="icon" />
                <span>styled-components</span>
              </div>
            </Tech>
            <Tech>
              <h4>Back-end</h4>
              <div>
                <FaNodeJs className="icon" />
                <span>Node JS</span>
              </div>
              <div>
                <SiExpress className="icon" />
                <span>Express JS</span>
              </div>
              <div>
                <SiNodemon className="icon" />
                <span>Nodemon</span>
              </div>
            </Tech>
          </RowContainer>
          <RowContainer>
            <Tech>
              <h4>API</h4>
              <div>
                <RiOpenaiFill className="icon" />
                <span>OpenAI API</span>
              </div>
              <div>
                <SiNaver
                  className="icon"
                  style={{ width: "25px", height: "18px" }}
                />
                <span>Naver Search API</span>
              </div>
            </Tech>
            <Tech>
              <h4>Libraries</h4>
              <div>
                <SiAxios className="icon" />
                <span>Axios</span>
              </div>
              <div>
                <MdAnimation className="icon" />
                <span>lottie-react </span>
              </div>
              <div>
                <FaKeyboard className="icon" />
                <span>react-type-animation</span>
              </div>
              <div>
                <FaReact className="icon" />
                <span>react-icons</span>
              </div>
              <div>
                <FaSpinner className="icon" />
                <span>react-spinners</span>
              </div>
            </Tech>
          </RowContainer>
        </TechContainer>
      </Container>
    </>
  );
};

export default About;

const Container = styled.div`
  width: 95%;
  margin-top: 0;
  margin-bottom: 60px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: white;
    font-size: 25px;
    margin-top: 0;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 22px;
    }
  }
`;

const Description = styled.div`
  width: 900px;
  display: flex;
  border-radius: 10px;
  margin: 0 0;
  margin-bottom: 30px;

  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 30px 80px;
  text-align: center;

  background-color: rgba(256, 256, 256, 0.97);
  box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -webkit-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);
  -moz-box-shadow: 0px 0px 2px 0px rgba(164, 164, 164, 1);

  p {
    margin: 5px 0;
    line-height: 30px;
  }

  @media screen and (max-width: 950px) {
    width: 95%;
  }

  @media screen and (max-width: 768px) {
    font-size: 13px;
    line-height: normal;
    padding: 20px 30px;
  }
`;

const TechContainer = styled.div`
  display: flex;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

const RowContainer = styled.div`
  display: flex;
  width: 300px;
  margin: 10px 10px;
  flex-direction: column;

  @media screen and (max-width: 950px) {
    margin: 0px 10px;
  }
`;

const Tech = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  box-sizing: border-box;
  padding: 25px 25px;
  margin-bottom: 20px;

  h4 {
    font-size: 22px;
    margin: 0 0;
    margin-bottom: 15px;
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  span {
    font-weight: 550;
  }

  .icon {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`;
