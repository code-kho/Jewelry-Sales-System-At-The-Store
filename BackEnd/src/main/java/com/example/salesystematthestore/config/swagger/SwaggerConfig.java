package com.example.salesystematthestore.config.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI defineOpenApi() {


        Server server = new Server();
        server.setUrl("four-gems-api-c21adc436e90.herokuapp.com");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("Trinh Dinh Ngoc An");
        myContact.setEmail("ngocanpro1234321@gmail.com");

        Info information = new Info()
                .title("Four-Gems System API")
                .version("1.0")
                .description("This API Use To Manager All Endpoint Of Four-Gems System.")
                .contact(myContact);
        return new OpenAPI().info(information).servers(List.of(server));
    }
}