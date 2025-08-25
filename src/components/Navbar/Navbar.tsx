import React, { useState } from 'react';
import { useFilter } from '../../context/FilterContext';
import NewFeedbackModal from '../Modal/NewFeedbackModal';
import type { Category, SortBy, Task } from '../../types';

const categories: (Category | 'All Categories')[] = [
  'All Categories',
  'UI',
  'UX',
  'Feature',
  'Bug',
  'Performance'
];

const sortOptions: SortBy[] = ['Most Upvoted', 'Newest'];

type NavbarProps = {
  onNewFeedback?: (task: Omit<Task, 'id' | 'votes' | 'comments' | 'createdAt' | 'hasUserVoted'>) => void;
};

const Navbar: React.FC<NavbarProps> = ({ onNewFeedback }) => {
  const { selectedCategory, sortBy, setSelectedCategory, setSortBy } = useFilter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewFeedback = (task: Omit<Task, 'id' | 'votes' | 'comments' | 'createdAt' | 'hasUserVoted'>) => {
    if (onNewFeedback) {
      onNewFeedback(task);
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold m-0">Feedback Board</h1>
        <p className="text-sm m-0 opacity-90 max-w-md">Share ideas, vote on suggestions, and help improve our platform</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'All Categories')}
            className="px-4 py-2 rounded-md bg-white/10 text-white text-sm border border-white/20 backdrop-blur transition focus:outline-none focus:border-white/50"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-gray-800 text-white">
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-4 py-2 rounded-md bg-white/10 text-white text-sm border border-white/20 backdrop-blur transition focus:outline-none focus:border-white/50"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option} className="bg-gray-800 text-white">
                {option}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-md font-semibold text-sm shadow transition"
        >
          New Feedback
        </button>
      </div>

      <NewFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewFeedback}
      />
    </nav>
  );
};

export default Navbar;
