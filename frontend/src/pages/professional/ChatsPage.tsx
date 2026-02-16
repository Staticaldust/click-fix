import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  MoreVertical,
} from 'lucide-react';
import { Card, Button, Input, Avatar, PageLoader } from '../../components/common';
import { formatDate, classNames } from '../../utils/helpers';
import { chatService } from '../../services/chat.service';
import type { ChatPreview, ChatMessage } from '../../services/chat.service';
import { useAuthStore } from '../../store/authStore';

export default function ChatsPage() {
  const { id: chatId } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await chatService.getChats();
        setChats(data);
        if (data.length > 0) {
          const initial = chatId ? data.find((c) => String(c.id) === chatId) || data[0] : data[0];
          setSelectedChat(initial);
        }
      } catch (error) {
        console.error('Failed to fetch chats:', error);
        toast.error('שגיאה בטעינת השיחות');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        const chatData = await chatService.getChatById(selectedChat.id);
        setMessages(chatData.messages || []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [selectedChat?.id]);

  const getContactName = (chat: ChatPreview) => {
    // Professional sees customer name, customer sees professional name
    if (chat.customer) {
      return `${chat.customer.firstName} ${chat.customer.lastName}`;
    }
    if (chat.professional) {
      return `${chat.professional.firstName} ${chat.professional.lastName}`;
    }
    return 'משתמש';
  };

  const filteredChats = chats.filter((chat) =>
    getContactName(chat).includes(searchQuery)
  );

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    try {
      await chatService.sendMessage(selectedChat.id, newMessage);
      // Refresh messages
      const chatData = await chatService.getChatById(selectedChat.id);
      setMessages(chatData.messages || []);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('שגיאה בשליחת ההודעה');
    }
  };

  const currentUserId = user?.id ? Number(user.id) : null;

  if (isLoading) return <PageLoader />;

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
            {filteredChats.length === 0 ? (
              <div className="text-center py-8 text-secondary-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">אין שיחות</p>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={classNames(
                    'w-full flex items-start gap-3 p-4 text-right hover:bg-secondary-50 transition-colors border-b border-secondary-100',
                    selectedChat?.id === chat.id && 'bg-primary-50'
                  )}
                >
                  <Avatar name={getContactName(chat)} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-secondary-800">
                        {getContactName(chat)}
                      </span>
                      <span className="text-xs text-secondary-400">
                        {chat.lastMessage ? formatDate(chat.lastMessage.createdAt) : ''}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-500 truncate">
                      {chat.lastMessage?.content || 'אין הודעות'}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-secondary-100">
                <div className="flex items-center gap-3">
                  <Avatar name={getContactName(selectedChat)} size="md" />
                  <div>
                    <h3 className="font-medium text-secondary-800">
                      {getContactName(selectedChat)}
                    </h3>
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
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-secondary-400">
                    <p>אין הודעות עדיין. שלח הודעה ראשונה!</p>
                  </div>
                ) : (
                  messages.map((message) => {
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
                            {new Date(message.createdAt).toLocaleTimeString('he-IL', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
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
