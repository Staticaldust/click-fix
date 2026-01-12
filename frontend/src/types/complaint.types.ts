export type ComplaintType = 'professional' | 'system' | 'other';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  type: ComplaintType;
  targetProfessionalId?: string;
  targetProfessionalName?: string;
  subject: string;
  content: string;
  status: ComplaintStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
}
