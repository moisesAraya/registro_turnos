import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/recentActivities.css";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard/activities`);
        setActivities(response.data);
      } catch (error) {
        console.error("Error al obtener actividades recientes:", error.message);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="activities-container">
      <h2>Actividades Recientes</h2>
      <ul className="activities-list">
        {activities.map((activity, index) => (
          <li key={index} className={`activity-item ${activity.type}`}>
            <p><strong>{activity.type === "attendance" ? "Ingreso" : "Turno cerrado"}:</strong> {activity.details}</p>
            <p><strong>{activity.type === "attendance" ? "Trabajador" : "Administrador"}:</strong> {activity.user || activity.admin}</p>
            <p><strong>Fecha:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
