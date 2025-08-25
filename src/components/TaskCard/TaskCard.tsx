import React, { useState, useEffect } from 'react';
import type { Task, Status } from '../../types';

type TaskCardProps = {
  task: Task;
  onVote: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: Status) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onVote, onStatusChange }) => {
  const [isVoted, setIsVoted] = useState(task.hasUserVoted);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showMenu && !target.closest('.menu-container')) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  const handleVote = () => {
    setIsVoted(!isVoted);
    onVote(task.id);
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'UI': 'bg-blue-100 text-blue-800',
      'UX': 'bg-purple-100 text-purple-800',
      'Feature': 'bg-green-100 text-green-800',
      'Bug': 'bg-red-100 text-red-800',
      'Performance': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Open': 'bg-orange-100 text-orange-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Complete': 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 mb-4 group">
      <div className="p-4 flex gap-4">
        <button
          onClick={handleVote}
          className={`flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200 w-14 h-20 min-w-[56px] cursor-pointer ${isVoted ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
        >
          <svg
            className="w-5 h-5 mb-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-semibold">{task.votes}</span>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight flex-1">{task.title}</h3>
            <div className="relative menu-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-48">
                  {(['Open', 'In Progress', 'Complete'] as Status[])
                    .filter(status => status !== task.status)
                    .map(status => (
                      <button
                        key={status}
                        onClick={(e) => {
                          e.stopPropagation();
                          onStatusChange(task.id, status);
                          setShowMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                      >
                        Move to {status}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {truncateDescription(task.description)}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{task.comments}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
