import { useState } from 'react';
import './App.css';

import { closestCenter, DndContext } from '@dnd-kit/core';
import { Column } from './components/column/Column';
import { arrayMove } from '@dnd-kit/sortable';

 export default function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Add tests to homepage"},
    {id: 2, title: "Fix styling in about section"},
    {id: 3, title: "Learn how to center a div"},
  ]);

  const getTasksPos = id => tasks.findIndex(task => task.id === id)

  const handleDragEnd = event => {
    const {active, over} = event

    if(active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTasksPos(active.id)
      const newPos = getTasksPos(over.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <DndContext onDragEnd={handleDragEnd} 
      collisionDetection={closestCenter}>
        <Column tasks={tasks}/>
      </DndContext>
    </div>
  );
}


