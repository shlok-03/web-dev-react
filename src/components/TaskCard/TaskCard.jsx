//import './TaskCard.css'
import { useContext } from "react";
import { Link } from  "react-router-dom"
import TaskContext from "../../context/TaskContext";
import React from "react";

// function TaskCard(props) {
//     return (<div>
//         <h3 className={props.priority === "High" ? "prio-text" : ""}>{props.title}</h3>
//         <p>Due: {props.dueDate}</p>
//         <p>Priority: {props.priority}</p>
//         <p>Assigned to: {props.assignedTo}</p>
//         <p>Status: {props.status}</p>
//     </div>);
// }


//Alternative syntax to read props:

import './TaskCard.css';

function TaskCard(props) {
  return (
    <div className={`task-card ${props.status === "Done" ? "task-done" : ""}`}>

      <h3 className={props.priority === "High" ? "prio-text" : ""}>
        {props.title}
      </h3>

      <div className="task-meta">
        {/* Priority badge */}
        <span className={`badge badge-${props.priority.toLowerCase()}`}>
          {props.priority}
        </span>

        <span className={`badge badge-status ${props.status === "Done" ? "badge-done" : "badge-pending"}`}>
          {props.status}
        </span>
      </div>

      <p><span className="label">Due:</span> {props.dueDate}</p>
      <p><span className="label">Assigned to:</span> {props.assignedTo}</p>
    </div>
  );
}

export default TaskCard;




export default TaskCard;