import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isTyping }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping}
          className="flex-grow"
        />
        <Button type="submit" disabled={isTyping}>
          Send
        </Button>
      </form>
      {isTyping && (
        <div className="text-sm text-gray-500 mt-2">System is typing...</div>
      )}
    </div>
  );
};

export default InputArea;
