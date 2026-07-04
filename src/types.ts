export interface NewsUpdate {
  id: string;
  time: string;
  badge: string;
  text: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
}

export interface QueueState {
  isRegistered: boolean;
  email: string;
  ticketNumber: string;
  registeredAt: string;
  queuePosition: number;
  referralCode: string;
}
