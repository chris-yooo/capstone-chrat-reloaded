package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChratService {

    private final ChratRepository chratRepository;
    private final ChratUserUtils chratUserUtils;
    public final ChratUserTokenRepository chratUserTokenRepository;

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

    public ChratUser getUserDetails(String username) {
        return chratRepository.findByUsername(username);
    }

    public ChratUserToken chratUserToken(String username) {
        if (Objects.equals(username, "anonymousUser")) {
            return new ChratUserToken("", "anonymousUser");
        }
        if (chratUserTokenRepository.findByUsername(username).isPresent()) {
            chratUserTokenRepository.deleteAllByUsername(username);
        }
        ChratUserToken chratUserToken = new ChratUserToken(chratUserUtils.addUUIDasString(), username);
        chratUserTokenRepository.save(chratUserToken);
        return chratUserToken;
    }
}
