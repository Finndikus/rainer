import React, { useEffect, useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import './PromptModal.css';

const PromptModal = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);

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

  if (!prompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <span className="category-badge">{prompt.category}</span>
          <h2 className="modal-title">{prompt.title}</h2>
          <p className="modal-description">{prompt.useCase}</p>
        </div>
        
        <div className="modal-body">
          <div className="instructions-section">
            <h3>How to use this prompt</h3>
            <p>{prompt.instructions}</p>
          </div>
          
          <div className="prompt-display-container">
            <div className="prompt-display-header">
              <span>Prompt Text</span>
              <button 
                className={`modal-copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="prompt-text-full">
              {prompt.promptText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
