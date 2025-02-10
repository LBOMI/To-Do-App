import React, { useState, useEffect } from "react";
import getDeadlineStyle from "./DeadlineStyle";

const TaskItem = ({ task, toggleComplete, startEditing, deleteTask, editingId, editText, handleEditChange, saveEdit }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // 남은 시간을 계산하는 함수
    const calculateTimeLeft = () => {
      const now = new Date();
      const deadline = new Date(task.deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("마감됨");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초 남음`);
      }
    };

    // 처음 실행 및 1초마다 업데이트
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearInterval(timer);
  }, [task.deadline]);

  return (
    <li key={task.id} style={{ ...styles.taskItem, ...getDeadlineStyle(task.deadline) }}>
      <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
      {editingId === task.id ? (
        <>
          <input type="text" value={editText} onChange={handleEditChange} onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)} style={styles.editInput} />
          <button onClick={() => saveEdit(task.id)} style={styles.saveButton}>✔️</button>
        </>
      ) : (
        <>
          <span style={task.completed ? styles.completedTask : {}}>{task.text}</span>
          <span>{timeLeft}</span> {/* 실시간 업데이트되는 남은 시간 */}
          <div>
            <button onClick={() => startEditing(task.id, task.text)} style={styles.editButton}>✏️</button>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
};

const styles = {
  taskItem: { display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #eee" },
  completedTask: { textDecoration: "line-through", color: "gray" },
  deleteButton: { marginLeft: "10px", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  editButton: { color: "black", border: "none", borderRadius: "4px", cursor: "pointer" },
  saveButton: { border: "none", color: "white", borderRadius: "4px", cursor: "pointer" },
  editInput: { padding: "5px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "4px" },
};

export default TaskItem;
