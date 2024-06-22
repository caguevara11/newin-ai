import { Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "../components/Button";
import { BotCard } from "../components/BotCard";
import { Bot } from "../types";

interface BotLibraryProps {
  bots: Bot[];
  onBotSelect: (id: string) => void;
}

export const BotLibrary = ({ bots, onBotSelect }: BotLibraryProps) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Space>
        <Button type="primary">Bot Library</Button>
        <Button>Model Settings</Button>
      </Space>
      <Button icon={<EditOutlined />} type="primary" shape="circle" />
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} onSelect={onBotSelect} />
      ))}
    </Space>
  );
};
