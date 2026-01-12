import type { Conversation, Message, ChatParticipant } from '../chat.api';

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      id: 'user-1',
      name: 'ישראל כהן',
      role: 'customer',
      isOnline: true,
    },
    lastMessage: 'תודה רבה, אשמח לתאם פגישה',
    lastMessageTime: new Date('2024-01-12T14:30:00'),
    unreadCount: 2,
    quoteRequestId: 'quote-1',
  },
  {
    id: 'conv-2',
    participant: {
      id: 'user-2',
      name: 'רחל לוי',
      role: 'customer',
      isOnline: false,
    },
    lastMessage: 'מתי תוכל להגיע?',
    lastMessageTime: new Date('2024-01-12T10:15:00'),
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participant: {
      id: 'user-3',
      name: 'משה גולד',
      role: 'customer',
      isOnline: true,
    },
    lastMessage: 'המחיר מקובל עליי',
    lastMessageTime: new Date('2024-01-11T18:45:00'),
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'ישראל כהן',
      content: 'שלום, ראיתי את הפרופיל שלך ואני מעוניין בהתקנת נקודות חשמל',
      timestamp: new Date('2024-01-12T10:00:00'),
      isRead: true,
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'pro-1',
      senderName: 'דוד כהן',
      content: 'שלום! אשמח לעזור. כמה נקודות אתה צריך?',
      timestamp: new Date('2024-01-12T10:05:00'),
      isRead: true,
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'ישראל כהן',
      content: 'אני צריך 5 נקודות בסלון ו-3 בחדר שינה',
      timestamp: new Date('2024-01-12T10:10:00'),
      isRead: true,
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      senderId: 'pro-1',
      senderName: 'דוד כהן',
      content: 'מעולה. המחיר יהיה בין 800 ל-1200 ש"ח תלוי בסוג התקנה. מתי נוח לך שאגיע לבדוק?',
      timestamp: new Date('2024-01-12T10:15:00'),
      isRead: true,
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: 'user-1',
      senderName: 'ישראל כהן',
      content: 'תודה רבה, אשמח לתאם פגישה',
      timestamp: new Date('2024-01-12T14:30:00'),
      isRead: false,
    },
  ],
  'conv-2': [
    {
      id: 'msg-6',
      conversationId: 'conv-2',
      senderId: 'user-2',
      senderName: 'רחל לוי',
      content: 'שלום, יש לי בעיה עם הכיור',
      timestamp: new Date('2024-01-12T09:00:00'),
      isRead: true,
    },
    {
      id: 'msg-7',
      conversationId: 'conv-2',
      senderId: 'pro-1',
      senderName: 'דוד כהן',
      content: 'מה הבעיה בדיוק?',
      timestamp: new Date('2024-01-12T09:30:00'),
      isRead: true,
    },
    {
      id: 'msg-8',
      conversationId: 'conv-2',
      senderId: 'user-2',
      senderName: 'רחל לוי',
      content: 'מתי תוכל להגיע?',
      timestamp: new Date('2024-01-12T10:15:00'),
      isRead: true,
    },
  ],
};

export { ChatParticipant, Conversation, Message };
