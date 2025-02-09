import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // 할 일 목록
  const [task, setTask] = useState(""); // 새로운 할 일 입력
  const [deadline, setDeadline] = useState(""); // 마감 기한 입력
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 할 일 ID
  const [editText, setEditText] = useState(""); // 수정 중인 텍스트

  // ✅ 할 일 추가
  const addTask = () => {
    if (task.trim() === "" || deadline === "") return; // 빈 입력 방지
    setTasks([...tasks, { id: Date.now(), text: task, deadline, completed: false }]);
    setTask(""); // 입력 필드 초기화
    setDeadline(""); // 마감 기한 초기화
  };

  // ✅ 할 일 삭제
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ✅ 할 일 완료 체크 (완료/미완료 토글)
  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // ✅ 남은 시간 계산 (마감 기한 - 현재 시간)
  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = due - now;

    if (diff <= 0) return "마감됨"; // 마감 시간이 지나면 "마감됨" 표시

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return hours > 0 ? `${hours}시간 ${minutes}분 남음` : `${minutes}분 남음`;
  };

  // ✅ 1초마다 남은 시간 업데이트 (자동 갱신)
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => [...prevTasks]); // 상태 갱신을 트리거
    }, 1000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  // ✅ 마감 시간이 가까울수록 정렬 (가까운 마감일이 위로)
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // ✅ 수정 버튼 클릭 시 해당 할 일 수정 모드 활성화
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // ✅ 수정할 내용 입력 핸들러
  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  // ✅ 수정 완료 (Enter 키 또는 버튼 클릭)
  const saveEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditingId(null); // 수정 모드 해제
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do App</h1>

      {/* ✅ 입력 필드 */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
          placeholder="할 일을 입력하세요"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          추가
        </button>
      </div>

      {/* ✅ 할 일 목록 */}
      <ul style={styles.taskList}>
        {sortedTasks.map((t) => {
          const timeLeft = calculateTimeLeft(t.deadline);

          return (
            <li key={t.id} style={{ ...styles.taskItem, ...getDeadlineStyle(t.deadline)}}>
              <input type="checkbox"  checked={t.completed} onChange={() => toggleComplete(t.id)} />

              {/* ✅ 수정 모드 */}
              {editingId === t.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(t.id)}
                    style={styles.editInput}
                  />
                  <button onClick={() => saveEdit(t.id)} style={styles.saveButton}>✔️</button>
                </>
              ) : (
                <>
                  <span style={t.completed ? styles.completedTask : {} }>{t.text}</span>
                  <span >{timeLeft}</span>
                  <div>
                  <button onClick={() => startEditing(t.id, t.text)} style={styles.editButton}>✏️</button>
                  <button onClick={() => deleteTask(t.id)} style={styles.deleteButton}>🗑️</button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ✅ 마감 시간이 가까울수록 스타일 변경 */
const getDeadlineStyle = (deadline) => {
  const now = new Date();
  const due = new Date(deadline);
  const diff = due - now;

  if (diff <= 0) return { color: "gray", fontWeight: "bold" };
  if (diff <= 3600000) return { color: "red", fontWeight: "bold" };
  if (diff <= 21600000) return { color: "#FF927C", fontWeight: "bold" };
  return { color: "#4773EC", fontWeight: "bold" };
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

export default App;
