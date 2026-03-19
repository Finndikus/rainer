import React from 'react';
import './CategoryFilter.css';
import { CATEGORIES } from '../data/prompts';

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="filter-container">
      <div className="filter-scroll">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
