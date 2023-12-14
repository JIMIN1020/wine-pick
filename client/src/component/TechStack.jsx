import React from "react";
import styled from "styled-components";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiExpress,
  SiStyledcomponents,
  SiReactrouter,
  SiAxios,
  SiNodemon,
  SiNetlify,
  SiVivino,
} from "react-icons/si";
import { MdAnimation } from "react-icons/md";
import { TbBrandVscode } from "react-icons/tb";
import {
  FaGitAlt,
  FaGithub,
  FaReact,
  FaNodeJs,
  FaFly,
  FaSpinner,
} from "react-icons/fa";
import { BiLogoJavascript, BiSolidDownArrow } from "react-icons/bi";

function TechStack() {
  return (
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
              <span>React</span>
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
              <span>Node.js</span>
            </div>
            <div>
              <SiExpress className="icon" />
              <span>Express</span>
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
              <SiVivino
                className="icon"
                style={{ width: "25px", height: "20px" }}
              />
              <span>Vivino API</span>
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
  );
}

export default TechStack;

const Container = styled.div`
  width: 100vw;
  position: relative;
  padding: 50px 0px;
  margin: 30px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    color: rgba(172, 45, 49);
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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border: 0.5px solid gray;

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
