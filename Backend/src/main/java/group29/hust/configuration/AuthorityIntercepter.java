package group29.hust.configuration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import group29.hust.exception.ForbidenException;
import group29.hust.model.Permission;
import group29.hust.model.Role;
import group29.hust.model.User;
import group29.hust.service.impl.UserService;
import group29.hust.utils.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthorityIntercepter implements HandlerInterceptor {
    @Autowired
    UserService userService;

    @Transactional
    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws Exception {
        String path = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
        String requestURI = request.getRequestURI();
        String httpMethod = request.getMethod();
        System.out.println(">>> RUN preHandle");
        System.out.println(">>> path= " + path);
        System.out.println(">>> httpMethod= " + httpMethod);
        System.out.println(">>> requestURI= " + requestURI);
        // Check Permission
        String email = SecurityUtils.getCurrentUserLogin().isPresent()
                ? SecurityUtils.getCurrentUserLogin().get()
                : "";
        if (!email.isEmpty()) {
            User user = this.userService.handleGetUserByUsername(email);
            if (user != null) {
                Role role = user.getRole();
                if (role != null) {
                    List<Permission> permissions = role.getPermissions();
                    boolean isAccepted = permissions.stream()
                            .anyMatch(item -> item.getApiPath().equals(path) && item.getMethod().equals(httpMethod));
                    if (!isAccepted) {
                        throw new ForbidenException("You don't have permission to access");
                    }
                }
            }
        }
        return true;
    }
}
