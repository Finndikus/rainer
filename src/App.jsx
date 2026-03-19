import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';
import { PROMPTS } from './data/prompts';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  // Filter logic
  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter((prompt) => {
      // 1. Filter by Category
      const matchesCategory = activeCategory === 'All' || prompt.category === activeCategory;
      
      // 2. Filter by Search Query
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchLower) ||
        prompt.useCase.toLowerCase().includes(searchLower) ||
        prompt.category.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <header className="app-header">
        <div className="logo">
          <Sparkles className="logo-icon" size={28} />
          <h1>PromptFlow</h1>
        </div>
        <p className="subtitle">Expert-level AI prompts at your fingertips.</p>
      </header>

      <main>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        <div className="results-info">
          <span>{filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt' : 'prompts'} found</span>
        </div>

        {filteredPrompts.length > 0 ? (
          <div className="prompts-grid">
            {filteredPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onClick={(p) => setSelectedPrompt(p)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No prompts found</h3>
            <p>Try adjusting your search or category filter.</p>
            <button 
              className="reset-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Modal is rendered conditionally, but component handles its own null state too */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
        />
      )}
    </div>
  );
}

export default App;
