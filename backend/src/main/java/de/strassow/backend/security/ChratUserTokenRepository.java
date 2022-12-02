package de.strassow.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChratUserTokenRepository extends MongoRepository<ChratUserToken, String> {
}
