package de.strassow.backend.mainchat;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.strassow.backend.security.ChratService;
import de.strassow.backend.security.ChratUserToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WebSocketService extends TextWebSocketHandler {

    private final Map<WebSocketSession, String> sessions = new HashMap<>();
    private final MainChatService mainChatService;
    private final ChratService chratService;
    private final ObjectMapper objectMapper;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);

        if (sessions.containsKey(session)) {
            MainChatMessage mainChatMessage = mainChatService.addMessage(message.getPayload(), sessions.get(session));
            sessions.forEach((webSocketSession, username) -> {
                try {
                    webSocketSession.sendMessage(new TextMessage(mainChatMessage.toString()));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            return;
        }

        if (message.getPayload().contains("id")) {
            ChratUserToken token = objectMapper.readValue(message.getPayload(), ChratUserToken.class);
            String username = chratService.tokenToCompare(token.id());
            sessions.put(session, username);
            chratService.deleteUserTokenAfterSessionAdd(token.id());

            for (MainChatMessage mainChatMessage : mainChatService.getMessages()) {
                session.sendMessage(new TextMessage(mainChatMessage.toString()));
            }
            return;
        }

        session.sendMessage(new TextMessage("Token is not valid"));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);
    }
}
