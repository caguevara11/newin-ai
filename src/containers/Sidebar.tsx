import { Layout, Space, Typography, Menu } from "antd";
import { FolderAddOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "../components/Button";
import { Chat } from "../types";

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
  chats: Chat[];
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
}

export const Sidebar = ({ chats, onChatSelect, onNewChat }: SidebarProps) => {
  return (
    <Sider width={300} theme="light">
      <div style={{ padding: "16px" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space>
            <Title level={4}>GentoAI</Title>
            <Button
              icon={<FolderAddOutlined />}
              type="primary"
              shape="circle"
              onClick={onNewChat}
            />
            <Button icon={<EditOutlined />} type="primary" shape="circle" />
          </Space>
          <Menu
            mode="inline"
            defaultSelectedKeys={[chats[0]?.id]}
            items={chats.map((chat) => ({
              key: chat.id,
              label: chat.name,
              onClick: () => onChatSelect(chat.id),
            }))}
          />
        </Space>
      </div>
    </Sider>
  );
};
