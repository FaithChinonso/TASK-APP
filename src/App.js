import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHTTP from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, fetchRequest: fetchTasks } = useHTTP();

  useEffect(() => {
    const transformData = taskData => {
      const loadedTasks = [];

      for (const taskKey in taskData) {
        loadedTasks.push({ id: taskKey, text: taskData[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      { url: "https://todo-app-a7762-default-rtdb.firebaseio.com/tasks.json" },
      transformData
    );
  }, []);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
