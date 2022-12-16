import axios from "axios";
import React, {useState} from "react";
import styled from "styled-components";
import RegisterPage from "./RegisterPage";

type Props = {
    fetchUsername: () => void,
}

export default function LoginPage(props: Props) {

    const [wouldLikeRegister, setWouldLikeRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [messageStatus, setMessageStatus] = useState("");

    const login = () => {
        axios.get("/api/chrat-users/login", {
            auth: {
                username,
                password
            }
        })
            .then((response) => response.status)
            .then((status) => {
                if (status === 200) {
                    setMessageStatus("Erfolgreich eingeloggt");
                    (setTimeout(() => {
                        setMessageStatus("");
                        props.fetchUsername()
                    }, 1300));
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setError("Username oder Passwort Falsch");
                    (setTimeout(() => setError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    if (wouldLikeRegister) {
        return <>
            <StyledHeader>
                <StyledH1>chRat-Reloaded</StyledH1>
                <StyledH2>der Messenger</StyledH2>
            </StyledHeader>
            <StyledMain>
                <RegisterPage wouldLikeRegister={setWouldLikeRegister}
                              fetchUsername={props.fetchUsername}></RegisterPage>
            </StyledMain>
        </>
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
                <StyledButton onClick={() => setWouldLikeRegister(true)}>Registrieren</StyledButton>
                <StyledButton onClick={() => login()}>Anmelden</StyledButton>
            </StyledDivButton>
            {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
            {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
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
  width: 305px;
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
  border: 1px solid var(--color-input-border);
  box-shadow: 0 0 40px var(--color-input-shadow);
  border-radius: 12px;
  font-size: 1rem;
`

const StyledLabel = styled.label`
  font-family: 'Inter', sans-serif;
  width: 150px;
  height: 22px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-shadow: 0 0 10px var(--color-input-shadow);
`

const StyledButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 140px;
  transition-duration: 0.4s;
  background-color: var(--color-button-background);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1.2rem;
  color: var(--color-text);
  @media (max-width: 768px) {
    margin: 10px 0 0 0;
    padding: 0;
  }
`

const StyledErrorMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1.2rem;
  color: var(--color-red);
  @media (max-width: 768px) {
    margin: 10px 0 0 0;
    padding: 0;
  }
`
