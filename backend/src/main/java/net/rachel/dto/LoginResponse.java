package net.rachel.dto;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import net.rachel.entity.Role;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
    private Set<Role> roles;
}
