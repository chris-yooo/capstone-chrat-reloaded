package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@RequiredArgsConstructor
public class ChratSecurityConfig {

    public static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final ChratService chratService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/", "/static/**", "/index.html", "/api/chrat-users/me").permitAll()
                .antMatchers(HttpMethod.POST, "/api/chrat-users").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/chrat-users/{id}").authenticated()
                .antMatchers("/api/mainchat", "/api/chrat-users/login", "/api/chrat-users/logout", "/api/chrat-users/{username}").authenticated()
                .anyRequest().denyAll()
                .and().build();
    }

    @Bean
    public PasswordEncoder encoder() {
        return passwordEncoder;
    }

    @Bean
    public UserDetailsManager userDetailsService() {

        String udmException = "You cannot use this custom UserDetailsManager for this action.";
        return new UserDetailsManager() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                ChratUser userByName = chratService.getChratUser(username);
                if (userByName == null) {
                    throw new UsernameNotFoundException("Username not found");
                }
                return User.builder()
                        .username(username)
                        .password(userByName.passwordBcrypt())
                        .roles("BASIC")
                        .build();
            }

            @Override
            public void createUser(UserDetails user) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public void updateUser(UserDetails user) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public void deleteUser(String username) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public void changePassword(String oldPassword, String newPassword) {
                throw new UnsupportedOperationException(udmException);
            }

            @Override
            public boolean userExists(String username) {
                throw new UnsupportedOperationException(udmException);
            }
        };
    }
}
