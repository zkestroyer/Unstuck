import React from 'react';
import styles from './SecondaryButton.module.css';

export default function SecondaryButton({ children, onClick, disabled = false, className = '', type = 'button', ariaLabel, style }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </button>
  );
}
