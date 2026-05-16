import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";


function HomePage() {
    const {loading, error} = useContext(TaskContext);

    let content = (
      <>
        <TaskForm />
        <TaskList />
      </>
    );

    if (loading) {
        content = (<p>Loading...</p>);
    }
    if (error) {
        content = (<p>{error}</p>);
    }

    return (
        <>
            <h1>Hello below are your tasks:</h1>

           { content }
        </>
    );
}

export default HomePage;