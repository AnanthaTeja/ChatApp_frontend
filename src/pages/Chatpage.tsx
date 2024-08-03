import React, { useState, useCallback, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  LogOutIcon,
  Menu,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import InputArea from "@/components/InputArea";
import MessageList from "@/components/MessageList";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const messageIdCounter = useRef(0);

  const addMessage = useCallback((message: string, isUser: boolean = true) => {
    const newId = messageIdCounter.current++;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: newId, text: message, isUser },
    ]);
    return newId;
  }, []);

  const updateMessage = useCallback((id: number, newText: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      )
    );
  }, []);

  const handleSendMessage = useCallback(
    (message: string) => {
      addMessage(message, true);
      setIsTyping(true);

      // Simulate API call and response streaming
      const words =
        "This is a simulated response from the system to mimic the real-time chat like chatgpt.".split(
          " "
        );
      let response = "";
      const systemMessageId = addMessage("", false);

      const simulateTyping = () => {
        if (words.length > 0) {
          response += words.shift() + " ";
          updateMessage(systemMessageId, response.trim());
          setTimeout(simulateTyping, 200);
        } else {
          setIsTyping(false);
        }
      };

      setTimeout(simulateTyping, 200);
    },
    [addMessage, updateMessage]
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsSheetOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side={"left"} className="w-[300px] flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Chat History</SheetTitle>
            <SheetDescription>Previous Chats</SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto">
            {/* Chat history */}
            <div className="space-y-4 p-4">
              <div className="p-2 bg-gray-100 rounded-md relative">
                I just started a new book. It's really good!
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                  10:05 AM
                </div>
              </div>
              <div className="p-2 bg-gray-100 rounded-md relative">
                I'm thinking about taking a vacation soon.
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                  10:15 AM
                </div>
              </div>
              <div className="p-2 bg-gray-100 rounded-md relative">
                Let's schedule a catch-up call next week.
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                  10:25 AM
                </div>
              </div>
              <div className="p-2 bg-gray-100 rounded-md relative">
                Do you need any help with your project?
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                  10:40 AM
                </div>
              </div>
              <div className="p-2 bg-gray-100 rounded-md relative">
                I just finished my task. Anything else I can help with?
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                  10:45 AM
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="mt-auto">
            <div className="w-full space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BellIcon className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Card className="min-h-screen w-full max-w-3xl flex flex-col">
        <CardHeader className="sticky top-0 bg-background z-10">
          <CardTitle>Chat Interface</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto py-4">
          <MessageList messages={messages} />
        </CardContent>
        <CardFooter className="sticky bottom-0 bg-background z-10 py-4">
          <InputArea onSendMessage={handleSendMessage} isTyping={isTyping} />
        </CardFooter>
      </Card>
    </>
  );
};

export default ChatInterface;
