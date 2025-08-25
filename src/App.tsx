import { useState } from 'react';
import { FilterProvider } from './context/FilterContext';
import Navbar from './components/Navbar/Navbar';
import TaskBoard from './components/TaskBoard/TaskBoard';
import type { Task } from './types';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleNewFeedback = (newTask: Omit<Task, 'id' | 'votes' | 'comments' | 'createdAt' | 'hasUserVoted'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      votes: 0,
      comments: 0,
      createdAt: new Date(),
      hasUserVoted: false,
    };
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <FilterProvider>
      <Navbar onNewFeedback={handleNewFeedback} />
      <TaskBoard initialTasks={tasks} />
    </FilterProvider>
  );
}

export default App;
