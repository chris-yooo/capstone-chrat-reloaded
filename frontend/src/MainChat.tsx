import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import useWebSocket, {ReadyState} from 'react-use-websocket';

export default function MainChat() {

    const [messageHistory, setMessageHistory] = useState<any>([]);
    const [message, setMessage] = useState('');

    const {sendMessage, lastMessage, readyState} = useWebSocket("ws://localhost:8080/api/mainchat");

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((messageHistory: any) => [...messageHistory, lastMessage]);
        }
    }, [lastMessage, setMessageHistory]);

    const handleMessageSubmit = (event: any) => {
        event.preventDefault();
        messageToSend();
    }

    const putDateTime = () => {
        const date = new Date();
        return date.toLocaleString();
    }

    const messageToSend = useCallback(() => sendMessage(message), [handleMessageSubmit, message]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const messages = messageHistory.map((message: { data: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
        <StyledLi key={idx}>
            {message ? message.data : null}
        </StyledLi>
    ));

    return <>
        <StyledH2>Main-Chat <span>{connectionStatus}</span></StyledH2>
        <StyledSection>
            <ul>
                {messages}
            </ul>
        </StyledSection>

        <StyledSection2>
            <form onSubmit={handleMessageSubmit}>
                <input type="text" disabled={readyState !== ReadyState.OPEN}
                       onChange={(e) => setMessage(putDateTime() + ": " + e.target.value)}/>
                <button>Send</button>
            </form>
        </StyledSection2>
    </>;
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
