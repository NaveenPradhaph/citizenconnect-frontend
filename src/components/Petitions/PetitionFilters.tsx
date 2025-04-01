import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface PetitionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  status: string[];
  category: string[];
  governmentLevel: string[];
  priority: string[];
  sortBy: string;
}

const PetitionFilters: React.FC<PetitionFiltersProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    category: [],
    governmentLevel: [],
    priority: [],
    sortBy: 'newest'
  });

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    let updatedFilters: FilterState;
    
    if (filterType === 'sortBy') {
      updatedFilters = { ...filters, sortBy: value };
    } else {
      const currentValues = filters[filterType] as string[];
      
      if (currentValues.includes(value)) {
        updatedFilters = {
          ...filters,
          [filterType]: currentValues.filter(v => v !== value)
        };
      } else {
        updatedFilters = {
          ...filters,
          [filterType]: [...currentValues, value]
        };
      }
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      status: [],
      category: [],
      governmentLevel: [],
      priority: [],
      sortBy: 'newest'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const activeFilterCount = 
    filters.status.length + 
    filters.category.length + 
    filters.governmentLevel.length + 
    filters.priority.length;

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleFilters}
            className="flex items-center text-gray-700 font-medium"
          >
            <Filter size={18} className="mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="sortBy" className="text-sm text-gray-600 mr-2">Sort by:</label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most_votes">Most Votes</option>
              <option value="highest_priority">Highest Priority</option>
            </select>
          </div>
          
          {activeFilterCount > 0 && (
            <button 
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800 flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Status</h3>
              <div className="space-y-2">
                {['pending', 'under_review', 'assigned', 'in_progress', 'resolved', 'rejected'].map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleFilterChange('status', status)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                    />
                    <span className="text-gray-700 capitalize">{status.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Category</h3>
              <div className="space-y-2">
                {['Infrastructure', 'Public Safety', 'Healthcare', 'Environment', 'Education', 'Transportation'].map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={() => handleFilterChange('category', category)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                    />
                    <span className="text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Government Level</h3>
              <div className="space-y-2">
                {['local', 'state', 'central'].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.governmentLevel.includes(level)}
                      onChange={() => handleFilterChange('governmentLevel', level)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                    />
                    <span className="text-gray-700 capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Priority</h3>
              <div className="space-y-2">
                {['low', 'medium', 'high', 'urgent'].map(priority => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.priority.includes(priority)}
                      onChange={() => handleFilterChange('priority', priority)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mr-2"
                    />
                    <span className="text-gray-700 capitalize">{priority}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetitionFilters;