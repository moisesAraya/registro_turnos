import React, { useState } from "react";
import GraphBarra from "../components/GraphBarra";
import { UserData } from "../data";

const Graph = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.scannedAt),
        datasets: [{
            label: "Dias trabajados",
            data: UserData.map((data) => data.qrCodeid),
            backgroundColor: "#FF5722"
        }]
    });

    return (
        <div className="Graph">
            <div style={{ width: 700 }}>
                <GraphBarra chartData={userData} />
            </div>
        </div>
    );
}

export default Graph;
