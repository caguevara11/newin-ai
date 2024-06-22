import { Card, Space, Avatar, Typography } from "antd";
import {
  UserOutlined,
  RobotOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button } from "./Button";
import { ChatMessage as ChatMessageType } from "../types";

const { Text } = Typography;

type ChatMessageProps = {
  message: ChatMessageType;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const ChatMessage = ({
  message,
  onDelete,
  onEdit,
}: ChatMessageProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <Card>
      <Space align="start">
        <Avatar icon={message.isUser ? <UserOutlined /> : <RobotOutlined />} />
        <div>
          <Text type="secondary">{message.isUser ? "User" : "AI"}</Text>
          <p>{message.content}</p>
        </div>
      </Space>
      <Space style={{ marginTop: "8px" }}>
        <Button icon={<CopyOutlined />} onClick={handleCopy} />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => onDelete(message.id)}
        />
        <Button icon={<EditOutlined />} onClick={() => onEdit(message.id)} />
      </Space>
    </Card>
  );
};
