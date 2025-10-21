package group29.hust.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import group29.hust.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ResLoginDTO {
    @JsonProperty("access_token")
    private String accessToken;

    private UserData user;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserData {
        private long id;
        private String name;
        private String email;
        private Role role;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GetAccountUser {
        private UserData user;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InfoWithinToken {
        private long id;
        private String email;
        private String name;
    }
}
