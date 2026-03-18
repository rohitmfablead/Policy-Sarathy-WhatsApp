import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockContacts = [
  {
    id: "1",
    name: "Rahul Sharma",
    lastMessage: "Hey, how are you?",
    timestamp: "2:30 PM",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    name: "Priya Singh",
    lastMessage: "Thanks for the update",
    timestamp: "1:45 PM",
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    name: "Amit Kumar",
    lastMessage: "See you tomorrow",
    timestamp: "12:30 PM",
    unreadCount: 1,
    online: true,
  },
  {
    id: "4",
    name: "Neha Verma",
    lastMessage: "Don’t forget the meeting",
    timestamp: "11:15 AM",
    unreadCount: 3,
    online: false,
  },
  {
    id: "5",
    name: "Ravi Patel",
    lastMessage: "Where are you?",
    timestamp: "Yesterday",
    unreadCount: 0,
    online: true,
  },
  {
    id: "6",
    name: "Sanya Mehta",
    lastMessage: "Good night 🌙",
    timestamp: "10:45 PM",
    unreadCount: 5,
    online: false,
  },
  {
    id: "7",
    name: "Arjun Reddy",
    lastMessage: "Call me when you’re free",
    timestamp: "9:20 AM",
    unreadCount: 1,
    online: true,
  },
  {
    id: "8",
    name: "Meera Kapoor",
    lastMessage: "Happy Birthday! 🎉",
    timestamp: "Monday",
    unreadCount: 0,
    online: false,
  },
  {
    id: "9",
    name: "Kabir Khan",
    lastMessage: "Let’s catch up this weekend",
    timestamp: "Sunday",
    unreadCount: 2,
    online: true,
  },
  {
    id: "10",
    name: "Ananya Iyer",
    lastMessage: "Got it, thanks!",
    timestamp: "8:00 AM",
    unreadCount: 0,
    online: false,
  },
];

const mockMessages = [
  {
    id: "1",
    sender: "contact",
    message: "Hi! How are you doing?",
    timestamp: "2:25 PM",
    status: "read",
  },
  {
    id: "2",
    sender: "user",
    message: "I am doing great! Thanks for asking. How about you?",
    timestamp: "2:26 PM",
    status: "read",
  },
  {
    id: "3",
    sender: "contact",
    message: "I am good too. Are we still meeting tomorrow?",
    timestamp: "2:28 PM",
    status: "read",
  },
  {
    id: "4",
    sender: "user",
    message: "Yes, definitely! See you at 3 PM.",
    timestamp: "2:30 PM",
    status: "delivered",
  },
  {
    id: "5",
    sender: "contact",
    message: "Perfect! Don’t forget the documents.",
    timestamp: "2:32 PM",
    status: "read",
  },
  {
    id: "6",
    sender: "user",
    message: "Sure, already packed them 👍",
    timestamp: "2:34 PM",
    status: "sent",
  },
  {
    id: "7",
    sender: "contact",
    message: "Great. Should we grab coffee after?",
    timestamp: "2:36 PM",
    status: "delivered",
  },
  {
    id: "8",
    sender: "user",
    message: "Sounds good! ☕",
    timestamp: "2:38 PM",
    status: "read",
  },
  {
    id: "9",
    sender: "contact",
    message: "Awesome, looking forward to it.",
    timestamp: "2:40 PM",
    status: "read",
  },
  {
    id: "10",
    sender: "user",
    message: "Same here, see you tomorrow!",
    timestamp: "2:42 PM",
    status: "sent",
  },
];

export const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: "user",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-7xl mx-auto px-0">

      {/* <div className="h-1/2 max-w-7xl mx-auto p-2"> */}
        <div className="mb-6 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Chat
          </h1>
          <p className="text-muted-foreground mt-1">
            Communicate with your contacts instantly
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 h-3/4">
          {/* Contacts Sidebar (Fixed) */}
          <div className="col-span-12 lg:col-span-4 h-screen">
            <Card className="h-full  flex flex-col card-elegant shadow-elegant">
              <div className="p-4 border-b border-border/50 bg-card/50">
                <h2 className="font-semibold text-lg mb-3 text-foreground">
                  Conversations
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent/50 mb-1 ${
                        selectedContact.id === contact.id
                          ? "bg-primary/10 border border-primary/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-14 h-14 ring-2 ring-border/20">
                            <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {contact.name}
                            </h3>
                            <span className="text-xs text-muted-foreground font-medium">
                              {contact.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {contact.lastMessage}
                          </p>
                        </div>
                        {contact.unreadCount > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-medium shadow-sm">
                            {contact.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
          {/* Chat Area (Only this scrolls) */}
          <div className="col-span-12 lg:col-span-8 h-screen">
            {" "}
            {/* <-- h-full for chat area */}
            <Card className="h-full flex flex-col card-elegant shadow-elegant">
              <div className="p-4 border-b border-border/50 bg-card/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-border/20">
                        <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                          {selectedContact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {selectedContact.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {selectedContact.online ? (
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Online</span>
                          </span>
                        ) : (
                          "Last seen recently"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Only this ScrollArea will scroll */}
              <ScrollArea className="flex-1 min-h-0">
                {" "}
                {/* <-- min-h-0 ensures scroll works */}
                <div className="p-6 bg-gradient-to-b from-background/50 to-muted/20 h-full">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                            message.sender === "user"
                              ? "bg-gradient-primary text-white rounded-br-md"
                              : "bg-card border border-border/20 text-foreground rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.message}
                          </p>
                          <div
                            className={`flex items-center justify-end mt-2 space-x-1 ${
                              message.sender === "user"
                                ? "text-white/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            <span className="text-xs font-medium">
                              {message.timestamp}
                            </span>
                            {message.sender === "user" && message.status && (
                              <div className="text-xs ml-1">
                                {message.status === "sent" && (
                                  <span className="text-white/70">✓</span>
                                )}
                                {message.status === "delivered" && (
                                  <span className="text-white/70">✓✓</span>
                                )}
                                {message.status === "read" && (
                                  <span className="text-blue-200">✓✓</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border/50 bg-card/50">
                <div className="flex items-center space-x-3">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 h-11"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="sm"
                    className="bg-gradient-primary hover:shadow-glow h-11 px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    // </div>
  );
};
