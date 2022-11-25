package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChratService {

    private final ChratRepository chratRepository;

    ChratUser findByUsername(String username) {
        return chratRepository.findByUsername(username);
    }

    public void save(ChratUserDTO chratUserDTO) {
        String passwordBcrypt = SecurityConfig
            .passwordEncoder
            .encode(chratUserDTO.password());

        ChratUser chratUser = new ChratUser(
            UUID.randomUUID().toString(),
            chratUserDTO.username(),
            passwordBcrypt
        );

        chratRepository.save(chratUser);
    }
}
