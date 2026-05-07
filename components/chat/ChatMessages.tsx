"use client";

import { useEffect, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessages({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load messages
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      setLoading(true);
      const res = await fetch(`/api/chat/${chatId}`);
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();
  }, [chatId]);

  if (loading) {
    return <div className="text-gray-400">Loading chat...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-lg max-w-xl ${
            msg.role === "user"
              ? "bg-blue-600 self-end text-white"
              : "bg-gray-800 text-gray-200"
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}