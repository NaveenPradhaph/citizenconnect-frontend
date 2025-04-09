import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ThumbsUp, Share } from "lucide-react";
// import { mockPetitions } from '../data/mockData';
import { Petition } from "../types";
import TimelineSection from "../components/Petitions/TimelineSection";
import CommentsSection from "../components/Petitions/Comments";

const PetitionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [petition, setPetition] = useState<Petition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchPetition = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://citizenconnect-backend.vercel.app/api/petition/petitions/${id}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch petition");
        }

        setPetition(data);
        setVotes(data.votes);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const isVoted = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(id);
        let url = `https://citizenconnect-backend.vercel.app/api/petition/petitions/${id}/vote?userId=${userId}`;
        const response = await fetch(url);
        const data = await response.json();

        // console.log(data);
        if (data.voted == true) {
          setHasVoted(true);
        } else {
          setHasVoted(false);
        }
      } catch (err: any) {
        console.error(err);
      }
    };

    isVoted();
    fetchPetition();
  }, [id]);

  const handleVote = async () => {
    console.log(hasVoted);
    if (!hasVoted) {
      try {
        // Assuming userId is available (for example, from localStorage or context)
        const userId = localStorage.getItem("userId");

        const response = await fetch(
          `https://citizenconnect-backend.vercel.app/api/petition/petitions/${id}/vote`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }), // Send userId in request body to track who voted
          }
        );

        if (!response.ok) {
          const error = await response.json();
          alert(error.message || "Failed to vote on the petition");
          return;
        }

        // const data = await response.json();
        setVotes((prevVotes) => prevVotes + 1);
        setHasVoted(true); // Mark as voted
      } catch (err) {
        console.error("Vote failed:", err);
        alert("An error occurred while voting.");
      }
    }
  };

  const handleShare = () => {
    const shareURL = window.location.href;
    navigator.clipboard.writeText(shareURL);
    alert("Petition link copied to clipboard!");
  };

  const handleAddComment = async (commentText: string) => {
    try {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("name");
      const userRole = localStorage.getItem("role");

      const response = await fetch(
        `https://citizenconnect-backend.vercel.app/api/petition/petitions/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            userName,
            userRole,
            text: commentText,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to add comment");
        return;
      }

      const updated = await response.json();
      setPetition(updated); // Refresh petition with new comment
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("An error occurred while adding your comment.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!petition) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          Petition not found
        </h3>
        <p className="text-gray-500 mb-6">
          The petition you are looking for does not exist.
        </p>
        <Link
          to="/petitions"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Back to Petitions
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/petitions"
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Petitions
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {petition.title}
          </h1>
          <p className="text-gray-600 mb-6">{petition.description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              Category: {petition.category}
            </span>
            <span
              className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                petition.status
              )}`}
            >
              Status: {petition.status}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700">
              Priority: {petition.priority}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleVote}
              className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                hasVoted ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
              disabled={hasVoted}
            >
              <ThumbsUp size={18} className="mr-2" /> {votes} Votes
            </button>
            <button
              onClick={handleShare}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <Share size={18} className="mr-2" /> Share
            </button>
          </div>
        </div>
      </div>
      <TimelineSection events={petition.timeline} />
      <CommentsSection
        comments={petition.comments}
        onAddComment={handleAddComment}
      />
    </>
  );
};

export default PetitionDetailsPage;
