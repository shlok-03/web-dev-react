import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskContext from "../../context/TaskContext";

function TaskDetail() {
  const { id } = useParams();

  const { tasks } = useContext(TaskContext);

  const task = tasks.find((t) => t.id === +id);

  const navigate = useNavigate();

  return (
    <>
      {task ? (
        <>
          <h2>Task Title: {task.title}</h2>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={() => navigate("/")}>{"<-Back"}</button>
        </>
      ) : (
        <>
          <h2>Task id {id} does not exist</h2>
        </>
      )}
    </>
  );
}

export default TaskDetail;
