import { useState } from "react";
import { Space, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Select } from "../components/Select";
import { ChatMessage } from "../components/ChatMessage";
import { Button } from "../components/Button";
import { Chat } from "../types";

interface ChatAreaProps {
  currentChat: Chat;
  onSendMessage: (content: string) => void;
  onDeleteMessage: (id: string) => void;
  onEditMessage: (id: string, newContent: string) => void;
}

export const ChatArea = ({
  currentChat,
  onSendMessage,
  onDeleteMessage,
  onEditMessage,
}: ChatAreaProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleEdit = (id: string) => {
    const newContent = prompt("Edit message:");
    if (newContent !== null) {
      onEditMessage(id, newContent);
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Space>
        <Select
          defaultValue="ux"
          style={{ width: 200 }}
          options={[
            { value: "ux", label: "UX Designer" },
            { value: "medi", label: "Medi Scholar" },
            { value: "software", label: "Software Planner" },
          ]}
        />
        <Select
          defaultValue="gpt4"
          style={{ width: 200 }}
          options={[
            { value: "gpt4", label: "GPT-4" },
            { value: "gpt35", label: "GPT-3.5" },
            { value: "gpt3", label: "GPT-3" },
          ]}
        />
      </Space>
      {currentChat.messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          onDelete={onDeleteMessage}
          onEdit={handleEdit}
        />
      ))}
      <Input.Search
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe tu mensaje"
        enterButton={<Button icon={<SendOutlined />} />}
        size="large"
        onSearch={handleSend}
      />
    </Space>
  );
};
