import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './PromptCard.css';

const PromptCard = ({ prompt, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent modal from opening
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="prompt-card" onClick={() => onClick(prompt)}>
      <div className="card-header">
        <span className="category-badge">{prompt.category}</span>
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Copy prompt"
          aria-label="Copy prompt"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="copy-tooltip">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      <h3 className="card-title">{prompt.title}</h3>
      <p className="card-description">{prompt.useCase}</p>
      
      <div className="card-body">
        <div className="prompt-text-preview">
          {prompt.promptText}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
