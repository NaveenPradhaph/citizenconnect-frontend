import React, { useEffect, useState } from 'react';
import { 
  FileText, CheckCircle, Clock, Users, 
  BarChart2, PieChart, TrendingUp, Calendar 
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import PetitionChart from '../components/Dashboard/PetitionChart';
import { format, subDays } from 'date-fns';
// import { mockDashboardStats, mockPetitions } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const [petition,setPetition] = useState([]);
  const departments = [
    'Infrastructure',
    'Public Safety',
    'Healthcare',
    'Environment',
    'Education',
    'Transportation',
    'Housing',
    'Economic Development',
    'Social Services',
    'Other'
    ];

  const statusData = ["Waiting", "Under Review", "In Progress", "Resolved", "Declined", "Pending"];
  
  useEffect(() => {
    const fetchPetitions = async () => {
      try{
        const response = await fetch('http://localhost:5000/api/petitions');
        const data = await response.json();
        if(response.ok){
          setPetition(data);

        }else{
          throw new Error(data.message || "Error while fetching");
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchPetitions();
    
  }, [])
  console.log('====================================');
  console.log(petition.length);
  console.log('====================================');

  const dept_count = () =>{
    const data: number[] = [];
    departments.forEach(department => {
      data.push(petition.filter(p => p.category === department).length);
    })
    return data;
  }
  const status_count = () =>{
    const data: number[] = [];
    statusData.forEach(status => {
      data.push(petition.filter(p => p.status === status).length);
    })
    return data;
  }

  
  // Prepare data for charts
  const statusChartData = {
    labels: statusData.map(
      status => status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
    ),
    datasets: [
      {
        label: 'Petitions by Status',
        data: status_count(),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // under_review
          'rgba(153, 102, 255, 0.6)', // assigned
          'rgba(75, 192, 192, 0.6)', // in_progress
          'rgba(255, 99, 132, 0.6)', // rejected
          'rgba(75, 192, 75, 0.6)', // resolved
          'rgba(255, 206, 86, 0.6)', // pending
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryChartData = {
    labels: departments,
    datasets: [
      {
        label: 'Petitions by Category',
        data: dept_count(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 240, 240, 0.7)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(230, 230, 250, 0.65) ',
          'rgba(173, 216, 230, 0.6)',
          'rgba(245, 222, 179, 0.8)',
          'rgba(255, 0, 0, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dept_details = (dept : string,assigned : number,resolved:number) => (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{dept}</td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{assigned}</td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">{resolved}</td>
      <td className="px-4 py-3 whitespace-nowrap text-gray-700">78 days</td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: Math.floor((resolved/(assigned || 1))*100) }}></div>
          </div>
          <span className="ml-2 text-gray-700">{Math.floor((resolved/(assigned || 1))*100)}%</span>
        </div>
      </td>
    </tr>
  )

  const dept_details_print = departments.map((dept) => {
      const assigned = petition.filter(p => p.category === dept).length;
      const resolved = petition.filter(p => p.category === dept && p.status === "Resolved").length;
      return dept_details(dept,assigned,resolved)
  });
    
  


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
  const recentPetitions = [...petition]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Administrative Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Petitions" 
          value={petition.length} 
          icon={<FileText size={24} className="text-indigo-600" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Resolved Petitions" 
          value={petition.filter(p => p.status === "Resolved").length} 
          icon={<CheckCircle size={24} className="text-green-600" />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Pending Petitions" 
          value={petition.filter(p => p.status === "Pending").length} 
          icon={<Clock size={24} className="text-orange-600" />}
          change={{ value: 5, isPositive: false }}
        />
        <StatCard 
          title="Avg. Resolution Time" 
          value={75} 
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
                <tr key={petition._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`/petitions/${petition._id}`} className="text-indigo-600 hover:text-indigo-900">
                      {petition.title}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${petition.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                        petition.status === 'Declined' ? 'bg-red-100 text-red-800' : 
                        petition.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' : 
                        petition.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : 
                        petition.status === 'Waiting' ? 'bg-purple-100 text-purple-800' : 
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
            {dept_details_print}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;