import React, {FormEvent, useState} from 'react';
import styled from "styled-components";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {nanoid} from "nanoid";
import {Icon} from '@iconify/react';

export default function MainChat() {

    let host = window.location.host;
    if (host === "localhost:3000") {
        host = "localhost:8080";
    }

    const wsServiceUrl = 'ws://' + host + '/api/mainchat';

    const [messageHistory, setMessageHistory] = useState<string[]>([]);
    const [message, setMessage] = useState('');

    const WebSocket = useWebSocket(wsServiceUrl, {
        onOpen: () => {
            console.log("Connected to websocket");
        },
        onMessage: (event) => {
            let parsed = event.data;
            setMessageHistory((messageHistory: string[]) => [...messageHistory, parsed]);
        },
        onClose: () => {
            console.log("Disconnected from websocket");
        },
    });

    const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        messageToSend();
        setMessage('');
    }

    const messageToSend = () => WebSocket.sendMessage(message);

    const readyState = WebSocket.readyState;

    const connectionStatus = {
        [ReadyState.CONNECTING]: <Icon icon="fluent:plug-connected-20-regular" color="var(--color-yellow)" width="40" />,
        [ReadyState.OPEN]: <Icon icon="fluent:plug-connected-20-filled" width="40" color="var(--color-white)"/>,
        [ReadyState.CLOSING]: <Icon icon="tabler:plug-connected-x" color="var(--color-blue)" width="40" />,
        [ReadyState.CLOSED]: <Icon icon="tabler:plug-connected-x" color="var(--color-red)" width="40" />,
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const messages = messageHistory.map((message: any) =>
        <StyledLi key={nanoid()}>
            {message ? message : null}
        </StyledLi>);

    return <>
        <StyledSpan>{connectionStatus}</StyledSpan>
        <StyledDiv1>
            <StyledMessage>
                <ul>
                    {messages}
                </ul>
            </StyledMessage>
            <StyledDiv2>
                <StyledInputForm onSubmit={handleMessageSubmit}>
                    <StyledInput
                        disabled={readyState !== ReadyState.OPEN}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        value={message}
                        autoComplete="off"
                        name="message"
                        id="message"
                        required
                    ></StyledInput>
                    <StyledInputButton type="submit" id="sendMessage">
                        <Icon icon="carbon:send-alt" style={{fontSize: '28px'}}/>
                    </StyledInputButton>
                </StyledInputForm>
            </StyledDiv2>
        </StyledDiv1>
    </>
}

const StyledMessage = styled.article`
  display: block;
  word-wrap: break-word;
  margin-top: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 18px;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
  margin-bottom: 12px;
  height: 500px;
  overflow: auto;
  overflow-scrolling: inherit;
`

const StyledSpan = styled.span`
  position: fixed;
  top: 20px;
  left: 20px;
`

const StyledDiv1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledDiv2 = styled.div`
  text-align: left;
  display: flex;
  position: fixed;
  bottom: 52px;
  justify-content: space-between;
  width: 346px;
  height: 45px;
  background: #d9d9d9;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`;

const StyledInputForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 0.4rem;
  padding-left: 0.8rem;
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

const StyledLi = styled.li`
  margin: 4px;
  padding: 2px;
`
