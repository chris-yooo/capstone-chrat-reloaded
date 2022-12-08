import React, {useEffect, useState} from 'react';
import {ChratUserTokenModel} from "../security/ChratUserTokenModel";
import {ChratUserModel} from "./ChratUserModel";
import {Icon} from "@iconify/react";
import styled from "styled-components";
import axios from "axios";

type Props = {
    user: ChratUserTokenModel
    logout: () => void
}

export default function Profile(props: Props) {

    const [userDetails, setUserDetails] = React.useState<ChratUserModel>
    ({
        id: "", username: "", password: "",
        firstName: "", lastName: "", email: "",
        profilePicture: {fileName: "placeholder.jpg", fileUrl: "/api/pictures/files/placeholder.jpg"}
    });
    const [id, setId] = useState(userDetails.id);
    const [username, setUsername] = useState(userDetails.username);
    const [firstName, setFirstName] = useState(userDetails.firstName);
    const [lastName, setLastName] = useState(userDetails.lastName);
    const [email, setEmail] = useState(userDetails.email);
    const [messageStatus, setMessageStatus] = useState("");
    const [error, setError] = useState("");
    const [doEdit, setDoEdit] = useState(false);
    const [doProfilePicture, setDoProfilePicture] = useState(false);
    const [doDelete, setDoDelete] = useState(false);
    const [errorMail, setErrorMail] = useState("");
    const [file, setFile] = useState<FileList | null>(null)
    const [fileName, setFileName] = useState(userDetails.profilePicture.fileName);
    const [fileUrl, setFileUrl] = useState(userDetails.profilePicture.fileUrl);
    const profilePictureUrl = "/api/pictures/files/";
    let fileData = new FormData();
    fileData.append("file", file ? file[0] : new File([""], "placeholder.jpg"));

    const profilePicture = {
        fileName: fileName,
        fileUrl: fileUrl
    }

    const getUserDetails = () => {
        axios.get("/api/chrat-users/" + props.user.username)
            .then(response => response.data)
            .then(setUserDetails)
    }

    useEffect(() => {
        setId(userDetails.id);
        setUsername(userDetails.username);
        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
        setEmail(userDetails.email);
        setFileName(userDetails.profilePicture.fileName);
        setFileUrl(userDetails.profilePicture.fileUrl);
    }, [userDetails]);

    useEffect(getUserDetails, [props.user.username]);

    const updateUserDetails = () => {
        axios.put("/api/chrat-users/" + id, {
            id,
            firstName,
            lastName,
            email,
            profilePicture
        })
            .then((response) => response.status)
            .then((status) => {
                if (status === 200) {
                    setMessageStatus("Erfolgreich gespeichert");
                    (setTimeout(() => setMessageStatus(""), 2000));
                    setDoEdit(false);
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError("Fehler beim Ändern");
                    (setTimeout(() => setError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    const uploadProfilePicture = () => {
        axios.post("/api/pictures/upload", fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => response)
            .then((response) => {
                if (response.request.response) {
                    setFileName(response.request.response);
                }
                if (response.status === 200) {
                    setMessageStatus("Bild wurde erfolgreich hochgeladen");
                    (setTimeout(() => setMessageStatus(""), 2000));
                    (setTimeout(() => setDoProfilePicture(false), 2000));
                }
            })
            .catch((error) => {
                if (error.response.status === 417) {
                    setError("Fehler beim hochladen, bitte versuche es erneut");
                    (setTimeout(() => setError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    let constructFileUrlToUpdate = () => {
        setFileUrl(profilePictureUrl.concat(fileName))
    }

    useEffect(constructFileUrlToUpdate, [fileName])

    function deleteUser() {
        axios.delete("/api/chrat-users/" + id)
            .then((response) => response.status)
            .then((status) => {
                if (status === 204) {
                    setMessageStatus(username + " wurde Erfolreich gelöscht");
                    (setTimeout(() => setMessageStatus(""), 2000));
                    (setTimeout(() => props.logout(), 2001));
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setError("Fehler beim Löschen");
                    (setTimeout(() => setError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    const isValidEmail = (email: string) => {
        return /.@./.test(email);
    }

    const handleUpdateUserDetails = (event: any) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setErrorMail("Email scheint nicht richtig zu sein");
            (setTimeout(() => setErrorMail(""), 5000));
            return;
        } else {
            setErrorMail("");
        }
        updateUserDetails();
    }

    function handleUploadProfilePicture(event: any) {
        event.preventDefault()
        uploadProfilePicture();
    }

    return <>
        {doDelete && (
            <StyledDeleteDiv1>
                <StyledDeleteDiv2>
                    <StyledP>Möchtest du deinen Account wirklich in die Mülltonne werfen?</StyledP>
                    <StyledDeleteDiv3>
                        <StyledButton onClick={() => setDoDelete(false)}>Abbrechen</StyledButton>
                        <StyledDeleteButton onClick={deleteUser}>Löschen</StyledDeleteButton>
                    </StyledDeleteDiv3>
                </StyledDeleteDiv2>
            </StyledDeleteDiv1>
        )}
        {doProfilePicture && (
            <StyledDeleteDiv1>
                <StyledDeleteDiv2>
                    <StyledP>Bitte Profilbild auswählen</StyledP>
                    <StyledInput type={"file"} accept={"image/*"} onChange={(e) => setFile(e.target.files)}/>
                    <StyledDeleteDiv3>
                        <StyledButton onClick={() => setDoProfilePicture(false)}>Abbrechen</StyledButton>
                        <StyledButton onClick={handleUploadProfilePicture}>Hochladen</StyledButton>
                    </StyledDeleteDiv3>
                    {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
                    {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
                </StyledDeleteDiv2>
            </StyledDeleteDiv1>
        )}
        <StyledSection>
            <StyledDiv4>
                {doEdit ?
                <StyledEditPictureButton type="button" onClick={() => setDoProfilePicture(true)}>
                    <StyledImg src={fileUrl} alt={"Profil Bild"}/>
                <StyledDiv5>
                    <Icon icon="fluent:send-copy-24-filled" color="var(--color-white)" width="50"/>
                </StyledDiv5>
                </StyledEditPictureButton>
                :
                <StyledImg src={fileUrl} alt={"Profil Bild"}/>}
            </StyledDiv4>
            <form onSubmit={handleUpdateUserDetails}>
                <StyledDiv1>
                    <StyledLabel htmlFor="username">Username:</StyledLabel>
                    <StyledInput type="text"
                                 id="username"
                                 value={username}
                                 disabled={true}
                                 required/>

                    <StyledLabel htmlFor="firstname">Vorname:</StyledLabel>
                    <StyledInput type="text"
                                 id="firstname"
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                                 disabled={!doEdit}
                                 required/>

                    <StyledLabel htmlFor={"lastname"}>Nachname:</StyledLabel>
                    <StyledInput type="text"
                                 id="lastname"
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                                 disabled={!doEdit}
                                 required/>

                    <StyledLabel htmlFor={"email"}>E-Mail:</StyledLabel>
                    <StyledInput type="text"
                                 id="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 disabled={!doEdit}
                                 required/>

                    {errorMail && <StyledErrorMessage>{errorMail}</StyledErrorMessage>}

                </StyledDiv1>
            </form>

            {doEdit ?
                <>
                    <StyledDiv2>
                        <StyledButton onClick={() => setDoEdit(false)}>
                            <Icon icon="material-symbols:cancel-rounded" inline={true}
                                  width="15"/> Abbrechen</StyledButton>
                        <StyledButton disabled={!doEdit} onClick={handleUpdateUserDetails}>
                            <Icon icon="mdi:user-check" inline={true} width="20"/> Speichern
                        </StyledButton>
                    </StyledDiv2>
                    <StyledDiv3>
                        <StyledDeleteButton onClick={() => setDoDelete(true)}>
                            <Icon icon="material-symbols:delete-forever-rounded" inline={true} width="18"/> User Löschen
                        </StyledDeleteButton>
                    </StyledDiv3>
                </>
                :
                <StyledDiv2>
                    <StyledButton onClick={() => setDoEdit(true)}>
                        <Icon icon="mdi:edit" inline={true}
                              width="15"/> Bearbeiten</StyledButton>
                </StyledDiv2>}
            {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
            {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
        </StyledSection>
    </>
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
  margin: 0 0 20px 0;
  padding: 10px;
`

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 20px;
  margin-bottom: 0;
  font-size: 1.1rem;
`

const StyledDiv3 = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 0;
  margin-bottom: 23px;
  font-size: 1.1rem;
`

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1rem;
  color: var(--color-text);
`

const StyledErrorMessage = styled.p`
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
  min-width: 310px;
  height: 22px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-shadow: 0 0 10px var(--color-input-shadow);
`

const StyledDeleteButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 150px;
  transition-duration: 0.4s;
  background-color: var(--color-button-delete-red);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-red);
  }

  &:active {
    background-color: var(--color-red);
  }
`

const StyledP = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.3rem;
  color: var(--color-white);
  text-shadow: 0 0 10px var(--color-input-shadow);
`

const StyledDeleteDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`

const StyledDeleteDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  padding: 30px;
  width: 100%;
  max-width: 45vw;
  background-color: var(--color-background);
`

const StyledDeleteDiv3 = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0 0 0;
  padding: 10px;
`

const StyledDiv4 = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 10px;
`

const StyledDiv5 = styled.div`
  position: absolute;
  top: 48px;
  left: 54px;
`

const StyledEditPictureButton = styled.button`
  display: flex;
  transition-duration: 0.4s;
  border: none;
  background-color: transparent;
  border-radius: 50%;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`

const StyledImg = styled.img`
  width: 125px;
  height: 125px;
  object-fit: cover;
  border-radius: 50%;
`
