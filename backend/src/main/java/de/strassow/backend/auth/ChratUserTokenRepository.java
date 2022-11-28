package de.strassow.backend.auth;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChratUserTokenRepository extends MongoRepository<ChratUserToken, String> {
}
