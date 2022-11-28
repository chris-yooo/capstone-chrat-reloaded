package de.strassow.backend.mainchat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
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

        MainChatMessage mainChatMessage = mainChatService.addMessage(message.getPayload());
        sessions.forEach(webSocketSession -> {
            try {
                webSocketSession.sendMessage(new TextMessage(mainChatMessage.message()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.add(session);

        for (MainChatMessage mainChatMessage : mainChatService.getMessages()) {
            session.sendMessage(new TextMessage(mainChatMessage.message()));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);
    }
}
