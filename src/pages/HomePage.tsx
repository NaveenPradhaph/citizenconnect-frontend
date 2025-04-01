import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, BarChart, Shield, Database, Brain } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const currentUser = localStorage.getItem("role");
  {console.log('====================================');
  console.log(currentUser);
  console.log('====================================');}
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connecting Citizens with Government
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A transparent, secure, and efficient platform for submitting and tracking petitions using blockchain and AI technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/petitions"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Browse Petitions
            </Link>
            {
              currentUser == 'admin' &&
              <Link
              to = "/admin/users"
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                View Authorities
              </Link>
            }
            {currentUser =='citizen' && <Link
              to="/petitions/new"
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Submit a Petition
            </Link>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <Database size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Blockchain Technology</h3>
              <p className="text-gray-600">
                Immutable record-keeping ensures transparency and prevents tampering with petition data.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Processing</h3>
              <p className="text-gray-600">
                Intelligent categorization, summarization, and routing of petitions to the appropriate departments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <BarChart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">
                Comprehensive dashboards and reports for citizens and government officials to track petition status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4 z-10">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-indigo-200"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit</h3>
              <p className="text-gray-600">
                Citizens submit petitions with relevant details and supporting documents.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4 z-10">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-indigo-200"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Process</h3>
              <p className="text-gray-600">
                AI analyzes and routes petitions to the appropriate government departments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4 z-10">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-indigo-200"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track</h3>
              <p className="text-gray-600">
                Citizens and officials can track the status and progress of petitions in real-time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4 z-10">
                  <span className="text-xl font-bold">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Resolve</h3>
              <p className="text-gray-600">
                Government officials address petitions and provide transparent resolutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">5,000+</div>
              <p className="text-gray-600">Petitions Processed</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">75%</div>
              <p className="text-gray-600">Resolution Rate</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50%</div>
              <p className="text-gray-600">Faster Processing</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">100+</div>
              <p className="text-gray-600">Government Departments</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of citizens making a difference in their communities through transparent and efficient petition management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {currentUser =='citizen' ? (
              <Link
                to="/petitions/new"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Submit Your Petition
              </Link>
            ) : (
              // <>
              //   <Link
              //     to="/login"
              //     className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
              //   >
              //     Sign In
              //   </Link>
              //   <Link
              //     to="/register"
              //     className="bg-indigo-500 hover:bg-indigo-400 border border-white text-white px-6 py-3 rounded-md font-semibold transition-colors"
              //   >
              //     Create an Account
              //   </Link>
              // </>
              <Link
              to="/petitions"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Browse Petitions
            </Link>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Citizen</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Thanks to CitizenConnect, our neighborhood finally got the street lighting we needed. The process was transparent and I could track progress every step of the way."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Public Works Department</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI-powered routing has dramatically reduced our response time. We now receive only relevant petitions that match our department's responsibilities."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Lisa Chen</h4>
                  <p className="text-gray-500 text-sm">City Administrator</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The analytics dashboard gives us valuable insights into community needs. We can now allocate resources more effectively based on real data."
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;