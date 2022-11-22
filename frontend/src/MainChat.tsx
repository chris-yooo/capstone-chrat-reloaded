import React, {useCallback, useEffect, useRef, useState} from 'react';
import {nanoid} from "nanoid";
import styled from "styled-components";

export default function MainChat() {

    const connection = useRef<WebSocket>();
    const shouldKeepWSAlive = useRef<boolean>(false);
    const [messagesList, setMessagesList] = useState<any[]>([]);

    useEffect(() => {
        if (!(connection &&
            connection.current &&
            connection.current.readyState === 1)) {
            connection.current = new WebSocket("ws://localhost:8080/api/mainchat");
            connection.current.onopen = () => {
                console.log("WebSocket connection established");
            }
            connection.current.onclose = () => {
                console.log("WebSocket connection closed");
            };
            connection.current.onmessage = (e) => {
                setMessagesList(messagesList => [...messagesList, e.data])
            };
        }
    }, []);

    const keepAlive = useCallback(() => {
        if (shouldKeepWSAlive.current) {
            if (connection.current !== undefined &&
                connection.current !== null &&
                connection.current.readyState === 1) {
                connection.current.send("");
            }
            setTimeout(() => {
                keepAlive();
            }, 20000);
        }
    }, []);

    useEffect(() => {
        if (!connection.current) {
            shouldKeepWSAlive.current = true;
            keepAlive();
        } else {
            shouldKeepWSAlive.current = false;
        }
    }, [keepAlive]);

    const messages = messagesList.map((message) => {
        return (
            <StyledLi key={nanoid()}>
                {message}
            </StyledLi>
        )
    });

    return <>
        <StyledH2>Main-Chat</StyledH2>
        <StyledSection>
        <ul>
            {messages}
        </ul>
        </StyledSection>
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
