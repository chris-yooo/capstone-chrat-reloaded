package de.strassow.backend;

import de.strassow.backend.pictures.PictureStorage;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Resource
    PictureStorage storageService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... arg) {
        //for first use activate these 2 lines
        //storageService.deleteAll();
        //storageService.init();
    }
}
