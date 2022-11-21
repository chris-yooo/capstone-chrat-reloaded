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
public class ChatService extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final MainChatService mainChatService;

    private final MainChatRepository mainChatRepository;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);

        System.out.println("Nachricht empfangen: " + message.getPayload());

//        String tesst = message.getPayload();
//        System.out.println(tesst);

//        MessageForMongo test = new MessageForMongo(tesst) {


        handleMessage(session, message);
        for (WebSocketSession s : sessions) {
            try {
                s.sendMessage(message);
//                mainChatService.addMessageToMongo(message);
//                super.handleTextMessage(mainChatRepository.save(WebSocketSession session, TextMessage message));
//                mainChatRepository.save(message.getPayload());

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public MessageForMongo handleMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        for (WebSocketSession s : sessions) {
            try {
                s.sendMessage(message);
                return new MessageForMongo(message.getPayload());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

//    public MessageForMongo handleMessag(MessageForMongo tesst){
//        MessageForMongo messageForMongo = new MessageForMongo(tesst)
//        return mainChatService.addMessageToMongo(messageForMongo);
//    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.add(session);

        System.out.println("Verbindung hergestellt!");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);

        System.out.println("Verbindung abgebrochen!");
    }
}
