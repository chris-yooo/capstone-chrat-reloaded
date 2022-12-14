import React, {useState} from 'react';
import axios from "axios";
import PasswordChecklist from "react-password-checklist"
import styled from "styled-components";
import {Icon} from '@iconify/react';

type Props = {
    fetchUsername: () => void,
    wouldLikeRegister: (value: boolean) => void,
}

export default function RegisterPage(props: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [failedUsername, setFailedUsername] = useState("")
    const [messageStatus, setMessageStatus] = useState("")
    const [errorMail, setErrorMail] = useState("");

    const register = () => {
        axios.post("/api/chrat-users", {
            username,
            password,
            firstName,
            lastName,
            email,
        })
            .then((response) => response.status)
            .then((status) => {
                if (status === 200) {
                    setMessageStatus(username + " erfolgreich registriert.");
                    (setTimeout(() => props.wouldLikeRegister(false), 2000));
                    (setTimeout(() => login(), 2000));
                    setUsername("");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setFailedUsername(username + " ist schon vergeben");
                    (setTimeout(() => setFailedUsername(""), 5000));
                    setUsername("");
                }
                console.log("Error =>" + error)
            })
    }

    const login = () => {
        axios.get("/api/chrat-users/login", {
            auth: {
                username,
                password,
            }
        })
            .then(props.fetchUsername)
    }

    const isValidEmail = (email: string) => {
        return /.@./.test(email);
    }

    const handleRegisterSubmit = (event: any) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setErrorMail("Email scheint nicht richtig zu sein");
            (setTimeout(() => setErrorMail(""), 5000));
            return;
        } else {
            setErrorMail("");
        }
        register();
    }

    return <>
        <StyledSection>
            <form onSubmit={handleRegisterSubmit}>
                <StyledDiv1>
                    <StyledLabel htmlFor="firstname">Vorname:</StyledLabel>
                    <StyledInput type='text'
                                 id="firstname"
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                                 placeholder={"Chris"}
                                 required/>

                    <StyledLabel htmlFor={"lastname"}>Nachname:</StyledLabel>
                    <StyledInput type='text'
                                 id="lastname"
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                                 placeholder="Yoo"
                                 required/>

                    <StyledLabel htmlFor={"email"}>E-Mail:</StyledLabel>
                    <StyledInput type='text'
                                 id="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="chrisyooo@gmail.com"
                                 required/>

                    {errorMail && <StyledInputError>{errorMail}</StyledInputError>}

                    <StyledLabel htmlFor={"username"}>Username:</StyledLabel>
                    <StyledInput type='text'
                                 id="username"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 placeholder="chris_yooo"
                                 required/>

                    {failedUsername && <StyledInputError>{failedUsername}</StyledInputError>}

                    <StyledLabel htmlFor={"password"}>Passwort:</StyledLabel>
                    <StyledInput type='password'
                                 id="password"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="Bello123!"
                                 required/>

                    <StyledLabel htmlFor={"confirmPassword"}>Passwort nochmal:</StyledLabel>
                    <StyledInput type='password'
                                 id="confirmPassword"
                                 value={confirmPassword}
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                                 placeholder="Bello123!"
                                 required/>
                </StyledDiv1>
            </form>
            <StyledDiv2>
                <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital", "match"]}
                    minLength={8}
                    value={password}
                    valueAgain={confirmPassword}
                    messages={{
                        minLength: "muss minimum 8 Zeichen enthalten",
                        match: "muss ??bereinstimmen",
                        number: "muss eine Zahl enthalten",
                        specialChar: "muss ein Sonderzeichen enthalten",
                        capital: "muss einen Gro??buchstaben enthalten"
                    }}
                />
            </StyledDiv2>
            <StyledDiv3>
                <StyledButton onClick={() => props.wouldLikeRegister(false)}>
                    <Icon icon="mdi:x" inline={true} width="15"/> Abbrechen
                </StyledButton>
                <StyledButton onClick={handleRegisterSubmit}>
                    <Icon icon="mdi:register" inline={true} width="15"/> Registrieren
                </StyledButton>
            </StyledDiv3>
            {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
        </StyledSection>
    </>;
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 70%;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  background-color: var(--color-background);
  @media (max-width: 768px) {
    width: 85%;
  }
`

const StyledDiv1 = styled.div`
  width: 80%;
  margin: 0 0 20px 0;
  padding: 10px;
`

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 10px 20px;
  margin-bottom: 23px;
  font-size: 1.1rem;
`;

const StyledDiv3 = styled.div`
  display: flex;
  align-self: center;
`;

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 0.9rem;
  color: var(--color-text);
`

const StyledInputError = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1rem;
  color: var(--color-red);
`

const StyledButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 150px;
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
