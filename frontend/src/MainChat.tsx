import React, {useCallback, useEffect, useRef} from 'react';

export default function MainChat() {

    const connection = useRef<WebSocket>();
    const keepWSAlive = useRef<boolean>(false);

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
                console.log("WebSocket message received: " + e.data);
            };
        }
    }, []);

    const keepAlive = useCallback(() => {
        if (keepWSAlive.current) {
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
        if (connection.current) {
            keepWSAlive.current = true;
            keepAlive();
        } else {
            keepWSAlive.current = false;
        }
    }, [keepAlive]);

    return <>
        <p style={{textAlign: "center"}}>Moin</p>
    </>;
}
