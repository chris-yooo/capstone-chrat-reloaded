import React, {useState} from 'react';
import styled from "styled-components";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {nanoid} from "nanoid";

export default function MainChat() {

    let host = window.location.host;
    if (host === "localhost:3000") {
        host = "localhost:8080";
    }

    const wsServiceUrl = 'ws://' + host + '/api/mainchat';

    const [messageHistory, setMessageHistory] = useState<any>([]);
    const [message, setMessage] = useState('');

    const WebSocket = useWebSocket(wsServiceUrl, {
        onOpen: () => {
            console.log("Connected to websocket");
        },
        onMessage: (event) => {
            let parsed = event.data;
            setMessageHistory((messageHistory: any) => [...messageHistory, parsed]);
        },
        onClose: () => {
            console.log("Disconnected from websocket");
        },
    });

    const handleMessageSubmit = (event: any) => {
        event.preventDefault();
        messageToSend();
    }

    const putDateTime = () => {
        const date = new Date();
        return date.toLocaleString();
    }

    const messageToSend = () => WebSocket.sendMessage(message);

    const readyState = WebSocket.readyState;

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting...',
        [ReadyState.OPEN]: 'Connected',
        [ReadyState.CLOSING]: 'Closing...',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const messages = messageHistory.map((message: any) =>
        <StyledLi key={nanoid()}>
            {message ? message : null}
        </StyledLi>);

    return <>
        <StyledH2>Main-Chat <span>{connectionStatus}</span></StyledH2>
        <StyledSection>
            <ul>
                {messages}
            </ul>
        </StyledSection>

        <StyledSection2>
            <form onSubmit={handleMessageSubmit}>
                <input disabled={readyState !== ReadyState.OPEN} type="text"
                       onChange={(e) => setMessage(putDateTime() + ": " + e.target.value)}/>
                <button>Send</button>
            </form>
        </StyledSection2>
    </>
}

const StyledH2 = styled.h2`
  font-size: 1.3rem;
  margin: 5px 0 20px 0;
  padding: 5px 0 5px 10px;
  border: 1px solid var(--color-lightgrey);
  border-radius: 1pc;
`

const StyledLi = styled.li`
  margin: 2px;
  padding: 2px;
`

const StyledSection = styled.section`
  height: 600px;
  overflow: auto;
  overflow-scrolling: inherit;
`

const StyledSection2 = styled.section`
  display: flex;
  justify-content: center;
  overflow: auto;
  overflow-scrolling: inherit;
`
