export type Bot = {
  id: string;
  name: string;
  description: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

export type Chat = {
  id: string;
  name: string;
  messages: ChatMessage[];
};
