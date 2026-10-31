import React from 'react';
import styles from './PrimaryButton.module.css';

export default function PrimaryButton({ children, onClick, disabled = false, className = '', type = 'button', ariaLabel, style }) {
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
