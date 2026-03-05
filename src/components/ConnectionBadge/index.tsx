import styles from './index.module.css';

interface ConnectionBadgeProps {
  isConnected: boolean;
}

const ConnectionBadge = ({ isConnected }: ConnectionBadgeProps) => {
  return (
    <div className={`${styles.badge} ${isConnected ? styles.connected : styles.disconnected}`}>
      <div className={styles.dot} />
      <span>{isConnected ? 'CONNECTED' : 'DISCONNECTED'}</span>
    </div>
  );
};

export default ConnectionBadge;
