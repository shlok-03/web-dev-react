import { useContext } from "react";
import TaskContext from "../context/TaskContext";

function StatsPage() {
    const { tasks } = useContext(TaskContext);
    return (
        <>
            <h1>Stats Page</h1>
            <p>Number of tasks: {tasks.length}</p>
        </>
    );
}

export default StatsPage;