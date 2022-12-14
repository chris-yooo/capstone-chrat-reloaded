import React, {FormEvent, useState} from 'react';
import styled from "styled-components";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {nanoid} from "nanoid";
import {Icon} from '@iconify/react';
import {ChratUserTokenModel} from "../security/ChratUserTokenModel";

type Props = {
    user: ChratUserTokenModel
}

type MainChatMessage = {
    username: string,
    datetime: string,
    message: string,
}

export default function MainChat(props: Props) {

    const host = window.location.host;
    let baseUrl
    if (host === "localhost:3000") {
        baseUrl = "ws://localhost:8080"
    } else {
        // baseUrl = "wss://" + host;
        baseUrl = "ws://" + host;
    }

    const wsServiceUrl = baseUrl + '/api/mainchat';

    const [MainChatMessages, setMainChatMessage] = useState<MainChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState('');

    const WebSocket = useWebSocket(wsServiceUrl, {
        onOpen: () => {
            console.log("Connected to websocket");
            WebSocket.sendMessage(JSON.stringify(props.user))
        },
        onMessage: (event) => {
            let parsed = JSON.parse(event.data.replace(/'/g, '"'));
            setMainChatMessage((messageHistory: MainChatMessage[]) => [...messageHistory, parsed]);
        },
        onClose: () => {
            console.log("Disconnected from websocket");
        },
        shouldReconnect: () => true,
        retryOnError: true,
        onError: (event) => {
            console.log(event);
        },
        share: true,
    });

    const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        WebSocket.sendMessage(messageInput)
        setMessageInput("");
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: <Icon icon="fluent:plug-connected-20-regular" color="var(--color-yellow)" width="40"/>,
        [ReadyState.OPEN]: <Icon icon="fluent:plug-connected-20-filled" width="40" color="var(--color-white)"/>,
        [ReadyState.CLOSING]: <Icon icon="fluent:plug-connected-20-regular" color="var(--color-yellow)" width="40"/>,
        [ReadyState.CLOSED]: <Icon icon="tabler:plug-connected-x" color="var(--color-red)" width="40"/>,
        [ReadyState.UNINSTANTIATED]: <Icon icon="tabler:plug-connected-x" color="var(--color-red)" width="40"/>,
    }[WebSocket.readyState];

    const messageHistory = MainChatMessages.map((message: MainChatMessage) =>
        <StyledLi key={nanoid()}>{message.username} {message.datetime}<br/>
            <strong>{message.message}</strong></StyledLi>
    );

    return <>
        <StyledSpan>{connectionStatus}</StyledSpan>
        <StyledSection>
            <StyledUl>
                {messageHistory}
            </StyledUl>
            <StyledDiv1>
                <StyledInputForm onSubmit={handleMessageSubmit}>
                    <StyledInput
                        disabled={WebSocket.readyState !== ReadyState.OPEN}
                        onChange={(e) => setMessageInput(e.target.value)}
                        type="text"
                        value={messageInput}
                        autoComplete="off"
                        name="message"
                        id="message"
                        required
                    ></StyledInput>
                    <StyledInputButton type="submit" id="sendMessage">
                        <Icon icon="carbon:send-alt" style={{fontSize: '28px'}}/>
                    </StyledInputButton>
                </StyledInputForm>
            </StyledDiv1>
        </StyledSection>
    </>
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 90%;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  background-color: var(--color-background);
  @media (max-width: 768px) {
    width: 85%;
  }
`

const StyledUl = styled.ul`
  height: 65vh;
  width: 80%;
  overflow: auto;
  overflow-scrolling: inherit;
  @media (max-height: 700px) {
    height: 50vh;
  }
  @media (max-height: 500px) {
    height: 40vh;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLi = styled.li`
  margin: 4px 30px 4px 0;
  padding: 2px;
  display: block;
  word-wrap: break-word;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 18px;
  color: var(--color-text);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
`

const StyledSpan = styled.span`
  position: fixed;
  top: 20px;
  right: 20px;
  @media (max-width: 768px) {
    top: 1vh;
    right: 2vw;
  }
`

const StyledDiv1 = styled.div`
  display: flex;
  text-align: left;
  justify-content: space-between;
  width: 370px;
  height: 45px;
  background: #d9d9d9;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  @media (max-width: 768px) {
    width: 350px;
  }
`;

const StyledInputForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 0 0 0 0.8rem;
  color: #2e2e2e;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-style: normal;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  &:hover {
    outline: 2px solid #0060df;
    border-radius: 12px 0 0 12px;
  }

  &:active {
    outline: 2px solid #0060df;
    border-radius: 12px 0 0 12px;
  }

  &:focus {
    outline: 2px solid #0060df;
    border-radius: 12px 0 0 12px;
  }
`

const StyledInputButton = styled.button`
  width: 7rem;
  border: none;
  border-radius: 0 12px 12px 0;
  margin-left: 2px;

  &:hover {
    outline: 2px solid #0060df;
    border-radius: 0 12px 12px 0;
  }

  &:active {
    outline: 2px solid #0060df;
    border-radius: 0 12px 12px 0;
  }

  &:focus {
    outline: 2px solid #0060df;
    border-radius: 0 12px 12px 0;
  }
`
