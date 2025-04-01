import React from 'react';
import { 
  FileText, CheckCircle, Clock, Users, 
  BarChart2, PieChart, TrendingUp, Calendar 
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import PetitionChart from '../components/Dashboard/PetitionChart';
import { mockDashboardStats, mockPetitions } from '../data/mockData';
import { format, subDays } from 'date-fns';

const DashboardPage: React.FC = () => {
  // Prepare data for charts
  const statusChartData = {
    labels: Object.keys(mockDashboardStats.petitionsByStatus).map(
      status => status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
    ),
    datasets: [
      {
        label: 'Petitions by Status',
        data: Object.values(mockDashboardStats.petitionsByStatus),
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)', // pending
          'rgba(54, 162, 235, 0.6)', // under_review
          'rgba(153, 102, 255, 0.6)', // assigned
          'rgba(75, 192, 192, 0.6)', // in_progress
          'rgba(75, 192, 75, 0.6)', // resolved
          'rgba(255, 99, 132, 0.6)', // rejected
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: Object.keys(mockDashboardStats.petitionsByCategory),
    datasets: [
      {
        label: 'Petitions by Category',
        data: Object.values(mockDashboardStats.petitionsByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Generate dates for the last 6 months
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subDays(new Date(), i * 30);
    return format(date, 'MMM yyyy');
  }).reverse();

  const trendChartData = {
    labels: last6Months,
    datasets: [
      {
        label: 'Petitions Submitted',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Petitions Resolved',
        data: [8, 12, 10, 18, 15, 22],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Recent petitions
  const recentPetitions = [...mockPetitions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Administrative Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Petitions" 
          value={mockDashboardStats.totalPetitions} 
          icon={<FileText size={24} className="text-indigo-600" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Resolved Petitions" 
          value={mockDashboardStats.resolvedPetitions} 
          icon={<CheckCircle size={24} className="text-green-600" />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Pending Petitions" 
          value={mockDashboardStats.pendingPetitions} 
          icon={<Clock size={24} className="text-orange-600" />}
          change={{ value: 5, isPositive: false }}
        />
        <StatCard 
          title="Avg. Resolution Time" 
          value={mockDashboardStats.averageResolutionTime} 
          icon={<Calendar size={24} className="text-blue-600" />}
          suffix="days"
          change={{ value: 15, isPositive: true }}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PetitionChart 
          type="doughnut" 
          title="Petitions by Status" 
          data={statusChartData} 
        />
        <PetitionChart 
          type="doughnut" 
          title="Petitions by Category" 
          data={categoryChartData} 
        />
      </div>
      
      <div className="mb-8">
        <PetitionChart 
          type="line" 
          title="Petition Trends (Last 6 Months)" 
          data={trendChartData} 
        />
      </div>
      
      {/* Recent Petitions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Petitions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Votes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPetitions.map(petition => (
                <tr key={petition.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`/petitions/${petition.id}`} className="text-indigo-600 hover:text-indigo-900">
                      {petition.title}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${petition.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                        petition.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        petition.status === 'in_progress' ? 'bg-indigo-100 text-indigo-800' : 
                        petition.status === 'under_review' ? 'bg-blue-100 text-blue-800' : 
                        petition.status === 'assigned' ? 'bg-purple-100 text-purple-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {petition.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{petition.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {new Date(petition.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{petition.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Department Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Petitions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolved</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Resolution Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">Public Works</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">42</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">35 (83%)</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">62 days</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700">85%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">Health Services</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">38</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">30 (79%)</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">70 days</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700">78%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">Education</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">29</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">20 (69%)</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">85 days</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700">65%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">Environmental Protection</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">35</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">32 (91%)</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">55 days</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700">92%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">Transportation</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">45</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">36 (80%)</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-700">68 days</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700">81%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;