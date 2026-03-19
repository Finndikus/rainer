import React, { useState } from 'react';
import { Copy, Check, Lock, Globe } from 'lucide-react';
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
    <div className="prompt-row" onClick={() => onClick(prompt)}>
      <div className="prompt-row-main">
        <div className="prompt-row-meta">
          <span className="category-badge">{prompt.category}</span>
          {prompt.visibility === 'private' && (
            <span className="visibility-badge private"><Lock size={12} /> Private</span>
          )}
          {prompt.visibility === 'public' && (
            <span className="visibility-badge public"><Globe size={12} /> Public</span>
          )}
        </div>
        
        <h3 className="prompt-row-title">{prompt.title}</h3>
        <p className="prompt-row-desc">{prompt.useCase}</p>
        
        <div className="prompt-row-snippet">
          {prompt.promptText}
        </div>
      </div>
      
      <div className="prompt-row-actions">
        <button 
          className={`copy-action-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy prompt"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span className="copy-label">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
