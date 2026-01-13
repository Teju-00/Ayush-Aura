import React from 'react';

export const highlightText = (text, searchTerm) => {
  if (!searchTerm || !text) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <mark
          key={index}
          style={{
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            padding: '0 2px',
            borderRadius: '3px',
            fontWeight: 600,
          }}
        >
          {part}
        </mark>
      );
    }
    return part;
  });
};
