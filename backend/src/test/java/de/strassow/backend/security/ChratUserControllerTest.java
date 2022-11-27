package de.strassow.backend.security;

import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ChratUserControllerTest {

    @Autowired
    private MockMvc mvc;

    String base64ClientCredentials = new String(Base64.encodeBase64("detlev:SuperSecret344$$".getBytes()));

    @DirtiesContext
    @Test
    void addAppUser() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void loginWithTestUserAndExpectOK() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));
    }

    @DirtiesContext
    @Test
    void loginWithTestUserAndLogout() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/logout")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
//        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/me")).andExpect(status().isUnauthorized());
    }

    @DirtiesContext
    @Test
    void createUserAndCheckLoginMe() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/me")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("detlev"));
    }
}
