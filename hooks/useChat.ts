// hooks/useChat.ts
import { useState } from 'react';
import type { Message } from '@/types/chat';

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '무슨 책을 찾으시나요?', sender: 'bot' },
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: '기록을 찾아보는 중입니다...', sender: 'bot' },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 🌟 바로 이 부분! 한글 입력 중복 방지 (조합 중일 때는 return으로 막아버림)
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    isOpen,
    setIsOpen,
    inputValue,
    setInputValue,
    messages,
    handleSend,
    handleKeyDown,
  };
};
