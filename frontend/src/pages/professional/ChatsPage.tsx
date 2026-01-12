import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  MoreVertical,
} from 'lucide-react';
import { Card, Button, Input, Avatar } from '../../components/common';
import { formatDate, classNames } from '../../utils/helpers';

interface ChatPreview {
  id: string;
  customerId: string;
  customerName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'ישראל כהן',
    lastMessage: 'תודה רבה, אשמח לתאם פגישה',
    lastMessageTime: new Date('2024-01-12T14:30:00'),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'רחל לוי',
    lastMessage: 'מתי תוכל להגיע?',
    lastMessageTime: new Date('2024-01-12T10:15:00'),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'משה גולד',
    lastMessage: 'המחיר מקובל עליי',
    lastMessageTime: new Date('2024-01-11T18:45:00'),
    unreadCount: 0,
    isOnline: true,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'c1',
    content: 'שלום, ראיתי את הפרופיל שלך ואני מעוניין בהתקנת נקודות חשמל',
    timestamp: new Date('2024-01-12T10:00:00'),
    isRead: true,
  },
  {
    id: '2',
    senderId: 'p1',
    content: 'שלום! אשמח לעזור. כמה נקודות אתה צריך?',
    timestamp: new Date('2024-01-12T10:05:00'),
    isRead: true,
  },
  {
    id: '3',
    senderId: 'c1',
    content: 'אני צריך 5 נקודות בסלון ו-3 בחדר שינה',
    timestamp: new Date('2024-01-12T10:10:00'),
    isRead: true,
  },
  {
    id: '4',
    senderId: 'p1',
    content: 'מעולה. המחיר יהיה בין 800 ל-1200 ש"ח תלוי בסוג התקנה. מתי נוח לך שאגיע לבדוק?',
    timestamp: new Date('2024-01-12T10:15:00'),
    isRead: true,
  },
  {
    id: '5',
    senderId: 'c1',
    content: 'תודה רבה, אשמח לתאם פגישה',
    timestamp: new Date('2024-01-12T14:30:00'),
    isRead: false,
  },
];

export default function ChatsPage() {
  const { id: chatId } = useParams<{ id: string }>();
  const [chats] = useState<ChatPreview[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(
    chatId ? mockChats.find((c) => c.id === chatId) || mockChats[0] : mockChats[0]
  );
  const [messages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.customerName.includes(searchQuery)
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;
    console.log('Sending message:', newMessage);
    // In production: await chatService.sendMessage(selectedChat.id, newMessage);
    setNewMessage('');
  };

  const currentUserId = 'p1'; // Professional's ID

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">
          <MessageSquare className="w-7 h-7 inline ml-2 text-primary-500" />
          הודעות
        </h1>
        <p className="text-secondary-600">
          תקשורת עם לקוחות
        </p>
      </div>

      <div className="flex gap-6 h-[calc(100vh-250px)] min-h-[500px]">
        {/* Chat List */}
        <Card className="w-80 flex-shrink-0 flex flex-col p-0 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-secondary-100">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <Input
                placeholder="חיפוש שיחות..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={classNames(
                  'w-full flex items-start gap-3 p-4 text-right hover:bg-secondary-50 transition-colors border-b border-secondary-100',
                  selectedChat?.id === chat.id && 'bg-primary-50'
                )}
              >
                <div className="relative">
                  <Avatar name={chat.customerName} size="md" />
                  {chat.isOnline && (
                    <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-secondary-800">
                      {chat.customerName}
                    </span>
                    <span className="text-xs text-secondary-400">
                      {formatDate(chat.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                    {chat.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-secondary-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar name={selectedChat.customerName} size="md" />
                    {selectedChat.isOnline && (
                      <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-800">
                      {selectedChat.customerName}
                    </h3>
                    <p className="text-sm text-secondary-500">
                      {selectedChat.isOnline ? 'מחובר' : 'לא מחובר'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isOwn = message.senderId === currentUserId;
                  return (
                    <div
                      key={message.id}
                      className={classNames(
                        'flex',
                        isOwn ? 'justify-start' : 'justify-end'
                      )}
                    >
                      <div
                        className={classNames(
                          'max-w-[70%] px-4 py-2 rounded-2xl',
                          isOwn
                            ? 'bg-primary-500 text-white rounded-br-none'
                            : 'bg-secondary-100 text-secondary-800 rounded-bl-none'
                        )}
                      >
                        <p>{message.content}</p>
                        <p
                          className={classNames(
                            'text-xs mt-1',
                            isOwn ? 'text-primary-100' : 'text-secondary-400'
                          )}
                        >
                          {message.timestamp.toLocaleTimeString('he-IL', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-secondary-100">
                <div className="flex gap-2">
                  <Input
                    placeholder="כתוב הודעה..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={!newMessage.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-secondary-400">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                <p>בחר שיחה להתחיל</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
