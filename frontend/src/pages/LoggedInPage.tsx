import axios from "axios";
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import MainChat from "../components/MainChat";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {ChratUserTokenModel} from "../security/ChratUserTokenModel";
import Profile from "../components/Profile";
import {ChratUserModel} from "../components/ChratUserModel";

type Props = {
    user: ChratUserTokenModel
    onLogout: () => void
}

export default function LoggedInPage(props: Props) {

    const [userDetails, setUserDetails] = useState<ChratUserModel>
    ({
        id: "", username: "", password: "",
        firstName: "", lastName: "", email: "",
        profilePicture: {fileName: "placeholder.jpg", fileUrl: "/api/pictures/files/placeholder.jpg"}
    });
    const [userPictureMenu, setUserPictureMenu] = useState<boolean>(false);
    const nlink = useNavigate();

    const getUserDetails = () => {
        axios.get("/api/chrat-users/" + props.user.username)
            .then(response => response.data)
            .then(setUserDetails)
    }

    useEffect(getUserDetails, [props.user.username]);

    const logout = () => {
        axios.get("/api/chrat-users/logout")
            .then(response => response.data)
            .then(props.onLogout)
            .then(() => nlink("/"))
    }

    return <>
        <StyledHeader>
            <StyledH1>chRat-Reloaded</StyledH1>
            <StyledH2>der Messenger</StyledH2>
        </StyledHeader>
        <StyledNav>
            <StyledButton onClick={() => setUserPictureMenu(!userPictureMenu)}>
            <StyledImg src={userDetails.profilePicture.fileUrl} alt="Profile Picture"/>
                </StyledButton>
            {userPictureMenu &&
                <StyledPictureMenu>
                    <button onClick={() => nlink("/Profile")}>Profile</button>
                    <button onClick={() => nlink("/")}>Mainchat</button>
                    <button onClick={() => logout()}>Logout</button>
                </StyledPictureMenu>
            }
        </StyledNav>
        <StyledMain>
            <Routes>
                <Route path="/" element={<MainChat user={props.user}/>}/>
                <Route path="/profile"
                       element={<Profile user={props.user} userDetails={userDetails} logout={logout}/>}/>
            </Routes>
        </StyledMain>
        <StyledFooter>
            <p>© 2022 chRat-Reloaded</p>
        </StyledFooter>
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
  justify-content: center;
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

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 0;
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const StyledButton = styled.button`
  transition-duration: 0.4s;
  background-color: transparent;
  border: none;
`

const StyledPictureMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  padding: 20px;
  margin-bottom: 0;
  font-size: 1.1rem;
`

const StyledNav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
`

const StyledImg = styled.img`
  width: 125px;
  height: 125px;
  object-fit: cover;
  border-radius: 50%;
`
