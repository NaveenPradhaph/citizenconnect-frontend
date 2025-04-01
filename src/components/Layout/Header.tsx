import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User, Settings, ChevronDown } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { mockNotifications } from '../../data/mockData';

const Header: React.FC = () => {
  // const { currentUser, logout, switchUserRole } = useAuth();
  const currentUser = localStorage.getItem("role");
  let name = localStorage.getItem("name");
  if (name == null) {
      name = "no_name";  
  }
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const logout = () =>{
    localStorage.clear();
  }
  // const userNotifications = mockNotifications.filter(n => n.userId === currentUser?.id);
  // const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
              <span className="text-xl font-bold">CitizenConnect</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
              <Link to="/petitions" className="hover:text-indigo-200 transition-colors">Petitions</Link>
              {currentUser === 'admin' && (
                <Link to="/dashboard" className="hover:text-indigo-200 transition-colors">Dashboard</Link>
              )}
              <Link to="/about" className="hover:text-indigo-200 transition-colors">About</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Demo Mode Switcher */}
            {/* <div className="hidden md:block">
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-md transition-colors"
                >
                  <span>Demo: {currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}</span>
                  <ChevronDown size={16} />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button 
                      onClick={() => { switchUserRole('citizen'); setUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Switch to Citizen
                    </button>
                    <button 
                      onClick={() => { switchUserRole('government'); setUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Switch to Government
                    </button>
                    <button 
                      onClick={() => { switchUserRole('admin'); setUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Switch to Admin
                    </button>
                  </div>
                )}
              </div>
            </div> */}
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-1 rounded-full hover:bg-indigo-600 transition-colors"
              >
                <Bell size={20} />
                {/* {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )} */}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                  <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* {userNotifications.length > 0 ? (
                      userNotifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-gray-600">{notification.message}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    ) : ( */}
                      <div className="px-4 py-3 text-gray-500">No notifications</div>
                    {/* )} */}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="hidden md:block relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2"
              >
              
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  {name.charAt(0)}
                </div>
                <span>{name}</span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-1 rounded-full hover:bg-indigo-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-indigo-200 transition-colors" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/petitions" className="hover:text-indigo-200 transition-colors" onClick={toggleMobileMenu}>Petitions</Link>
              {currentUser === 'admin' && (
                <Link to="/dashboard" className="hover:text-indigo-200 transition-colors" onClick={toggleMobileMenu}>Dashboard</Link>
              )}
              <Link to="/about" className="hover:text-indigo-200 transition-colors" onClick={toggleMobileMenu}>About</Link>
              {/* <div className="pt-2 border-t border-indigo-600">
                <div className="font-medium">Demo Mode:</div>
                <button 
                  onClick={() => { switchUserRole('citizen'); toggleMobileMenu(); }}
                  className="block w-full text-left py-2 text-indigo-200 hover:text-white"
                >
                  Switch to Citizen
                </button>
                <button 
                  onClick={() => { switchUserRole('government'); toggleMobileMenu(); }}
                  className="block w-full text-left py-2 text-indigo-200 hover:text-white"
                >
                  Switch to Government
                </button>
                <button 
                  onClick={() => { switchUserRole('admin'); toggleMobileMenu(); }}
                  className="block w-full text-left py-2 text-indigo-200 hover:text-white"
                >
                  Switch to Admin
                </button>
              </div> */}
              <div className="pt-2 border-t border-indigo-600">
                <Link 
                  to="/profile" 
                  className="block py-2 hover:text-indigo-200 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block py-2 hover:text-indigo-200 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-indigo-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;