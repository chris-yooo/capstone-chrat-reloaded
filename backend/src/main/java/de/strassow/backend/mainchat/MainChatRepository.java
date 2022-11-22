package de.strassow.backend.mainchat;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MainChatRepository extends MongoRepository<ChatMessage, String> {
}
