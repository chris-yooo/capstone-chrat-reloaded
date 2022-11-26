package de.strassow.backend.security;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ChratUserUtils {
    public String addUUIDasString() {
        return UUID.randomUUID().toString();
    }
}
