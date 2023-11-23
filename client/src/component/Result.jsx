import React from "react";
import styled from "styled-components";
import WineInfo from "../component/WineInfo";

function Result({ wineData, wineBoxRef, loading, title }) {
  return (
    <Container>
      {wineData.length > 0 && !loading ? (
        <WineBox tabIndex={0} ref={wineBoxRef}>
          <h2>{title}</h2>
          <Wines>
            {!loading && wineData.length > 0
              ? wineData.map((wine, i) => {
                  if (wine) {
                    return <WineInfo wine={wine} id={i} />;
                  } else {
                    return null;
                  }
                })
              : undefined}
          </Wines>
        </WineBox>
      ) : undefined}
    </Container>
  );
}

export default Result;

const Container = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(172, 45, 49, 0.7);
`;

const WineBox = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;

  h2 {
    font-size: 27px;
    color: white;
  }
`;

const Wines = styled.div`
  display: flex;
  gap: 20px;
`;
