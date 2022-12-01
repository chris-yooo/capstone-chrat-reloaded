import React, {useEffect, useState} from 'react';
import {ChratUserTokenModel} from "../security/ChratUserTokenModel";
import {Icon} from "@iconify/react";
import styled from "styled-components";
import axios from "axios";

type Props = {
    user: ChratUserTokenModel
}

type ChratUserModel = {
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
}

export default function Profile(props: Props) {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [messageStatus, setMessageStatus] = useState('')
    const [error, setError] = useState("");
    const [doEdit, setDoEdit] = useState(false);
    const [userDetails, setUserDetails] = React.useState<ChratUserModel>
    ({id: "", username: "", password: "", firstName: "", lastName: "", email: ""});

    const getUserDetails = () => {
        axios.get("/api/chrat-users/" + props.user.username)
            .then(response => response.data)
            .then(setUserDetails)
    }

    const putUserDetails = () => {
        axios.put("/api/chrat-users/" + props.user.username, {
            username,
            firstName,
            lastName,
            email,
        })
            .then((response) => response.status)
            .then((status) => {
                if (status === 200) {
                    setMessageStatus("Erfolreich geändert.");
                    (setTimeout(() => setMessageStatus(""), 2000));
                    setDoEdit(false);
                    getUserDetails();
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError("Fehler beim Ändern.");
                    (setTimeout(() => setError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    useEffect(getUserDetails, [])

    const toggleDoEdit = () => {
        setDoEdit(!doEdit);
    }

    return <>
        <StyledSection>
            <form onClick={toggleDoEdit}>
                <StyledDiv1>
                    <StyledLabel htmlFor={"username"}>Username:</StyledLabel>
                    <StyledInput type="tex"
                                 id="username"
                                 value={userDetails.username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 placeholder="chris_yooo"
                                 disabled={!doEdit}
                                 required/>

                    <StyledLabel htmlFor="firstname">Vorname:</StyledLabel>
                    <StyledInput type="text"
                                 id="firstname"
                                 value={userDetails.firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                                 placeholder={"Chris"}
                                 disabled={!doEdit}
                                 required/>

                    <StyledLabel htmlFor={"lastname"}>Nachname:</StyledLabel>
                    <StyledInput type="text"
                                 id="lastname"
                                 value={userDetails.lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                                 placeholder="Yoo"
                                 disabled={!doEdit}
                                 required/>

                    <StyledLabel htmlFor={"email"}>E-Mail:</StyledLabel>
                    <StyledInput type="text"
                                 id="email"
                                 value={userDetails.email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="chrisyooo@gmail.com"
                                 disabled={!doEdit}
                                 required/>

                </StyledDiv1>
            </form>
            <StyledDiv2>
                <StyledButton onClick={toggleDoEdit}>
                    <Icon icon="mdi:edit" inline={true} width="15"/> Bearbeiten
                </StyledButton>
                <StyledButton onClick={putUserDetails}>
                    <Icon icon="mdi:+" inline={true} width="15"/> Speichern
                </StyledButton>
                {error && <StyledMessage>{error}</StyledMessage>}
                {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
            </StyledDiv2>
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
`

const StyledDiv1 = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 10px;
`;

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 20px;
  margin-bottom: 23px;
  font-size: 1.1rem;
`;

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 0.9rem;
  color: var(--color-text);
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
  min-width: 300px;
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