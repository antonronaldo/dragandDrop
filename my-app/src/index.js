import { useState } from "react";
import {DragDropContext, Draggable, Droppable,} from "react-beautiful-dnd";
import './index.css';
import ReactDOM from 'react-dom/client';
import Column from "./column";

const columnList = ["column-1", "column-2", "column-3"];

const columnData = {
  "column-1": {
    id: "column-1",
    title: "Column 1",
    itemsList: ["item-1", "item-2", "item-3"],
  },
  "column-2": {
    id: "column-2",
    title: "Column 2",
    itemsList: ["item-4", "item-5", "item-6"],
  },
  "column-3": {
    id: "column-3",
    title: "Column 3",
    itemsList: ["item-7", "item-8", "item-9"],
  },
};
 
const items = {
  "item-1": {
    id: "item-1",
    title: "Item 1",
  },
  "item-2": {
    id: "item-2",
    title: "Item 2",
  },
  "item-3": {
    id: "item-3",
    title: "Item 3",
  },
  "item-4": {
    id: "item-4",
    title: "Item 4",
  },
  "item-5": {
    id: "item-5",
    title: "Item 5",
  },
  "item-6": {
    id: "item-6",
    title: "Item 6",
  },
  "item-7": {
    id: "item-7",
    title: "Item 7",
  },
  "item-8": {
    id: "item-8",
    title: "Item 8",
  },
  "item-9": {
    id: "item-9",
    title: "Item 9",
  }
};

function MultiColumnDragnDropExample() {

  const [columnsList, setColumnsList] = useState(columnList);
  const [data, setData] = useState(columnData);

  const handleDragDrop = (currentData) => {

    const { source, destination, type } = currentData;

    if (!destination){
      return;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (type === "COLUMN") {
      const columnListshallowCopy = [...columnsList];
      const [removedItem] = columnListshallowCopy.splice(sourceIndex, 1);
      columnListshallowCopy.splice(destinationIndex, 0, removedItem);
      setColumnsList(columnListshallowCopy);
      return;
    } 
    else {
      if (source.droppableId === destination.droppableId) {
        const sourceId= source.droppableId;
        const itemListShallowCopy = [...data[sourceId].itemsList];
        const [deletedItem] = itemListShallowCopy.splice(sourceIndex, 1);
        itemListShallowCopy.splice(destinationIndex, 0, deletedItem);
        const dataShallowCopy= { ...data };
        dataShallowCopy[sourceId].itemsOrder =itemListShallowCopy;
        setData(dataShallowCopy);
      } 
      else {
        const sourceDroppableId = source.droppableId;
        const destinationDroppableId = destination.droppableId;
        const sourceColumn= [...data[sourceDroppableId].itemsList];
        const destinationColumn = [...data[destinationDroppableId].itemsList];
        const [deleteditem] = sourceColumn.splice(sourceIndex,1);
        destinationColumn.splice(destinationIndex, 0, deleteditem);
        const copiedData= { ...data };
        copiedData[sourceDroppableId].itemsList = sourceColumn;
        copiedData[destinationDroppableId].itemsList = destinationColumn;
        setData(copiedData);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="drop" type="COLUMN" direction="horizontal"> 
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="columnContainer">
                {columnsList.map((columns, index) => {
                  const columnData = data[columns];

                  return (
                    <Draggable draggableId={columnData.id} key={columnData.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="article">
                          <div className="column">
                            <p>
                              {columnData.title}
                            </p>
                            <Column {...columnData} ITEMS={items} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MultiColumnDragnDropExample />);
