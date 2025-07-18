import React, { useEffect, useState } from "react";
import API from "../../api";
import { format } from "date-fns"; 
// import "./indexs.css";
import "./ActivityLog.css";


const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="activity-log">
      <h3>Activity Log</h3>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            {log.message}
            <br />
            <small>
              {log.user?.fullName} •{" "}
              {format(new Date(log.createdAt), "dd MMM, h:mm a")}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
