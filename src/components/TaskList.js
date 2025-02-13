import React from "react";
import TaskItem from "./TaskItem";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, setTasks }) => {
  return (
    <Droppable droppableId="task-list">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps} style={{ listStyle: "none", padding: "0" }}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TaskItem task={task} />
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

export default TaskList;
