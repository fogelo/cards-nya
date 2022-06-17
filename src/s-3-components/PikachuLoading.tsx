import React from "react";
import pikachu from "../assets/images/pikachu.gif";
import styled from "styled-components";

const PikachuLoading = () => {
    return (
        <PikachuLoadingStyled>
            <img src={pikachu} alt="pikachu"/>
        </PikachuLoadingStyled>
    );
};

const PikachuLoadingStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%) translateY(-50%);
`

export default PikachuLoading;