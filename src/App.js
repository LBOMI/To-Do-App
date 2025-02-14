import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = (text, deadline) => {
    setTasks([...tasks, { id: Date.now().toString(), text, deadline, completed: false }]); // 🔥 `id`를 문자열로 변환 (Draggable 오류 방지)
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

  // ✅ Drag & Drop 핸들러 추가
  const handleDragEnd = (result) => {
    if (!result.destination) return; // 🔥 목적지가 없으면 아무것도 하지 않음

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <div style={styles.container}>
      <h1>To-Do App 📝</h1>
      <TaskInput addTask={addTask} />

      {/* ✅ DragDropContext로 감싸기 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList 
          tasks={tasks} 
          toggleComplete={toggleComplete} 
          startEditing={startEditing} 
          deleteTask={deleteTask} 
          editingId={editingId} 
          editText={editText} 
          handleEditChange={(e) => setEditText(e.target.value)} 
          saveEdit={saveEdit} 
        />
      </DragDropContext>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", textAlign: "center" }
};

export default App;
