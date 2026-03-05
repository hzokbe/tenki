import type { ReactNode } from 'react';
import styles from './styles.module.css';

interface PageProps {
  children?: ReactNode;
}

export default function Page({ children }: PageProps) {
  return <div className={styles.page}>{children}</div>;
}
