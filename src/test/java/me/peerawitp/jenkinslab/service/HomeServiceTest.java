package me.peerawitp.jenkinslab.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class HomeServiceTest {
     private final HomeService homeService = new HomeService();

     @Test
     public void testGetWelcomeMessage() {
         String message = homeService.getWelcomeMessage();
         assertEquals("Welcome to Jenkins Lab!", message);
     }
}
