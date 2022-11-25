package de.strassow.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChratRepository extends MongoRepository<ChratUser, String> {

    ChratUser findByUsername(String username);
}
