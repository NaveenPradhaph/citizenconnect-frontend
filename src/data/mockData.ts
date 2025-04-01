import { User, Petition, Department, Notification, DashboardStats } from '../types';
import { addDays, subDays, format } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Citizen',
    email: 'john@example.com',
    role: 'citizen'
  },
  {
    id: 'user2',
    name: 'Sarah Admin',
    email: 'sarah@gov.org',
    role: 'admin'
  },
  {
    id: 'user3',
    name: 'Michael Officer',
    email: 'michael@gov.org',
    role: 'government',
    department: 'dept1',
    governmentLevel: 'local'
  },
  {
    id: 'user4',
    name: 'Lisa Manager',
    email: 'lisa@gov.org',
    role: 'government',
    department: 'dept2',
    governmentLevel: 'state'
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: 'dept1',
    name: 'Public Works',
    governmentLevel: 'local',
    description: 'Responsible for infrastructure maintenance and public facilities'
  },
  {
    id: 'dept2',
    name: 'Health Services',
    governmentLevel: 'state',
    description: 'Oversees healthcare facilities and public health initiatives'
  },
  {
    id: 'dept3',
    name: 'Education',
    governmentLevel: 'central',
    description: 'Manages educational policies and institutions'
  },
  {
    id: 'dept4',
    name: 'Transportation',
    governmentLevel: 'local',
    description: 'Handles public transportation and road infrastructure'
  },
  {
    id: 'dept5',
    name: 'Environmental Protection',
    governmentLevel: 'state',
    description: 'Focuses on environmental conservation and pollution control'
  }
];

// Mock Petitions
export const mockPetitions: Petition[] = [
  {
    id: 'petition1',
    title: 'Fix Potholes on Main Street',
    description: 'The potholes on Main Street have been causing damage to vehicles and are a safety hazard. We request immediate repairs.',
    category: 'Infrastructure',
    status: 'in_progress',
    priority: 'high',
    createdAt: subDays(new Date(), 30).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
    userId: 'user1',
    assignedTo: 'user3',
    department: 'dept1',
    governmentLevel: 'local',
    blockchainId: 'bchain123',
    aiSummary: 'Urgent infrastructure repair needed on Main Street due to potholes causing vehicle damage and safety concerns.',
    aiRecommendation: 'Assign to Public Works department with high priority for immediate assessment and repair.',
    votes: 156,
    comments: [
      {
        id: 'comment1',
        text: "I've damaged two tires this month alone!",
        createdAt: subDays(new Date(), 28).toISOString(),
        userId: 'user1',
        userName: 'John Citizen',
        userRole: 'citizen',
      },
      {
        id: 'comment2',
        text: "We've scheduled an assessment team to evaluate the damage next week.",
        createdAt: subDays(new Date(), 20).toISOString(),
        userId: 'user3',
        userName: 'Michael Officer',
        userRole: 'government'
      }
    ],
    timeline: [
      {
        id: 'timeline1',
        eventType: 'created',
        description: 'Petition submitted',
        createdAt: subDays(new Date(), 30).toISOString()
      },
      {
        id: 'timeline2',
        eventType: 'status_change',
        description: 'Status changed to Under Review',
        createdAt: subDays(new Date(), 25).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      },
      {
        id: 'timeline3',
        eventType: 'department_change',
        description: 'Assigned to Public Works Department',
        createdAt: subDays(new Date(), 23).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      },
      {
        id: 'timeline4',
        eventType: 'status_change',
        description: 'Status changed to In Progress',
        createdAt: subDays(new Date(), 15).toISOString(),
        userId: 'user3',
        userName: 'Michael Officer'
      }
    ]
  },
  {
    id: 'petition2',
    title: 'Improve Street Lighting in Downtown Area',
    description: 'The downtown area has inadequate street lighting, making it unsafe for pedestrians at night. We request additional lighting installations.',
    category: 'Public Safety',
    status: 'under_review',
    priority: 'medium',
    createdAt: subDays(new Date(), 15).toISOString(),
    updatedAt: subDays(new Date(), 10).toISOString(),
    userId: 'user1',
    governmentLevel: 'local',
    blockchainId: 'bchain456',
    aiSummary: 'Request for improved street lighting in downtown area due to safety concerns for pedestrians at night.',
    aiRecommendation: 'Assign to Public Works with medium priority for assessment of current lighting infrastructure.',
    votes: 89,
    comments: [
      {
        id: 'comment3',
        text: 'I feel unsafe walking home from work after dark.',
        createdAt: subDays(new Date(), 14).toISOString(),
        userId: 'user1',
        userName: 'John Citizen',
        userRole: 'citizen'
      }
    ],
    timeline: [
      {
        id: 'timeline5',
        eventType: 'created',
        description: 'Petition submitted',
        createdAt: subDays(new Date(), 15).toISOString()
      },
      {
        id: 'timeline6',
        eventType: 'status_change',
        description: 'Status changed to Under Review',
        createdAt: subDays(new Date(), 10).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      }
    ]
  },
  {
    id: 'petition3',
    title: 'Establish New Community Health Center',
    description: 'Our growing community needs a local health center to provide basic medical services. The nearest facility is over 20 miles away.',
    category: 'Healthcare',
    status: 'pending',
    priority: 'high',
    createdAt: subDays(new Date(), 5).toISOString(),
    updatedAt: subDays(new Date(), 5).toISOString(),
    userId: 'user1',
    governmentLevel: 'state',
    blockchainId: 'bchain789',
    aiSummary: 'Request for a new community health center due to lack of accessible healthcare facilities within 20 miles.',
    aiRecommendation: 'Forward to State Health Services department for evaluation of healthcare coverage in the region.',
    votes: 210,
    comments: [],
    timeline: [
      {
        id: 'timeline7',
        eventType: 'created',
        description: 'Petition submitted',
        createdAt: subDays(new Date(), 5).toISOString()
      }
    ]
  },
  {
    id: 'petition4',
    title: 'Implement Recycling Program',
    description: 'Our community lacks proper recycling facilities. We propose implementing a comprehensive recycling program to reduce waste.',
    category: 'Environment',
    status: 'resolved',
    priority: 'medium',
    createdAt: subDays(new Date(), 90).toISOString(),
    updatedAt: subDays(new Date(), 15).toISOString(),
    userId: 'user1',
    assignedTo: 'user4',
    department: 'dept5',
    governmentLevel: 'state',
    blockchainId: 'bchain101',
    aiSummary: 'Proposal for implementing a community recycling program to address lack of waste management infrastructure.',
    aiRecommendation: 'Assign to Environmental Protection department to develop a sustainable recycling initiative.',
    votes: 178,
    comments: [
      {
        id: 'comment4',
        text: "This would greatly reduce our community's environmental footprint.",
        createdAt: subDays(new Date(), 85).toISOString(),
        userId: 'user1',
        userName: 'John Citizen',
        userRole: 'citizen'
      },
      {
        id: 'comment5',
        text: "We're pleased to announce that funding has been approved for this initiative.",
        createdAt: subDays(new Date(), 40).toISOString(),
        userId: 'user4',
        userName: 'Lisa Manager',
        userRole: 'government'
      }
    ],
    timeline: [
      {
        id: 'timeline8',
        eventType: 'created',
        description: 'Petition submitted',
        createdAt: subDays(new Date(), 90).toISOString()
      },
      {
        id: 'timeline9',
        eventType: 'status_change',
        description: 'Status changed to Under Review',
        createdAt: subDays(new Date(), 85).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      },
      {
        id: 'timeline10',
        eventType: 'department_change',
        description: 'Assigned to Environmental Protection Department',
        createdAt: subDays(new Date(), 80).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      },
      {
        id: 'timeline11',
        eventType: 'status_change',
        description: 'Status changed to In Progress',
        createdAt: subDays(new Date(), 60).toISOString(),
        userId: 'user4',
        userName: 'Lisa Manager'
      },
      {
        id: 'timeline12',
        eventType: 'status_change',
        description: 'Status changed to Resolved',
        createdAt: subDays(new Date(), 15).toISOString(),
        userId: 'user4',
        userName: 'Lisa Manager'
      },
      {
        id: 'timeline13',
        eventType: 'resolution',
        description: 'Recycling program approved and scheduled for implementation next month',
        createdAt: subDays(new Date(), 15).toISOString(),
        userId: 'user4',
        userName: 'Lisa Manager'
      }
    ]
  },
  {
    id: 'petition5',
    title: 'Upgrade School Computer Labs',
    description: 'The computer labs in our district schools are outdated and insufficient for modern educational needs. We request upgrades to support digital learning.',
    category: 'Education',
    status: 'assigned',
    priority: 'medium',
    createdAt: subDays(new Date(), 45).toISOString(),
    updatedAt: subDays(new Date(), 30).toISOString(),
    userId: 'user1',
    department: 'dept3',
    governmentLevel: 'central',
    blockchainId: 'bchain202',
    aiSummary: 'Request for upgrading outdated computer labs in district schools to support modern digital education requirements.',
    aiRecommendation: 'Forward to Education department to assess current technology infrastructure and develop upgrade plan.',
    votes: 145,
    comments: [
      {
        id: 'comment6',
        text: 'Our students need access to current technology to be competitive.',
        createdAt: subDays(new Date(), 44).toISOString(),
        userId: 'user1',
        userName: 'John Citizen',
        userRole: 'citizen'
      }
    ],
    timeline: [
      {
        id: 'timeline14',
        eventType: 'created',
        description: 'Petition submitted',
        createdAt: subDays(new Date(), 45).toISOString()
      },
      {
        id: 'timeline15',
        eventType: 'status_change',
        description: 'Status changed to Under Review',
        createdAt: subDays(new Date(), 40).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      },
      {
        id: 'timeline16',
        eventType: 'department_change',
        description: 'Assigned to Education Department',
        createdAt: subDays(new Date(), 35).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      },
      {
        id: 'timeline17',
        eventType: 'status_change',
        description: 'Status changed to Assigned',
        createdAt: subDays(new Date(), 30).toISOString(),
        userId: 'user2',
        userName: 'Sarah Admin'
      }
    ]
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    title: 'Petition Status Update',
    message: 'Your petition "Fix Potholes on Main Street" has been updated to In Progress',
    read: false,
    createdAt: subDays(new Date(), 15).toISOString(),
    petitionId: 'petition1'
  },
  {
    id: 'notif2',
    userId: 'user1',
    title: 'New Comment',
    message: 'Michael Officer commented on your petition "Fix Potholes on Main Street"',
    read: true,
    createdAt: subDays(new Date(), 20).toISOString(),
    petitionId: 'petition1'
  },
  {
    id: 'notif3',
    userId: 'user3',
    title: 'New Assignment',
    message: 'You have been assigned to handle the petition "Fix Potholes on Main Street"',
    read: false,
    createdAt: subDays(new Date(), 23).toISOString(),
    petitionId: 'petition1'
  },
  {
    id: 'notif4',
    userId: 'user1',
    title: 'Petition Resolved',
    message: 'Your petition "Implement Recycling Program" has been resolved',
    read: false,
    createdAt: subDays(new Date(), 15).toISOString(),
    petitionId: 'petition4'
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalPetitions: 5,
  resolvedPetitions: 1,
  pendingPetitions: 4,
  averageResolutionTime: 75, // in days
  petitionsByCategory: {
    'Infrastructure': 1,
    'Public Safety': 1,
    'Healthcare': 1,
    'Environment': 1,
    'Education': 1
  },
  petitionsByStatus: {
    'pending': 1,
    'under_review': 1,
    'assigned': 1,
    'in_progress': 1,
    'resolved': 1,
    'rejected': 0
  },
  petitionsByDepartment: {
    'Public Works': 2,
    'Health Services': 1,
    'Education': 1,
    'Environmental Protection': 1
  },
  petitionTrend: [
    { date: format(subDays(new Date(), 90), 'yyyy-MM-dd'), count: 1 },
    { date: format(subDays(new Date(), 60), 'yyyy-MM-dd'), count: 0 },
    { date: format(subDays(new Date(), 45), 'yyyy-MM-dd'), count: 1 },
    { date: format(subDays(new Date(), 30), 'yyyy-MM-dd'), count: 1 },
    { date: format(subDays(new Date(), 15), 'yyyy-MM-dd'), count: 1 },
    { date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), count: 1 }
  ]
};

// Current logged in user
export const currentUser: User = mockUsers[0]; // Default to citizen user