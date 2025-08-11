package me.peerawitp.jenkinslab.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class HomeService {
     public String getWelcomeMessage() {
         return "Welcome to Jenkins Lab!";
     }
}
