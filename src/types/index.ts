export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'government' | 'admin';
  department?: string;
  governmentLevel?: 'local' | 'state' | 'central';
}

export interface Petition {
  id: Key | null | undefined;
  _id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'under_review' | 'assigned' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  department?: string;
  governmentLevel: 'local' | 'state' | 'central';
  blockchainId?: string;
  aiSummary?: string;
  aiRecommendation?: string;
  attachments?: string[];
  votes: number;
  comments: Comment[];
  timeline: TimelineEvent[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  userName: string;
  userRole: 'citizen' | 'government' | 'admin';
}

export interface TimelineEvent {
  id: string;
  eventType: 'created' | 'status_change' | 'department_change' | 'comment' | 'resolution';
  description: string;
  createdAt: string;
  userId?: string;
  userName?: string;
}

export interface Department {
  id: string;
  name: string;
  governmentLevel: 'local' | 'state' | 'central';
  description: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  petitionId?: string;
}

export interface DashboardStats {
  totalPetitions: number;
  resolvedPetitions: number;
  pendingPetitions: number;
  averageResolutionTime: number;
  petitionsByCategory: Record<string, number>;
  petitionsByStatus: Record<string, number>;
  petitionsByDepartment: Record<string, number>;
  petitionTrend: {
    date: string;
    count: number;
  }[];
}