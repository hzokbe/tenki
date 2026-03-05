import type { ReactNode } from 'react';
import styles from './styles.module.css';

interface ButtonProps {
  children: ReactNode;

  onClick: () => void;

  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={className ? `${styles.button} ${className}` : styles.button}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
