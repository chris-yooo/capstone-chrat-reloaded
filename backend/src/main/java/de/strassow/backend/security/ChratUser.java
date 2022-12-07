package de.strassow.backend.security;

import de.strassow.backend.pictures.PictureModel;

public record ChratUser(
        String id,
        String username,
        String passwordBcrypt,
        String firstName,
        String lastName,
        String email,
        PictureModel profilePicture
) {
}
