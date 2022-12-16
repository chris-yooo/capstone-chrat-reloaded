import React, {useEffect, useState} from 'react';
import {ChratUserTokenModel} from "../security/ChratUserTokenModel";
import {Icon} from "@iconify/react";
import styled from "styled-components";
import axios from "axios";
import {ChratUserModel} from "./ChratUserModel";

type Props = {
    user: ChratUserTokenModel
    userDetails: ChratUserModel
    logout: () => void
    getUserDetails: () => void
}

export default function Profile(props: Props) {

    const [username, setUsername] = useState(props.userDetails.username);
    const [firstName, setFirstName] = useState(props.userDetails.firstName);
    const [lastName, setLastName] = useState(props.userDetails.lastName);
    const [email, setEmail] = useState(props.userDetails.email);
    const [messageStatus, setMessageStatus] = useState("");
    const [pictureMessageStatus, setPictureMessageStatus] = useState("");
    const [usernameMessageStatus, setUsernameMessageStatus] = useState("");
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [doEdit, setDoEdit] = useState(false);
    const [doEditUsername, setDoEditUsername] = useState(false);
    const [doProfilePicture, setDoProfilePicture] = useState(false);
    const [doDelete, setDoDelete] = useState(false);
    const [errorMail, setErrorMail] = useState("");
    const [file, setFile] = useState<FileList | null>(null);
    const [fileName, setFileName] = useState(props.userDetails.profilePicture.fileName);
    const [fileUrl, setFileUrl] = useState(props.userDetails.profilePicture.fileUrl);
    const id = props.userDetails.id;
    let fileData = new FormData();
    fileData.append("file", file ? file[0] : new File([""], "placeholder.jpg"));

    useEffect(() => {
        setUsername(props.userDetails.username);
        setFirstName(props.userDetails.firstName);
        setLastName(props.userDetails.lastName);
        setEmail(props.userDetails.email);
        setFileName(props.userDetails.profilePicture.fileName);
        setFileUrl(props.userDetails.profilePicture.fileUrl);
    }, [props.userDetails]);

    const updateUserDetails = (fileName: string, fileUrl: string) => {
        const profilePicture = {
            fileName: fileName,
            fileUrl: fileUrl
        }
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
                    const profilePictureUrl = "/api/pictures/files/";
                    let fileNameNew = response.request.response;
                    let fileUrlNew = profilePictureUrl.concat(fileNameNew);
                    setFileName(fileNameNew);
                    setFileUrl(fileUrlNew)
                    updateUserDetails(fileNameNew, fileUrlNew);
                }
                if (response.status === 200) {
                    setPictureMessageStatus("Bild wurde erfolgreich hochgeladen");
                    (setTimeout(() => {
                        setPictureMessageStatus("");
                        setDoProfilePicture(false);
                        props.getUserDetails();
                    }, 2000));
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

    function deleteUser() {
        axios.delete("/api/chrat-users/" + id)
            .then((response) => response.status)
            .then((status) => {
                if (status === 204) {
                    setMessageStatus(props.userDetails.username + " wurde Erfolreich gelöscht");
                    (setTimeout(() => {
                        setMessageStatus("");
                        props.logout()
                    }, 2000));
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
        updateUserDetails(fileName, fileUrl);
    }

    const usernameChange = () => {
        axios.put("/api/chrat-users/username/" + id, {
            id,
            username
        })
            .then((response) => response.status)
            .then((status) => {
                if (status === 200) {
                    setUsernameMessageStatus("Erfolgreich geändert");
                    setDoEdit(false);
                    (setTimeout(() => {
                        setUsernameMessageStatus("");
                        setDoEditUsername(false);
                    }, 2000));
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setUsernameError("Fehler beim Ändern");
                    setUsername(props.userDetails.username);
                    (setTimeout(() => setUsernameError(""), 5000));
                }
                if (error.response.status === 406) {
                    setUsernameError("Username ist schon vergben");
                    setUsername(props.userDetails.username);
                    (setTimeout(() => setUsernameError(""), 5000));
                }
                console.log("Error =>" + error)
            })
    }

    function handleUploadProfilePicture(event: any) {
        event.preventDefault()
        uploadProfilePicture();
    }

    const usernameRegEx = (username: string) => {
        return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
    }

    const handleUsernameChange = () => {
        if (!usernameRegEx(username)) {
            setUsernameError("Unerlaubte Zeichen!");
            setUsername(props.userDetails.username);
            (setTimeout(() => setError(""), 5000));
            return;
        } else {
            setUsernameError("");
        }
        usernameChange();
    }

    return <>
        {doDelete && (
            <StyledModalDiv1>
                <StyledModalDiv2>
                    <StyledP>Möchtest du deinen Account wirklich in die Mülltonne werfen?</StyledP>
                    <StyledDeleteDiv3>
                        <StyledButton onClick={() => setDoDelete(false)}>Abbrechen</StyledButton>
                        <StyledDeleteButton onClick={deleteUser}>Löschen</StyledDeleteButton>
                    </StyledDeleteDiv3>
                </StyledModalDiv2>
            </StyledModalDiv1>
        )}
        {doProfilePicture && (
            <StyledModalDiv1>
                <StyledModalDiv2>
                    <StyledP>Bitte Profilbild auswählen</StyledP>
                    <StyledInput type={"file"} accept={"image/*"} onChange={(e) => setFile(e.target.files)}/>
                    <StyledDeleteDiv3>
                        <StyledButton onClick={() => setDoProfilePicture(false)}>Abbrechen</StyledButton>
                        <StyledButton onClick={handleUploadProfilePicture}>Hochladen</StyledButton>
                    </StyledDeleteDiv3>
                    {messageStatus && <StyledMessage>{pictureMessageStatus}</StyledMessage>}
                    {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
                </StyledModalDiv2>
            </StyledModalDiv1>
        )}
        {doEditUsername && (
            <StyledModalDiv1>
                <StyledModalDiv2>
                    <StyledP>Bitte neuen Username wählen</StyledP>
                    <StyledP2>Erlaubt sind: Groß & Klein-buchstaben, _ - und Zahlen</StyledP2>
                    <StyledInput type="text"
                                 id="username"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 disabled={!doEditUsername}
                                 required/>
                    <StyledDeleteDiv3>
                        <StyledButton onClick={() => setDoEditUsername(false)}>Abbrechen</StyledButton>
                        <StyledButton onClick={handleUsernameChange}>Speichern</StyledButton>
                    </StyledDeleteDiv3>
                    {usernameMessageStatus && <StyledMessage>{usernameMessageStatus}</StyledMessage>}
                    {usernameError && <StyledErrorMessage>{usernameError}</StyledErrorMessage>}
                </StyledModalDiv2>
            </StyledModalDiv1>
        )}
        <StyledSection>
            <StyledDiv4>
                {doEdit ?
                    <StyledEditPictureButton type="button" onClick={() => {
                        setDoProfilePicture(true);
                        setDoEdit(false)
                    }}>
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
                                 disabled={!doEditUsername}
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
                        <StyledDiv3>
                            <StyledDeleteButton onClick={() => setDoDelete(true)}>
                                <Icon icon="material-symbols:delete-forever-rounded" inline={true} width="18"/> User
                                Löschen
                            </StyledDeleteButton>
                        </StyledDiv3>
                        <StyledDiv3>
                            <StyledBlueButton onClick={() => setDoEditUsername(true)}>
                                <Icon icon="mdi:user-edit" inline={true} width="19"/> Username
                            </StyledBlueButton>
                        </StyledDiv3>
                    </StyledDiv2>
                    <StyledDiv2>
                        <StyledButton onClick={() => setDoEdit(false)}>
                            <Icon icon="material-symbols:cancel-rounded" inline={true}
                                  width="15"/> Abbrechen</StyledButton>
                        <StyledGreenButton disabled={!doEdit} onClick={handleUpdateUserDetails}>
                            <Icon icon="mdi:user-check" inline={true} width="20"/> Speichern
                        </StyledGreenButton>
                    </StyledDiv2>
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
  @media (max-width: 768px) {
    width: 85%;
  }
`

const StyledDiv1 = styled.div`
  width: 80%;
  margin: 0 0 10px 0;
  padding: 10px;
`

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  margin-bottom: 0;
  font-size: 1.1rem;
`

const StyledDiv3 = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 0;
  font-size: 1.1rem;
`

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1rem;
  color: var(--color-text);
  @media (max-width: 768px) {
    margin: 10px 0 0 0;
    padding: 0;
  }
`

const StyledErrorMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1rem;
  color: var(--color-red);
  @media (max-width: 768px) {
    margin: 10px 0 0 0;
    padding: 0;
  }
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
  background-color: var(--color-button-darker-red);
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

const StyledGreenButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 150px;
  transition-duration: 0.4s;
  background-color: var(--color-button-darker-green);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-green);
  }

  &:active {
    background-color: var(--color-green);
  }
`

const StyledBlueButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 150px;
  transition-duration: 0.4s;
  background-color: var(--color-button-darker-blue);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-blue);
  }

  &:active {
    background-color: var(--color-blue);
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

const StyledP2 = styled.p`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  color: var(--color-white);
  text-shadow: 0 0 10px var(--color-input-shadow);
`

const StyledModalDiv1 = styled.div`
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

const StyledModalDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  padding: 30px;
  width: 100%;
  max-width: 45vw;
  background-color: var(--color-background);
  border-radius: 2pc;
  @media (max-width: 768px) {
    max-width: 80vw;
    border-radius: 5%;
  }
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
