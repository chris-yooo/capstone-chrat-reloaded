package de.strassow.backend.pictures;

import de.strassow.backend.utils.ChratUserUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class PictureStorageService implements PictureStorage {
    private final Path root = Paths.get("uploads");
    private final ChratUserUtils chratUserUtils;

    public PictureStorageService(ChratUserUtils chratUserUtils) {
        this.chratUserUtils = chratUserUtils;
    }

    @Override
    public void init() {
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new IllegalArgumentException("Could not initialize folder for upload!");
        }
    }

    @Override
    public String save(MultipartFile file) {
        try {
            String fileNameNew = chratUserUtils.addUUIDasString() + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(Objects.requireNonNull(file.getOriginalFilename())));
            Files.move(this.root.resolve(file.getOriginalFilename()), this.root.resolve(fileNameNew));
            return fileNameNew;
        } catch (Exception e) {
            throw new IllegalArgumentException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new IllegalArgumentException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1)
                    .filter(path -> !path.equals(this.root))
                    .map(this.root::relativize);
        } catch (IOException e) {
            throw new IllegalArgumentException("Could not load the files!");
        }
    }
}
