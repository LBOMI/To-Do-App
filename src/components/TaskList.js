import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleComplete, startEditing, deleteTask, editingId, editText, handleEditChange, saveEdit }) => {
  return (
    <ul style={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} startEditing={startEditing} deleteTask={deleteTask} editingId={editingId} editText={editText} handleEditChange={handleEditChange} saveEdit={saveEdit} />
      ))}
    </ul>
  );
};

const styles = {
  taskList: { listStyle: "none", padding: "0" }
};

export default TaskList;
