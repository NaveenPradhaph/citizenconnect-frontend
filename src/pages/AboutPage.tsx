import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Brain, Shield, Users, Clock, BarChart2 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About CitizenConnect</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transforming the way citizens and government interact through innovative technology and transparent processes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                CitizenConnect was founded with a clear mission: to bridge the gap between citizens and government through technology, making public administration more responsive, transparent, and efficient.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that effective governance requires active citizen participation and seamless communication between the public and authorities. Our platform leverages cutting-edge technology to streamline the petition process, ensuring that citizen concerns are heard, tracked, and addressed in a timely manner.
              </p>
              <p className="text-gray-600">
                By combining blockchain for immutable record-keeping and AI for intelligent processing, we're creating a new standard for civic engagement and government accountability.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Team collaboration" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Technology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Database className="text-indigo-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Blockchain Integration</h3>
              </div>
              <p className="text-gray-600">
                Our platform utilizes blockchain technology to create immutable records of all petitions and their processing history. This ensures complete transparency and prevents any unauthorized modifications to petition data.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Tamper-proof petition records
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Transparent audit trails
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Decentralized verification
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Brain className="text-indigo-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Processing</h3>
              </div>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze petition content to categorize, summarize, and route submissions to the appropriate government departments, significantly reducing processing time and human error.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Intelligent categorization
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Automated summarization
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Smart routing to departments
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Shield className="text-indigo-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Security & Privacy</h3>
              </div>
              <p className="text-gray-600">
                We implement enterprise-grade security measures to protect user data and petition information, ensuring compliance with data protection regulations while maintaining transparency.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  End-to-end encryption
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Role-based access control
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Compliance with data protection laws
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <BarChart2 className="text-indigo-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Analytics & Reporting</h3>
              </div>
              <p className="text-gray-600">
                Our platform provides comprehensive analytics and reporting tools for both citizens and government officials, offering insights into petition trends, processing times, and resolution rates.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Real-time dashboards
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Performance metrics
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  Trend analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">David Chen</h3>
                <p className="text-indigo-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600">
                  Former government technology advisor with a passion for civic innovation and transparent governance.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-indigo-600 mb-3">CTO</p>
                <p className="text-gray-600">
                  Blockchain expert with extensive experience in developing secure, distributed systems for public sector applications.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Michael Rodriguez</h3>
                <p className="text-indigo-600 mb-3">Head of AI</p>
                <p className="text-gray-600">
                  AI researcher specializing in natural language processing and document analysis for public administration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">Gov</div>
                <p className="text-gray-600 text-sm">National Government</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">CityTech</div>
                <p className="text-gray-600 text-sm">Smart City Initiative</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">BlockSec</div>
                <p className="text-gray-600 text-sm">Blockchain Security</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">CivicAI</div>
                <p className="text-gray-600 text-sm">AI Research Institute</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Civic Innovation Movement</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Be part of the transformation in citizen-government interaction. Start using CitizenConnect today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Create an Account
            </Link>
            <Link
              to="/petitions"
              className="bg-indigo-600 hover:bg-indigo-500 border border-white text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Browse Petitions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;