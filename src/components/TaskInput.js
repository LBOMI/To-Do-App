import React, { useState } from "react";
import styled from "styled-components";

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
    <InputContainer>
      <InputStyle type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="할 일을 입력하세요" />
      <InputStyle type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
      <AddButton onClick={handleSubmit}>추가</AddButton>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const InputStyle = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #A7ABE2;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export default TaskInput;