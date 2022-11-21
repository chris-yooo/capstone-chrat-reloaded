package de.strassow.backend.mainchat;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.Message;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;

    public Message addMessageToMongo(Message message) {
        return this.mainChatRepository.save(message);
    }
}
