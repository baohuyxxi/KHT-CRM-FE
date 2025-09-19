// src/components/task/TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) return <p>Chưa có công việc nào</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}
