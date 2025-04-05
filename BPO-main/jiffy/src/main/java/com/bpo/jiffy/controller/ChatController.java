package com.bpo.jiffy.controller;

import com.bpo.jiffy.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    // This serves the chat page (chat.html)
    @GetMapping("/chat")
    public String chatPage() {
        return "chat"; // Thymeleaf or static HTML from resources/templates
    }

    // This handles incoming chat messages
    @MessageMapping("/chat") // /app/chat (prefix defined in WebSocketConfig)
    @SendTo("/topic/messages") // Broadcasts to all subscribers
    public String handleMessage(String message) {
        // Optional: wrap in a ChatMessage object if you want richer structure
        return message;
    }
}
