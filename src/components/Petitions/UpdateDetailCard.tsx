import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, CheckCircle, AlertCircle, Loader, FileText } from 'lucide-react';
import { Petition } from '../../types';
// import UpdatePetitionPage from '../../pages/UpdatePetitionPage';
// import { LogarithmicScale } from 'chart.js';

interface PetitionCardProps {
  petition: Petition;
}


const UpdateDetailCard: React.FC<PetitionCardProps> = ({ petition }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting':
        return 'bg-purple-100 text-purple-800';
      case 'Progress':
        return 'bg-indigo-100 text-indigo-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock size={16} />;
      case 'Under Review':
        return <FileText size={16} />;
      case 'Waiting':
        return <Users size={16} />;
      case 'Progress':
        return <Loader size={16} />;
      case 'Resolved':
        return <CheckCircle size={16} />;
      case 'Declined':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-6">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(petition.status)}`}>
              {getStatusIcon(petition.status)}
              <span className="ml-1 capitalize">{petition.status.replace('_', ' ')}</span>
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(petition.priority)}`}>
              {petition.priority.charAt(0).toUpperCase() + petition.priority.slice(1)} Priority
            </span>
          </div>
          <span className="text-sm text-gray-500">{formatDate(petition.createdAt)}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{petition.title}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {petition.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
            {petition.category}
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs capitalize">
            {petition.governmentLevel} Government
          </span>
          {petition.department && (
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
              {petition.department}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">{petition.votes} supporters</span>
          </div>
        </div>
      </div>
      
      {petition.aiSummary && (
        <div className="bg-indigo-50 p-3 border-t border-indigo-100">
          <div className="text-xs font-semibold text-indigo-800 mb-1">AI Summary</div>
          <p className="text-sm text-gray-700 line-clamp-2">{petition.aiSummary}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateDetailCard;