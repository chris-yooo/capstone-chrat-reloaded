package de.strassow.backend.auth;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChratUserTokenRepository extends MongoRepository<ChratUserToken, String> {
    Optional<Object> findByUsername(String username);

    void deleteAllByUsername(String username);
}
