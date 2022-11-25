import axios from "axios";
import React, {useState} from "react";
import styled from "styled-components";

type Props = {
    onLogin: () => void,
}
export default function LoginPage(props: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        axios.post("/api/chrat-users", {
            username,
            password
        })
            .then(login)
    }

    const login = () => {
        axios.get("/api/chrat-users/login", {
            auth: {
                username,
                password
            }
        })
            .then(props.onLogin)
    }

    return <>
        <StyledHeader>
            <StyledH1>chRat-Reloaded</StyledH1>
            <StyledH2>der Messenger</StyledH2>
        </StyledHeader>
        <StyledMain>
            <div>
                <StyledLabel htmlFor="username">Benutzername</StyledLabel>
                <StyledInput type="text" id="username" onChange={event => setUsername(event.target.value)}/>
            </div>
            <div>
                <StyledLabel htmlFor="password">Passwort</StyledLabel>
                <StyledInput type="password" id="password" onChange={event => setPassword(event.target.value)}/>
            </div>
            <StyledDivButton>
                <button onClick={() => register()}>Registrieren</button>
                <button onClick={() => login()}>Anmelden</button>
            </StyledDivButton>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledDivButton = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StyledInput = styled.input`
  margin: 10px;
  padding: 13px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 300px;
  height: 45px;
  background: var(--color-white);
  border: 1px solid #D0D4D9;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
`

const StyledLabel = styled.label`
  font-family: 'Inter', sans-serif;
  width: 85px;
  height: 22px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`
