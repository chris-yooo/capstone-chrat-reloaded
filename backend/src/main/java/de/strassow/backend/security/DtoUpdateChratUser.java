package de.strassow.backend.security;

import de.strassow.backend.pictures.PictureModel;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record DtoUpdateChratUser(
        @NotBlank String id,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @Email String email,
        PictureModel profilePicture
) {
}
