import React, {useEffect, useState} from 'react';
import axios from "axios";
import LoggedInPage from "../pages/LoggedInPage";
import LoginPage from './LoginPage';
import {ChratUserTokenModel} from "./ChratUserTokenModel";

export default function App() {

    const [user, setUser] = useState<ChratUserTokenModel>();

    const fetchUsername = () => {
        axios.get('/api/chrat-users/me')
            .then(response => response.data)
            .then(setUser)
    }

    useEffect(fetchUsername, [])

    if (user === undefined) {
        return <LoginPage fetchUsername={fetchUsername} />
    }
    if (!user.username) {
        return <>Bitte haben Sie einen Augenblick Geduld...</>
    }
    if (user.username === 'anonymousUser') {
        return <LoginPage fetchUsername={fetchUsername}></LoginPage>
    }
    return <LoggedInPage user={user} onLogout={fetchUsername}></LoggedInPage>
}
