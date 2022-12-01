package de.strassow.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChratUserTokenRepository extends MongoRepository<ChratUserToken, String> {
    Optional<ChratUser> findByUsername(String username);

    void deleteAllByUsername(String username);
}
