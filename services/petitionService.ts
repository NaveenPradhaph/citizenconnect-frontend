import axios from "axios";

const API_URL = "https://citizenconnect-backend.vercel.app/api/petitions";

export const fetchPetitions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPetition = async (petitionData: any) => {
  const response = await axios.post(API_URL, petitionData);
  return response.data;
};
