import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// PetitionCard
import { ArrowLeft } from "lucide-react";
// import PetitionCard from "../components/Petitions/PetitionCard";
import UpdateDetailCard from "../components/Petitions/UpdateDetailCard";

const UpdatePetitionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petition, setPetition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timelineEvent, setTimelineEvent] = useState({ eventType: "", description: "" });
  const [newDepartment, setNewDepartment] = useState("");
  const [newStatus, setNewStatus] = useState("");
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
  const status = ["Waiting", "Under Review", "In Progress", "Resolved", "Declined", "Pending"];
    
  useEffect(() => {
      // Fetch the petition details
      const fetchPetition = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/petition/petitions/${id}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch petition");
          }
  
          setPetition(data);
        } catch (err: any) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
    };
    console.log("petition" , petition);
    fetchPetition();
  }, [id]);
  
  const handleAddEvent = async () => {
    if (!timelineEvent.eventType || !timelineEvent.description) return;
    // console.log('====================================');
    // console.log(timelineEvent.description);
    // console.log('====================================');
  
    try {
      const response = await fetch(`http://localhost:5000/api/petitions/${id}/timeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType: timelineEvent.eventType,
          description: timelineEvent.description,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add timeline event');
      }
  
      const newEvent = await response.json(); // Assuming the API returns the new event
      setPetition((prev) => ({
        ...prev,
        timeline: [...prev.timeline, newEvent],
      }));
      setTimelineEvent({ eventType: "", description: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }

  };
  
  const handleUpdateStatus = async() =>{
    if(!newStatus) return;
    try{
      const response = await fetch(`http://localhost:5000/api/petitions/${id}/status`,{
        method : 'PATCH',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ status: newStatus }),
      });

      const response1 = await fetch(`http://localhost:5000/api/petitions/${id}/timeline`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: "Status change",
            description: `The petition is now under ${newStatus}`,
          }),
        });

      if(response1.ok){
          navigate("/petitions");
      }
      if(response.ok){
          setPetition((prev) => ({ ...prev, department: response.data.department }));
          setNewStatus("");
      }

    }catch(err){
      console.error("Error updating status:", err);
    }

  };

  const handleUpdateDepartment = async() => {
    if (!newDepartment) return;
    try{
        const response = await fetch(`http://localhost:5000/api/petitions/${id}/department`,{
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ department: newDepartment }),
        });

        const response1 = await fetch(`http://localhost:5000/api/petitions/${id}/timeline`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventType: "Department change",
              description: `The petition is now under ${newDepartment}`,
            }),
          });

        if(response1.ok){
            navigate(-1);
        }
        if(response.ok){
            setPetition((prev) => ({ ...prev, department: response.data.department }));
            setNewDepartment("");
        }
    }catch(error){
        console.error("Error updating department:", error);
    }
    
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update Petition</h1>

      {/* Petition Details */}
      <UpdateDetailCard key={petition._id} petition={petition} />
      

      {/* Add Timeline Event */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add to Timeline</h3>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Event Type"
            value={timelineEvent.eventType}
            onChange={(e) => setTimelineEvent({ ...timelineEvent, eventType: e.target.value })}
            className="border-gray-300 rounded-lg p-2 w-full"
          />
          <textarea
            placeholder="Event Description"
            value={timelineEvent.description}
            onChange={(e) => setTimelineEvent({ ...timelineEvent, description: e.target.value })}
            className="border-gray-300 rounded-lg p-2 w-full"
          ></textarea>
          <button
            onClick={handleAddEvent}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Update status */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Status</h3>
        <div className="grid gap-4">
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="">Select the status</option>
            {status.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateStatus}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Update Department */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Department</h3>
        <div className="grid gap-4">
          <select
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            className="border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="">Select a Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateDepartment}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Update Department
          </button>
        </div>
      </div>

      {/* Timeline Display */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
        {petition.timeline.length === 0 ? (
          <p className="text-gray-600">No events in the timeline.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {petition.timeline.map((event, index) => (
              <li key={index} className="py-4">
                <div className="text-sm font-medium text-gray-800">{event.eventType}</div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <span className="text-xs text-gray-500">
                  {new Date(event.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UpdatePetitionPage;