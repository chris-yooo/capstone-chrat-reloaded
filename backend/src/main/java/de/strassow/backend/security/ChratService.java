package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChratService {

    private final ChratRepository chratRepository;

    private final ChratUserUtils chratUserUtils;

    ChratUser findByUsername(String username) {
        return chratRepository.findByUsername(username);
    }

    public ChratUser save(@NotNull ChratUserDTO chratUserDTO) {
        String passwordBcrypt = chratUserUtils.addPasswordBcrypt(chratUserDTO.password());

        ChratUser chratUser = new ChratUser(
                chratUserUtils.addUUIDasString(),
                chratUserDTO.username(),
                passwordBcrypt,
                chratUserDTO.firstName(),
                chratUserDTO.lastName(),
                chratUserDTO.email()
        );

        chratRepository.save(chratUser);
        return chratUser;
    }
}
