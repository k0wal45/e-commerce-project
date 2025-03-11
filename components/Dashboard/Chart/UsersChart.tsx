"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { User } from "@/utils/Types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const UsersChart = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/getData/getUsersStats?limit=7");
      const data = await response.json();
      setUsersData(data.data.reverse());
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const labels = usersData.map((user) => user._id);

  const data = {
    labels,
    datasets: [
      {
        data: usersData.map((user) => user.totalVisits),
        borderColor: "#00ff40",
        backgroundColor: "#00ff40",
      },
    ],
  };

  return <Line width={800} height={600} data={data} />;
};

export default UsersChart;
