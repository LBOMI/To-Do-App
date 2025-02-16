import React from "react";
import TaskItem from "./TaskItem";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, toggleComplete, startEditing, deleteTask, editingId, editText, handleEditChange, saveEdit }) => {
  return (
    <Droppable droppableId="task-list">
      {(provided) => (
        <ul 
          ref={provided.innerRef} 
          {...provided.droppableProps} 
          style={{ listStyle: "none", padding: "0" }}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided, snapshot) => (
                <li 
                  ref={provided.innerRef} 
                  {...provided.draggableProps} 
                  {...provided.dragHandleProps}
                  style={{
                    ...getDraggingStyle(snapshot.isDragging), // 드래그 시 스타일 적용
                    ...provided.draggableProps.style, // 기본 이동 애니메이션 유지
                  }}
                >
                  <TaskItem 
                    task={task} 
                    toggleComplete={toggleComplete} 
                    startEditing={startEditing} 
                    deleteTask={deleteTask} 
                    editingId={editingId} 
                    editText={editText} 
                    handleEditChange={handleEditChange} 
                    saveEdit={saveEdit} 
                  />
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

// 드래그 중 스타일 함수
const getDraggingStyle = (isDragging) => ({
  transform: isDragging ? "scale(1.05)" : "scale(1)",
  boxShadow: isDragging ? "0px 5px 15px rgba(0, 0, 0, 0.2)" : "none",
  backgroundColor: isDragging ? "#0000" : "#0000",
  transition: "all 0.2s ease",
});


export default TaskList;
