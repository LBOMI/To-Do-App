import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { DragDropContext } from "react-beautiful-dnd";

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

  const handleDragEnd = (result) => {
    if (!result.destination) return; // 목적지가 없으면 종료

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <div style={styles.container}>
      <h1>To-Do App 📝</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} startEditing={startEditing} deleteTask={deleteTask} editingId={editingId} editText={editText} handleEditChange={(e) => setEditText(e.target.value)} saveEdit={saveEdit} />
    </div>
    </DragDropContext>
  );
}
const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", textAlign: "center" }
};

export default App;
