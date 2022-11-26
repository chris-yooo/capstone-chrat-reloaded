import React, {useEffect, useState} from 'react';
import axios from "axios";
import LoggedInPage from "./LoggedInPage";
import LoginPage from './LoginPage';

export default function App() {

    const [username, setUsername] = useState<string>();

    const fetchUsername = () => {
        axios.get('/api/chrat-users/me')
            .then(response => response.data)
            .then(setUsername)
    }

    useEffect(fetchUsername, [])

    if (username === undefined) {
        return <>Bitte haben Sie einen Augenblick Geduld...</>
    }
    if (username === 'anonymousUser') {
        return <LoginPage fetchUsername={fetchUsername}></LoginPage>
    }
    return <LoggedInPage username={username} onLogout={fetchUsername}></LoggedInPage>
}
