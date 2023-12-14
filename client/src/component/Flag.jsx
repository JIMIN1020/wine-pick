import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Flag = ({ countryName }) => {
  const [flagUrl, setFlagUrl] = useState(null);

  useEffect(() => {
    const fetchFlag = async () => {
      const country = countryName === "United States" ? "US" : countryName;
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${country}`
        );
        const flagUrl = response.data[0].flags.svg;
        setFlagUrl(flagUrl);
      } catch (error) {
        console.error("Error fetching flag:", error);
      }
    };

    fetchFlag();
  }, [countryName]);

  return (
    <FlagCircle>
      <img
        src={flagUrl}
        alt={`Flag of ${countryName}`}
        style={{ width: "auto", height: "15px" }}
      />
    </FlagCircle>
  );
};

export default Flag;

const FlagCircle = styled.div`
  width: 20px;
  height: 15px;
  overflow: hidden;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
