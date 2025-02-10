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
  inputContainer: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "4px" },
  addButton: { padding: "10px", backgroundColor: "#A7ABE2", color: "black", border: "none",  borderRadius: "4px", cursor: "pointer" }
};
export default TaskInput;
