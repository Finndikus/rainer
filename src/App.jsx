import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';
import CreatePromptModal from './components/CreatePromptModal';
import { PROMPTS } from './data/prompts';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [activeTab, setActiveTab] = useState('All Prompts'); // 'All Prompts' | 'My Prompts'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Load custom prompts from localStorage
  const [customPrompts, setCustomPrompts] = useState(() => {
    const saved = localStorage.getItem('promptflow-custom-prompts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse custom prompts", e);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage when customPrompts change
  useEffect(() => {
    localStorage.setItem('promptflow-custom-prompts', JSON.stringify(customPrompts));
  }, [customPrompts]);

  const handleCreatePrompt = (newPromptData) => {
    const newPrompt = {
      ...newPromptData,
      id: `custom-${Date.now()}`
    };
    setCustomPrompts(prev => [newPrompt, ...prev]);
    // Optionally switch to 'My Prompts' tab to show the user their new prompt
    setActiveTab('My Prompts');
    // Clear search/filters so they can see it
    setSearchQuery('');
    setActiveCategory('All');
  };

  // Filter logic
  const filteredPrompts = useMemo(() => {
    // 1. Determine which source array to use based on Active Tab
    let sourcePrompts = [];
    if (activeTab === 'All Prompts') {
      const publicCustom = customPrompts.filter(p => p.visibility === 'public');
      // default prompts are considered 'public' implicitly for the "All Prompts" feed
      sourcePrompts = [...publicCustom, ...PROMPTS];
    } else if (activeTab === 'My Prompts') {
      sourcePrompts = [...customPrompts];
    }

    // 2. Filter by Category
    const categoryFiltered = sourcePrompts.filter((prompt) => {
      if (activeCategory === 'All') return true;
      return prompt.category === activeCategory;
    });
    
    // 3. Filter by Search Query
    if (!searchQuery.trim()) return categoryFiltered;
    
    const searchLower = searchQuery.toLowerCase();
    return categoryFiltered.filter((prompt) => {
      return (
        prompt.title.toLowerCase().includes(searchLower) ||
        prompt.useCase.toLowerCase().includes(searchLower) ||
        prompt.category.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, activeCategory, activeTab, customPrompts]);

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
        <div className="nav-container">
          <div className="nav-tabs">
            <button 
              className={`tab-btn ${activeTab === 'All Prompts' ? 'active' : ''}`}
              onClick={() => setActiveTab('All Prompts')}
            >
              All Prompts
            </button>
            <button 
              className={`tab-btn ${activeTab === 'My Prompts' ? 'active' : ''}`}
              onClick={() => setActiveTab('My Prompts')}
            >
              My Prompts
            </button>
          </div>
          <button 
            className="create-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={18} /> New Prompt
          </button>
        </div>

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
            <p>
              {activeTab === 'My Prompts' && customPrompts.length === 0 
                ? "You haven't created any custom prompts yet." 
                : "Try adjusting your search or category filter."}
            </p>
            {activeTab === 'My Prompts' && customPrompts.length === 0 ? (
              <button 
                className="reset-btn"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Create your first Prompt
              </button>
            ) : (
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </main>

      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
        />
      )}

      {isCreateModalOpen && (
        <CreatePromptModal 
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreatePrompt}
        />
      )}
    </div>
  );
}

export default App;
