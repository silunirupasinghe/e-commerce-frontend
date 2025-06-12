// components/Chatbot.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={handleChatToggle}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ffca28",
          "&:hover": { backgroundColor: "#ffb300" },
        }}
      >
        <CommentOutlinedIcon />
      </Fab>

      {isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "black", padding: "20px" }}
          >
            Chat with Us
          </Typography>
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  p: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                {message}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chatbot;