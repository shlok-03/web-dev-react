import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskContext from "../../context/TaskContext";

function TaskDetail() {
  const { id } = useParams();

  const { tasks, updateTask } = useContext(TaskContext);

  const task = tasks.find((t) => t.id === +id);

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    task ? { ...task } : { title: "", priority: "High", dueDate: "" },
  );

  function handleSave() {
    updateTask(+id, formData);
    setIsEditing(false);
  }

  return (
    <>
      {task ? (
        <>
          {isEditing ? (
            <>
              <h2>Edit Task</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Priority:</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label>Due Date:</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>

                <button>Save</button>
              </form>

              <button onClick={() => navigate("/")}>{"<-Back"}</button>
            </>
          ) : (
            <>
              <h2>{task.title}</h2>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.dueDate}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => navigate("/")}>{"<-Back"}</button>
            </>
          )}
        </>
      ) : (
        <h2>Task id {id} does not exist</h2>
      )}
    </>
  );
}

export default TaskDetail;
