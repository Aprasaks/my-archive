export type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
};

export type ChatMode = 'initial' | 'chat' | 'request';
export type RequestStatus = 'idle' | 'sending' | 'success';
