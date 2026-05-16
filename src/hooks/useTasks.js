import { useState, useEffect } from "react";


/**
 * useTasks - Custom hook for managing task CRUD operations
 * 
 *  Handles:
 *  - Fetching tasks from API on load
 *  - Adding new tasks
 *  - Deleting tasks
 *  - Loading and error state 
 *  
 * @returns {Object} { tasks, loading, error, addTask, onDeleteTask}
 *   
 */


export function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Fetch tasks on load
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const repsonse = await fetch("http://localhost:3000/tasks");
                if (!repsonse.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data = await repsonse.json();
                setTasks(data.tasks);
                setError(null);
            }
            catch(err) {
                setError("Failed to load tasks: " + err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchTasks();

    }
    , []);


    //Add new task
    const addTask = (formData) => {

        if(formData.title.trim() === "") {
            return;
        }

        const newTask = {
            title: formData.title,
            priority: formData.priority,
            dueDate: formData.dueDate,
        };

        setLoading(true);
        fetch("http://localhost:3000/tasks", 
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            }
        ).then((repsonse) => {
            if(!repsonse.ok)
                throw new Error("Unable to create a new task");
            return repsonse.json();
        }).then((data) => {
            setTasks([...tasks, data.task]);
            setError(null);
        }).catch((err) => {
            setError("Failed to create new task: " + err.message);
        }).finally(() => setLoading(false));

    };

    //Delete task

    const onDeleteTask = (id) => {

        setLoading(true);
        fetch(`http://localhost:3000/tasks/${id}`, 
            {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
            }
        ).then((repsonse) => {
            if(!repsonse.ok)
                throw new Error("Unable to delete task");
            return repsonse.json();
        }).then((data) => {
            setTasks(tasks.filter((t) => t.id !== data.task.id));
            setError(null);
        }).catch((err) => {
            setError("Failed to delete task: " + err.message);
        }).finally(() => setLoading(false));

    };

    return {
        tasks,
        loading,
        error,
        addTask,
        onDeleteTask,
    };

}

