'use client';
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import socket, { initiateSocket, sendMessage, subscribeToMessages } from "@/lib/socket.js";
import { useUser, UserButton } from '@clerk/nextjs';

const Chat = () => {

  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setChatLog((prevLog) => [...prevLog, msg]);
    };

    initiateSocket();
    subscribeToMessages(handleNewMessage);

    return () => {
      socket?.disconnect();
    };
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message.trim() && user) {
      const newMessage = {
        name: user.username || user.firstName || "Anonymous",
        profileImage: user.imageUrl || "/default-profile.jpg",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: message,
        bgColor: "bg-[#212121]",
        align: "justify-end"
      };
      sendMessage(newMessage);
      setChatLog((prevLog) => [...prevLog, newMessage]);
      setMessage("");
    } else {
      console.warn("Empty message not sent or user not logged in.");
    }
  }, [message, user]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4 mb-[70px]">
        <div className="space-y-4">
          {chatLog.map((msg, index) => (
            <div key={index} className={`flex items-start gap-4 ${msg.align || ""}`}>
              <div className={`rounded-full ${msg.bgColor} w-8 h-8 flex items-center justify-center`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={msg.profileImage} 
                  alt={`${msg.name}'s profile picture`} 
                  className="w-full h-full rounded-full" 
                />
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-[60%] md:max-w-[50%] lg:max-w-[40%] break-words flex flex-col">
                <div className="flex justify-between w-full items-center mb-1">
                  <div className="font-medium text-base mx-2">{msg.name}</div>
                  <div className="text-xs text-muted-foreground">{msg.time}</div>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background py-3 px-4 flex items-center gap-2 border-t">
        <UserButton />
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-lg bg-muted px-4 py-2 text-sm"
        />
        <Button
          onClick={handleSendMessage}
          className="rounded-lg px-4 py-2 text-sm"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;