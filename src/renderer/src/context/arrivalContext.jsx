import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../api/axios";

export const ArrivalContext = createContext();

export const ArrivalProvider = ({ children }) => {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters State
  const [nameFilter, setNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  // Fetch arrivals from the server
  const fetchArrivals = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nameFilter) params.append("name", nameFilter);
      if (startDateFilter) params.append("startDate", startDateFilter);
      if (endDateFilter) params.append("endDate", endDateFilter);
      const response = await axios.get(`/arrivals?${params}`);
      setArrivals(response.data);
    } catch (error) {
      console.error("Error fetching arrivals:", error);
    } finally {
      setLoading(false);
    }
  }, [nameFilter, startDateFilter, endDateFilter]);

  useEffect(() => {
    fetchArrivals();
  }, [fetchArrivals]);

  // Add an arrival
  const addArrival = async (arrival) => {
    try {
      const response = await axios.post("/arrivals", arrival);
      setArrivals([response.data, ...arrivals]);
    } catch (error) {
      console.error("Error adding arrival:", error);
    }
  };

  // Update an arrival
  const updateArrival = async (id, updatedArrival) => {
    try {
      const response = await axios.put(`/arrivals/${id}`, updatedArrival);
      setArrivals(
        arrivals.map((arr) => (arr._id === id ? response.data : arr))
      );
    } catch (error) {
      console.error("Error updating arrival:", error);
    }
  };

  // Delete an arrival
  const deleteArrival = async (id) => {
    try {
      await axios.delete(`/arrivals/${id}`);
      setArrivals(arrivals.filter((arr) => arr._id !== id));
    } catch (error) {
      console.error("Error deleting arrival:", error);
    }
  };

  return (
    <ArrivalContext.Provider
      value={{
        arrivals,
        addArrival,
        updateArrival,
        deleteArrival,
        loading,
        fetchArrivals,
        nameFilter,
        setNameFilter,
        startDateFilter,
        setStartDateFilter,
        endDateFilter,
        setEndDateFilter,
      }}
    >
      {children}
    </ArrivalContext.Provider>
  );
};
