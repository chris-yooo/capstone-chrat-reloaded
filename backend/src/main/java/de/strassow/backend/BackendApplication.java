package de.strassow.backend;

import de.strassow.backend.pictures.PictureStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Resource
    PictureStorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... arg) {
        storageService.deleteAll();
        storageService.init();
    }
}
