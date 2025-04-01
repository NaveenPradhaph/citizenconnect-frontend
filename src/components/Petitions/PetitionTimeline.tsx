import React from 'react';
import { TimelineEvent } from '../../types';
import { CheckCircle, Clock, Users, MessageSquare, FileText } from 'lucide-react';

interface PetitionTimelineProps {
  timeline: TimelineEvent[];
}

const PetitionTimeline: React.FC<PetitionTimelineProps> = ({ timeline }) => {
  const sortedTimeline = [...timeline].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'created':
        return <FileText size={16} className="text-blue-500" />;
      case 'status_change':
        return <Clock size={16} className="text-orange-500" />;
      case 'department_change':
        return <Users size={16} className="text-purple-500" />;
      case 'comment':
        return <MessageSquare size={16} className="text-indigo-500" />;
      case 'resolution':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-4">Petition Timeline</h3>
      
      <div className="space-y-4">
        {sortedTimeline.map((event, index) => (
          <div key={event.id} className="relative pl-6">
            {/* Timeline connector */}
            {index !== sortedTimeline.length - 1 && (
              <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            {/* Event dot */}
            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
              {getEventIcon(event.eventType)}
            </div>
            
            <div className="mb-1">
              <span className="text-sm text-gray-500">{formatDate(event.createdAt)}</span>
              {event.userName && (
                <span className="text-sm text-gray-700 ml-2">by {event.userName}</span>
              )}
            </div>
            
            <p className="text-gray-800">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetitionTimeline;