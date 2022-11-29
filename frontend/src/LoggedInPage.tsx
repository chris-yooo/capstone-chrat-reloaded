import axios from "axios";
import {Route, Routes} from "react-router";
import MainChat from "./MainChat";
import React from "react";
import styled from "styled-components";
import {ChratUserModel} from "./ChratUserModel";

type Props = {
    user: ChratUserModel
    onLogout: () => void
}

export default function LoggedInPage(props: Props) {

    const logout = () => {
        axios.get("/api/chrat-users/logout")
            .then(response => response.data)
            .then(props.onLogout)
    }

    return <>
        <StyledHeader>
            <StyledH1>chRat-Reloaded</StyledH1>
            <StyledH2>der Messenger</StyledH2>
            <button onClick={() => logout()}>Logout</button>
        </StyledHeader>
        <StyledMain>
            <Routes>
                <Route path="/" element={<MainChat user={props.user} />}/>
            </Routes>
        </StyledMain>
    </>
}

const StyledHeader = styled.header`
  margin: 0 0 20px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
`

const StyledMain = styled.main`
  margin: 0 0 50px 0;
  min-height: 200px;
`

const StyledH1 = styled.h1`
  margin: 20px 0 0 0;
  font-size: 2rem;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const StyledH2 = styled.h2`
  margin: 10px 0 20px 0;
  padding: 0;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`
