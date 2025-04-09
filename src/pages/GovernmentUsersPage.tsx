import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap"; // You can also style it yourself if preferred
import { AlertCircle } from "lucide-react";

const GovernmentUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Array of users
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://citizenconnect-backend.vercel.app/api/auth/government-users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      } catch (err) {
        setError("An error occurred while fetching the users.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user._id} className="shadow-md rounded-lg p-3 font-mono">
              <CardBody>
                <CardTitle className="text-lg font-semibold ">{user.name}</CardTitle>
                <CardText className="text-sm text-gray-700">{user.email}</CardText>
                <CardText className="text-sm text-gray-700">{user.phone}</CardText>
                <div className="mt-4">
                  <span className="font-semibold">Department: </span>
                  <span>{user.government[0].department}</span>
                </div>
                <div>
                  <span className="font-semibold">Government ID: </span>
                  <span>{user.government[0].govid}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentUsersPage;