import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHTTP from "../../hooks/use-http";

const NewTask = props => {
  const createdTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
  const { isLoading, error, fetchRequest: sendTaskRequest } = useHTTP();
  const enterTaskHandler = async taskText => {
    sendTaskRequest(
      {
        url: "https://todo-app-a7762-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createdTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
