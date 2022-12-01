package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChratService {

    private final ChratRepository chratRepository;
    private final ChratUserUtils chratUserUtils;
    public final ChratUserTokenRepository chratUserTokenRepository;

    String notFound = "User not found";

    ChratUser findByUsername(String username) throws ResponseStatusException {
        return chratRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, notFound));
    }

    public ChratUser save(@NotNull ChratUserDTO chratUserDTO) throws ResponseStatusException {
        if (chratRepository.findByUsername(chratUserDTO.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, notFound);
        }
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

    public ChratUser getUserDetails(String username) throws ResponseStatusException {
        return chratRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, notFound));
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

    public ChratUser updateUserProfile(ChratUserUpdateDTO chratUserUpdateDTO) throws ResponseStatusException {
        if (chratRepository.findByUsername(chratUserUpdateDTO.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        } else {
            ChratUser chratUser = chratRepository.findById(chratUserUpdateDTO.id())
                    .orElseThrow(() -> new RuntimeException(notFound));
            ChratUser updatedChratUser = new ChratUser(
                    chratUser.id(),
                    chratUserUpdateDTO.username(),
                    chratUser.passwordBcrypt(),
                    chratUserUpdateDTO.firstName(),
                    chratUserUpdateDTO.lastName(),
                    chratUserUpdateDTO.email()
            );
            return chratRepository.save(updatedChratUser);
        }
    }
}
