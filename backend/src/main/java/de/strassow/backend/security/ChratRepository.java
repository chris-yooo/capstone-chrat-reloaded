package de.strassow.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChratRepository extends MongoRepository<ChratUser, String> {

    Optional<ChratUser> findByUsername(String username);
}
