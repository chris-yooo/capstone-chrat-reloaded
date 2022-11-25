package de.strassow.backend.security;

public record ChratUser(
        String id,
        String username,
        String passwordBcrypt
) {
}
