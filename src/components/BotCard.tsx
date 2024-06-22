import { Card } from "antd";
import { Bot } from "../types";

type BotCardProps = {
  bot: Bot;
  onSelect: (id: string) => void;
};

export const BotCard = ({ bot, onSelect }: BotCardProps) => {
  return (
    <Card title={bot.name} onClick={() => onSelect(bot.id)}>
      <p>{bot.description}</p>
    </Card>
  );
};
