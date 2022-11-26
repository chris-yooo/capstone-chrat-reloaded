package de.strassow.backend.security;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public record ChratUserDTO(
        @NotBlank
        String username,
        @Pattern(regexp = "^(?=[^A-Z]*+[A-Z])(?=[^a-z]*+[a-z])(?=\\D*+\\d)(?=[^#?!@$ %^&*-]*+[#?!@$ %^&*-]).{8,}$",message = "Password must have minimum eight characters, at least one letter and one number!")
        String password,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @Email
        String email
) {
}
