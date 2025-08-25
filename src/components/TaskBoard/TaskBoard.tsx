import React, { useState, useMemo, useEffect } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { useFilter } from '../../context/FilterContext';
import type { Task, Status } from '../../types';

// Mock data para las tareas
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Improve navigation design',
    description: 'The current navigation is confusing for new users. We need to redesign it to be more intuitive and user-friendly.',
    category: 'UI',
    status: 'Open',
    votes: 12,
    comments: 5,
    createdAt: new Date('2024-01-15'),
    hasUserVoted: false,
  },
  {
    id: '2',
    title: 'Add dark mode support',
    description: 'Users have been requesting a dark mode option. This would improve user experience during night time usage.',
    category: 'Feature',
    status: 'In Progress',
    votes: 24,
    comments: 8,
    createdAt: new Date('2024-01-10'),
    hasUserVoted: true,
  },
  {
    id: '3',
    title: 'Fix login button bug',
    description: 'Login button sometimes becomes unresponsive after clicking. This affects user experience significantly.',
    category: 'Bug',
    status: 'Open',
    votes: 18,
    comments: 3,
    createdAt: new Date('2024-01-20'),
    hasUserVoted: false,
  },
  {
    id: '4',
    title: 'Optimize page load speed',
    description: 'Homepage takes too long to load. We should optimize images and reduce JavaScript bundle size.',
    category: 'Performance',
    status: 'Complete',
    votes: 15,
    comments: 12,
    createdAt: new Date('2024-01-05'),
    hasUserVoted: true,
  },
  {
    id: '5',
    title: 'Improve user onboarding flow',
    description: 'New users are struggling with the current onboarding process. We need to make it more intuitive and engaging.',
    category: 'UX',
    status: 'In Progress',
    votes: 9,
    comments: 6,
    createdAt: new Date('2024-01-18'),
    hasUserVoted: false,
  },
  {
    id: '6',
    title: 'Add search functionality',
    description: 'Users need a way to search through content quickly and efficiently.',
    category: 'Feature',
    status: 'Open',
    votes: 21,
    comments: 4,
    createdAt: new Date('2024-01-22'),
    hasUserVoted: false,
  },
];

type TaskBoardProps = {
  initialTasks?: Task[];
};

const TaskBoard: React.FC<TaskBoardProps> = ({ initialTasks = [] }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const { selectedCategory, sortBy } = useFilter();

  useEffect(() => {
    if (initialTasks.length > 0) {
      setTasks(prevTasks => [...prevTasks, ...initialTasks]);
    }
  }, [initialTasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Sort tasks
    if (sortBy === 'Most Upvoted') {
      filtered = [...filtered].sort((a, b) => b.votes - a.votes);
    } else {
      filtered = [...filtered].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return filtered;
  }, [tasks, selectedCategory, sortBy]);

  const handleVote = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            votes: task.hasUserVoted ? task.votes - 1 : task.votes + 1,
            hasUserVoted: !task.hasUserVoted,
          };
        }
        return task;
      })
    );
  };

  const handleStatusChange = (taskId: string, newStatus: Status) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const getTasksByStatus = (status: Status) => {
    return filteredAndSortedTasks.filter(task => task.status === status);
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'Open':
        return '📋';
      case 'In Progress':
        return '▶️';
      case 'Complete':
        return '✅';
      default:
        return '📋';
    }
  };

  return (
    <div className="px-4 py-8 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[70vh]">
        {(['Open', 'In Progress', 'Complete'] as Status[]).map(status => (
          <div key={status} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-6 py-5 bg-white border-b border-gray-200 sticky top-0 z-10">
              <span className="text-xl">{getStatusIcon(status)}</span>
              <h2 className="text-lg font-semibold text-gray-800 m-0 flex-1">{status}</h2>
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                ({getTasksByStatus(status).length})
              </span>
            </div>

            <div className="p-6 min-h-[400px] flex-1">
              {getTasksByStatus(status).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onVote={handleVote}
                  onStatusChange={handleStatusChange}
                />
              ))}

              {getTasksByStatus(status).length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400 italic text-center">
                  <p className="m-0">No tasks in this status</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
