import React, { useState, useEffect  } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Dashboard from "./components/Dashboard"; 
import { DragDropContext } from "react-beautiful-dnd";
import styled, { ThemeProvider, createGlobalStyle  } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease-in-out;
  }
`;

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedtasks = localStorage.getItem("tasks"); //  할 일 목록 로컬 스토리지 저장
    return savedtasks ? JSON.parse(savedtasks) : []; // 데이터 없으면 빈 배열 반환
  });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => { // 다크모드
    return JSON.parse(localStorage.getItem("isDarkMode")) || false;
  });

  // tasks 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 다크 모드 변경 시 body 배경 업데이트
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? darkTheme.background : lightTheme.background;
  }, [isDarkMode]);

  // 다크 모드 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);


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

  // Drag & Drop 핸들러 추가
  const handleDragEnd = (result) => {
    if (!result.destination) return; // 목적지가 없으면 아무것도 하지 않음

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
    
    <StyledContainer>
      <Container>
        <Header>
        <h1>To-Do App 📝</h1>
        <ToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
        </ToggleButton>
        </Header>
      <TaskInput addTask={addTask} />

      {/* DragDropContext로 감싸기 */}
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
      </Container>
      <Dashboard tasks={tasks} />
    </StyledContainer>
    </ThemeProvider>
  );
}


const Container = styled.div`
  margin: 20px auto;
  width: 400px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background-color: ${(props) => props.theme.backgroundTodo};
  color: ${(props) => props.theme.text};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    max-width: 600px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

export default App;
