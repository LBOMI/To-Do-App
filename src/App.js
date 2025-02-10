import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = (text, deadline) => {
    setTasks([...tasks, { id: Date.now(), text, deadline, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <h1>To-Do App</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} startEditing={startEditing} deleteTask={deleteTask} editingId={editingId} editText={editText} handleEditChange={(e) => setEditText(e.target.value)} saveEdit={saveEdit} />
    </div>
  );
}
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

export default App;
