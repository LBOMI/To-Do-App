import React, { useState } from "react";

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    if (task.trim() === "" || deadline === "") return;
    addTask(task, deadline);
    setTask("");
    setDeadline("");
  };

  return (
    <div style={styles.inputContainer}>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="할 일을 입력하세요" style={styles.input} />
      <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={styles.input} />
      <button onClick={handleSubmit} style={styles.addButton}>추가</button>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", textAlign: "center" },
  title: { fontSize: "24px", marginBottom: "20px", color: "#4773EC" },
  inputContainer: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "4px" },
  addButton: { padding: "10px", backgroundColor: "#A7ABE2", color: "black", border: "none",  borderRadius: "4px", cursor: "pointer" },
  taskList: { listStyle: "none", padding: "0" },
  taskItem: {  display: "flex",  justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #eee" },
  completedTask: { textDecoration: "line-through", color: "gray"},
  deleteButton: {  marginLeft: "10px", color: "white", border: "none", borderRadius: "4px", cursor: "pointer"},
  editButton: { color: "black", border: "none", borderRadius: "4px", cursor: "pointer"},
  saveButton: { border: "none", color: "white", borderRadius: "4px", cursor: "pointer" },
  editInput: { padding: "5px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "4px" },
};
export default TaskInput;
