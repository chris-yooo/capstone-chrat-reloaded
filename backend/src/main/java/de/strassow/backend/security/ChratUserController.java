package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/chrat-users")
@RequiredArgsConstructor
public class ChratUserController {

    private final ChratService chratService;

    @PostMapping
    public ChratUser addChratUser(@Valid @RequestBody DtoNewChratUser dtoNewChratUser) {
        return chratService.addChratUser(dtoNewChratUser);
    }

    @GetMapping("/me")
    public ChratUserToken me() {
        return chratService.chratUserToken(SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName());
    }

    @GetMapping("/{username}")
    public ChratUser profile(@PathVariable String username) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        if (!usernameFromSession.equals(username)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "The username you want to display not equals to your session username");
        }
        return chratService.getChratUserDetails(username);
    }

    @PutMapping("/{id}")
    public ChratUser profileUpdate(@PathVariable String id, @RequestBody DtoUpdateChratUser dtoUpdateChratUser) {
        if (!dtoUpdateChratUser.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The username you want to update not equals to your req Body user.id");
        }
        return chratService.updateUserProfile(dtoUpdateChratUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteChratUser(@PathVariable String id) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        ChratUser chratUserFromRepo = chratService.findByUsername(usernameFromSession);
        if (!id.equals(chratUserFromRepo.id())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The username you want to delete not found!");
        }
        chratService.deleteUser(id);
    }

    @GetMapping("/login")
    public String login() {
        return "OK";
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        String usernameFromSession = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        chratService.deleteUnusedToken(usernameFromSession);
        httpSession.invalidate();
    }
}
