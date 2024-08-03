import React from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  text: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="h-90 overflow-y-auto space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.isUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
