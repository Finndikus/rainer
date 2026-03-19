import React, { useState, useEffect } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import { CATEGORIES } from '../data/prompts';
import './CreatePromptModal.css';

const CreatePromptModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    useCase: '',
    promptText: '',
    category: 'Creative',
    visibility: 'private', // 'public' | 'private'
    instructions: ''
  });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="create-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="create-modal-header">
          <h2>Create New Prompt</h2>
          <p>Add your own custom prompt to the library.</p>
        </div>

        <form className="create-modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title <span className="required">*</span></label>
            <input 
              id="title"
              name="title"
              type="text" 
              placeholder="e.g. Weekly Report Summarizer" 
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="useCase">Use Case Description <span className="required">*</span></label>
            <input 
              id="useCase"
              name="useCase"
              type="text" 
              placeholder="Briefly describe what this prompt accomplishes" 
              value={formData.useCase}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="promptText">Prompt Text <span className="required">*</span></label>
            <textarea 
              id="promptText"
              name="promptText"
              placeholder="Enter the actual prompt... (e.g. Act as a data analyst and summarize [Data])" 
              rows={4}
              value={formData.promptText}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="category">Category</label>
              <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Visibility</label>
              <div className="visibility-toggle">
                <button
                  type="button"
                  className={`vis-btn ${formData.visibility === 'private' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, visibility: 'private' }))}
                >
                  <Lock size={16} /> Private
                </button>
                <button
                  type="button"
                  className={`vis-btn ${formData.visibility === 'public' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, visibility: 'public' }))}
                >
                  <Globe size={16} /> Public
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="instructions">How to use (Instructions)<span className="required">*</span></label>
            <textarea 
              id="instructions"
              name="instructions"
              placeholder="e.g. Replace [Date] with the current date before submitting." 
              rows={2}
              value={formData.instructions}
              onChange={handleChange}
              required
            />
          </div>

          <div className="create-modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Prompt</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePromptModal;
