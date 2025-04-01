import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, suffix }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {value}{suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
            </p>
          </div>
          
          {change && (
            <div className="mt-2 flex items-center">
              {change.isPositive ? (
                <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="text-red-500 h-4 w-4 mr-1" />
              )}
              <span className={`text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change.value}%
              </span>
              <span className="text-gray-500 text-sm ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className="p-2 bg-indigo-50 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;