"use client";

type Chat = {
  id: string;
  title: string;
};

interface Props {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export default function ChatSidebarItem({ chat, isActive, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        p-3 rounded-lg cursor-pointer text-sm transition
        ${isActive 
          ? "bg-gray-700 text-white" 
          : "text-gray-300 hover:bg-gray-800"}
      `}
    >
      {chat.title || "New Chat"}
    </div>
  );
}