import React, { useState, useEffect } from "react";
import getDeadlineStyle from "./DeadlineStyle";
import styled from "styled-components";

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
    <StyledTaskItem style={getDeadlineStyle(task.deadline)}>
      <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
      
      {editingId === task.id ? (
        <>
          <StyledEditInput 
            type="text" 
            value={editText} 
            onChange={handleEditChange} 
            onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
          />
          <StyledSaveButton onClick={() => saveEdit(task.id)}>✔️</StyledSaveButton>
        </>
      ) : (
        <>
          <TaskText completed={task.completed}>{task.text}</TaskText>
          <TimeLeft>{timeLeft}</TimeLeft>
          <ButtonGroup>
            <StyledEditButton onClick={() => startEditing(task.id, task.text)}>✏️</StyledEditButton>
            <StyledDeleteButton onClick={() => deleteTask(task.id)}>🗑️</StyledDeleteButton>
          </ButtonGroup>
        </>
      )}
    </StyledTaskItem>
  );
};


const StyledTaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  // border-bottom: 1px solid #eee;
  height: 40px;
  background-color: ${(props) => props.theme.todoList};
  border-radius: 10px;
  // border: 1px solid #000000;
  margin-bottom: 8px;
  font-size: 20px;
`;

const TaskText = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  text-decoration-color: #7A7A7A;
  text-decoration-thickness: 3px;
  color: ${(props) => props.theme.taskp};
`;

const TimeLeft = styled.span`
  font-size: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledEditInput = styled.input`
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const StyledSaveButton = styled.button`
  border: none;
  background-color: #2ecc71;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px;
`;

const StyledEditButton = styled.button`
  background-color: #f1c40f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px;
`;

const StyledDeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px;
`;


export default TaskItem;