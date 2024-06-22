import { useState, useCallback } from "react";
import { Layout } from "antd";
import { Sidebar } from "./containers/Sidebar";
import { ChatArea } from "./containers/ChatArea";
import { BotLibrary } from "./containers/BotLibrary";
import { Chat, Bot, ChatMessage } from "./types";
import { v4 as uuidv4 } from "uuid";

const { Content, Sider } = Layout;

const initialChats: Chat[] = [
  {
    id: "1",
    name: "Initial Chat",
    messages: [],
  },
];

const initialBots: Bot[] = [
  {
    id: "1",
    name: "UX Designer",
    description: "Specialized in user experience design",
  },
  { id: "2", name: "Medi Scholar", description: "Expert in medical research" },
  {
    id: "3",
    name: "Software Planner",
    description: "Helps with software architecture and planning",
  },
];

const App = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [currentChatId, setCurrentChatId] = useState<string>(
    initialChats[0].id
  );
  const [bots] = useState<Bot[]>(initialBots);

  const currentChat = chats.find((chat) => chat.id === currentChatId)!;

  const handleNewChat = useCallback(() => {
    const newChat: Chat = {
      id: uuidv4(),
      name: `New Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  }, [chats]);

  const handleSendMessage = useCallback(
    (content: string) => {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        content,
        isUser: true,
        timestamp: new Date(),
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        )
      );
      // Here you would typically call an API to get the AI response
      // For this example, we'll just echo the user's message
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: uuidv4(),
          content: `Echo: ${content}`,
          isUser: false,
          timestamp: new Date(),
        };
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: [...chat.messages, aiResponse] }
              : chat
          )
        );
      }, 1000);
    },
    [currentChatId]
  );

  const handleDeleteMessage = useCallback(
    (id: string) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages.filter((msg) => msg.id !== id),
              }
            : chat
        )
      );
    },
    [currentChatId]
  );

  const handleEditMessage = useCallback(
    (id: string, newContent: string) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === id ? { ...msg, content: newContent } : msg
                ),
              }
            : chat
        )
      );
    },
    [currentChatId]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        chats={chats}
        onChatSelect={setCurrentChatId}
        onNewChat={handleNewChat}
      />
      <Layout>
        <Content style={{ padding: "24px" }}>
          <ChatArea
            currentChat={currentChat}
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
            onEditMessage={handleEditMessage}
          />
        </Content>
      </Layout>
      <Sider width={300} theme="light">
        <div style={{ padding: "16px" }}>
          <BotLibrary bots={bots} onBotSelect={console.log} />
        </div>
      </Sider>
    </Layout>
  );
};

export default App;
