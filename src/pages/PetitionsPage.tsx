import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import PetitionCard from '../components/Petitions/PetitionCard';
import PetitionFilters from '../components/Petitions/PetitionFilters';
// import { mockPetitions } from '../data/mockData';
import { Petition } from '../types';

const PetitionsPage: React.FC = () => {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [filteredPetitions, setFilteredPetitions] = useState<Petition[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");
  let department = null;
  if(role == "government"){
    department = localStorage.getItem("dept");
  }

  useEffect(() => {
    const fetchPetitions = async () => {
      setIsLoading(true);
      try { 
        let url = "http://localhost:5000/api/petitions";
        if(role == "government"){
          url = `http://localhost:5000/api/petitions?department=${department}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        
        // console.log('====================================');
        // // console.log(data);
        // console.log('====================================');

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch petitions");
        }

        setPetitions(data);
        setFilteredPetitions(data); // Initially, show all petitions
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetitions();
  }, [role,department]);


  // Apply filters and search
  const applyFilters = (filters: any) => {
    setIsLoading(true);
    
    let filtered = [...petitions];
    
    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(petition => filters.status.includes(petition.status));
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(petition => filters.category.includes(petition.category));
    }
    
    // Apply government level filter
    if (filters.governmentLevel.length > 0) {
      filtered = filtered.filter(petition => filters.governmentLevel.includes(petition.governmentLevel));
    }
    
    // Apply priority filter
    if (filters.priority.length > 0) {
      filtered = filtered.filter(petition => filters.priority.includes(petition.priority));
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        petition => 
          petition.title.toLowerCase().includes(term) || 
          petition.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'most_votes':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'highest_priority':
        const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
        filtered.sort((a, b) => priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]);
        break;
      default:
        break;
    }
    
    // Simulate loading
    setTimeout(() => {
      setFilteredPetitions(filtered);
      setIsLoading(false);
      loading();
    },100);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // console.log(filteredPetitions);
  
  // Apply filters when search term changes
  const loading = () => useEffect(() => {
    applyFilters({
      status: [],
      category: [],
      governmentLevel: [],
      priority: [],
      sortBy: 'newest'
    });
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Petitions</h1>
        
        {role == "citizen" && (<Link
          to="/petitions/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Submit New Petition
        </Link>)}
        {role == "admin" && <Link
          to="/create_user"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          {/* <Plus size={18} className="mr-2" /> */}
          Add new Authorities
        </Link>}
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search petitions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </div>
      
      <PetitionFilters onFilterChange={applyFilters} />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredPetitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPetitions.map(petition => (
            <PetitionCard key={petition._id} petition={petition} />
          ))}

        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No petitions found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              applyFilters({
                status: [],
                category: [],
                governmentLevel: [],
                priority: [],
                sortBy: 'newest'
              });
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PetitionsPage;