import React from 'react';
import {Routes, Route} from "react-router";
import MainChat from "./MainChat";

export default function App() {
    return <>
        <header>
            <h1 style={{textAlign: "center"}}>chRat-Reloaded</h1>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<MainChat/>}/>
            </Routes>
        </main>
    </>;
}
