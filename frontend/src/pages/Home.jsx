import React, { useState, useEffect } from "react";
import Attendance from "../components/Attendance";
import EarlyExit from "../components/EarlyExitButton";
import RecentActivities from "../components/RecentActivities";
import "../styles/home.css";

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = JSON.parse(sessionStorage.getItem("usuario"));
            if (storedUser) {
                setUser(storedUser);
            }
        } catch (err) {
            console.error("Error al cargar datos de usuario:", err);
        }
    }, []);

    if (!user) return null;

    return (
        <div className="home-container">
            {user.rol !== "administrador" ? (
                <>
                    <div className="attendance-container">
                        <Attendance user={user} />
                    </div>
                    <div className="early-exit-container">
                        <EarlyExit user={user} />
                    </div>
                </>
            ) : (
                <div className="recent-activities">
                    <RecentActivities />
                </div>
            )}
        </div>
    );
};

export default HomePage;
