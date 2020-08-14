package ru.dfsystems.spring.tutorial.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.dfsystems.spring.tutorial.security.SecurityFilter;

@Configuration
public class SecurityFilterConfig {

    @Bean
    public FilterRegistrationBean<SecurityFilter> filterRegistrationBean(SecurityFilter filter) {
        var registrationBean = new FilterRegistrationBean<SecurityFilter>();
        registrationBean.setName("SecurityFilter");
        registrationBean.setFilter(filter);

        registrationBean.addInitParameter("public", "/api/auth/login, /api/auth/registration");
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }
}
