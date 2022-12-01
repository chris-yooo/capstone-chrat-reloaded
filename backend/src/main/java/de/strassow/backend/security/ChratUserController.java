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
    public void createAppUser(@Valid @RequestBody ChratUserDTO chratUserDTO) {
        chratService.save(chratUserDTO);
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
        return chratService.getUserDetails(username);
    }

    @GetMapping("/login")
    public String login() {
        return "OK";
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }
}
