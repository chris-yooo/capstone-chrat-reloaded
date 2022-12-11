package de.strassow.backend.security;

import de.strassow.backend.pictures.PictureModel;
import de.strassow.backend.utils.ChratUserUtils;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChratService {

    private final ChratRepository chratRepository;
    private final ChratUserUtils chratUserUtils;
    public final ChratUserTokenRepository chratUserTokenRepository;

    String notFound = "User not found";

    ChratUser getChratUser(String username) throws ResponseStatusException {
        return chratRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, notFound));
    }

    public ChratUser addChratUser(@NotNull DtoNewChratUser dtoNewChratUser) throws ResponseStatusException {
        if (chratRepository.findByUsername(dtoNewChratUser.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, notFound);
        }
        PictureModel profilePicture = new PictureModel("placeholder.jpg", "/api/pictures/files/placeholder.jpg");
        String passwordBcrypt = chratUserUtils.addPasswordBcrypt(dtoNewChratUser.password());
        ChratUser chratUser = new ChratUser(
                chratUserUtils.addUUIDasString(),
                dtoNewChratUser.username(),
                passwordBcrypt,
                dtoNewChratUser.firstName(),
                dtoNewChratUser.lastName(),
                dtoNewChratUser.email(),
                profilePicture
        );
        chratRepository.save(chratUser);
        return chratUser;
    }

    public ChratUser getChratUserDetails(String username) throws ResponseStatusException {
        return chratRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, notFound));
    }

    public ChratUser updateUserProfile(DtoUpdateChratUser dtoUpdateChratUser) {
        ChratUser chratUser = chratRepository.findById(dtoUpdateChratUser.id())
                .orElseThrow(() -> new RuntimeException(notFound));
        ChratUser updatedChratUser = new ChratUser(
                chratUser.id(),
                chratUser.username(),
                chratUser.passwordBcrypt(),
                dtoUpdateChratUser.firstName(),
                dtoUpdateChratUser.lastName(),
                dtoUpdateChratUser.email(),
                dtoUpdateChratUser.profilePicture()
        );
        return chratRepository.save(updatedChratUser);
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

    public void deleteUserTokenAfterSessionAdd(String id) {
        chratUserTokenRepository.findById(id);
        chratUserTokenRepository.deleteById(id);
    }

    public String tokenToCompare(String id) {
        return chratUserTokenRepository.findById(id).map(ChratUserToken::username)
                .orElseThrow(() -> new NoSuchElementException("No value present"));
    }

    public void deleteUser(String id) {
        chratRepository.deleteById(id);
    }

    public ChratUser findByUsername(String usernameFromSession) {
        return chratRepository.findByUsername(usernameFromSession)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, notFound));
    }


    public void deleteUnusedToken(String usernameFromSession) {
        if (chratUserTokenRepository.findByUsername(usernameFromSession).isPresent()) {
            chratUserTokenRepository.deleteAllByUsername(usernameFromSession);
        }
    }
}
