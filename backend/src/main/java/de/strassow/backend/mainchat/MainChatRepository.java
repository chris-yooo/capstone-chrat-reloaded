package de.strassow.backend.mainchat;

import org.apache.logging.log4j.message.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MainChatRepository extends MongoRepository<Message, String> {

}
