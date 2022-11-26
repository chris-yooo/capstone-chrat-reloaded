package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChratService {

    private final ChratRepository chratRepository;

    private final ChratUserUtils chratUserUtils;

    ChratUser findByUsername(String username) {
        return chratRepository.findByUsername(username);
    }

    public void save(ChratUserDTO chratUserDTO) {
        String passwordBcrypt = SecurityConfig
                .passwordEncoder
                .encode(chratUserDTO.password());

        ChratUser chratUser = new ChratUser(
                chratUserUtils.addUUIDasString(),
                chratUserDTO.username(),
                passwordBcrypt
        );

        chratRepository.save(chratUser);
    }
}
