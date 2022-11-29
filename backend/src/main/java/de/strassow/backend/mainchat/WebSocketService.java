package de.strassow.backend.mainchat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class WebSocketService extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final MainChatService mainChatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);

        if (sessions.contains(session)) {

            MainChatMessage mainChatMessage = mainChatService.addMessage(message.getPayload());
            sessions.forEach(webSocketSession -> {
                try {
                    webSocketSession.sendMessage(new TextMessage(mainChatMessage.message()));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            return;
        }

        if (message.getPayload().contains("id")) {

            String token = message.getPayload().substring(10, 46);

            if (token.equals(mainChatService.tokenToCompare(token))) {
                sessions.add(session);
                mainChatService.deleteUserTokenAfterSessionAdd(token);

                for (MainChatMessage mainChatMessage : mainChatService.getMessages()) {
                    session.sendMessage(new TextMessage(mainChatMessage.message()));
                }
            }

        } else {
            session.sendMessage(new TextMessage("Token is not valid"));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);
    }
}
