"use client";

import { useEffect, useState } from "react";
import ChatSidebarItem from "./ChatSidebarItem";

type Chat = {
  id: string;
  title: string;
};

interface Props {
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: (chatId: string) => void;
}

export default function ChatSidebar({
  activeChatId,
  onSelectChat,
  onNewChat,
}: Props) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/chat/message");
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error("Failed to fetch chats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // 🔥 Create new chat
  const handleNewChat = async () => {
    const res = await fetch("/api/chat/create", {
      method: "POST",
    });

    const newChat = await res.json();

    setChats((prev) => [newChat, ...prev]);
    onNewChat(newChat.id);
  };

  return (
    <div className="w-72 h-screen bg-gray-900 text-white flex flex-col border-r border-gray-800">
      
      {/* HEADER */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-2 rounded-lg font-medium"
        >
          + New Chat
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <div className="text-gray-400 text-sm">Loading...</div>
        ) : chats.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No chats yet
          </div>
        ) : (
          chats.map((chat) => (
            <ChatSidebarItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => onSelectChat(chat.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}