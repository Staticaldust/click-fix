export type NotificationType =
  | 'new_quote_request'
  | 'quote_response'
  | 'new_message'
  | 'new_review'
  | 'approval_status'
  | 'system';

export type NotificationChannel = 'system' | 'email' | 'sms';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  link?: string;
  channels: NotificationChannel[];
  isRead: boolean;
  createdAt: Date;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  system: boolean;
  types: {
    new_quote_request: boolean;
    quote_response: boolean;
    new_message: boolean;
    new_review: boolean;
    approval_status: boolean;
    system: boolean;
  };
}
