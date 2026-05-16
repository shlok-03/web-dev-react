import { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";

function TaskForm() {

    const { addTask } = useContext(TaskContext);

    const [formData, updateFormData] = useState({
        title: "",
        priority: "High",
        dueDate: "",
    });


    function onAddTask() {

        //moddify parent state
        addTask(formData);

        updateFormData({
            title: "",
            priority: "High",
            dueDate: "",
        });

    }


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onAddTask();
        }}>
            <div>
                <label>Task name:</label>
                <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={(e) => updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                    })}
                />
                {formData.title.trim() === "" && <p className="validation">Title required</p>}
            </div>
            <div>
                <label>Priority:</label>
                <select
                    name='priority'
                    value={formData.priority}
                    onChange={(e) => updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                    })}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

            </div>
            <div>
                <label>Due date:</label>
                <input
                    type='date'
                    name='dueDate'
                    value={formData.dueDate}
                    onChange={(e) => updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                    })}
                />
            </div>
            <button>Add</button>
        </form>
    );
}



export default TaskForm;