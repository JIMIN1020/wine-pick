import { TypeAnimation } from "react-type-animation";
import { styled } from "styled-components";

const Typing = () => {
  return (
    <TypingBox>
      <TypeAnimation
        sequence={[
          "Getting recommendations for",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "Getting recommendations for sweet wine.",
          1000,
          "Getting recommendations for full-bodied wine.",
          1000,
          "Getting recommendations for dry wine.",
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{
          fontSize: "18px",
          display: "inline-block",
          color: "white",
          fontWeight: "550",
          margin: "0 0",
        }}
        repeat={Infinity}
      />
    </TypingBox>
  );
};

export default Typing;

const TypingBox = styled.button`
  display: flex;
  border: none;
  background-color: rgba(172, 45, 49);
  padding: 5px 20px;
  border-radius: 20px;
  margin: 10px 20px;
`;
