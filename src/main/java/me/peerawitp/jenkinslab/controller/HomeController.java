package me.peerawitp.jenkinslab.controller;

import lombok.RequiredArgsConstructor;
import me.peerawitp.jenkinslab.service.HomeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;

    @GetMapping
    public String index() {
        return homeService.getWelcomeMessage();
    }
}
