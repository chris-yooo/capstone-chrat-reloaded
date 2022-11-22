import React from 'react';
import {Routes, Route} from "react-router";
import MainChat from "./MainChat";
import styled from "styled-components";

export default function App() {
    return <>
        <StyledHeader>
            <StyledH1>chRat-Reloaded</StyledH1>
        </StyledHeader>
        <StyledMain>
            <Routes>
                <Route path="/" element={<MainChat/>}/>
            </Routes>
        </StyledMain>
    </>;
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  padding: 10px;
  margin-bottom: 20px;
`

const StyledMain = styled.main`
  margin: 0 0 50px 0;
  min-height: 200px;
`

const StyledH1 = styled.h1`
  margin: 20px;
  padding: 20px;
  border: 1px solid var(--color-blue);
  border-radius: 2pc;
  font-size: 2rem;
  font-family: Calibri, sans-serif;
`