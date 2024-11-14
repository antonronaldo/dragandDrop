import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import './index.css';

const Column = ({ itemsList, id, ITEMS }) => {
  
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          {itemsList.map((items, index) => {
            const item = ITEMS[items];

            return (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div className="items" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <p className="">{item.title}</p>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;