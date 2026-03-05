import styles from './index.module.css';

type SkibIndicatorProps = {
  text: string;
  activated?: boolean;
};

const SkibIndicator = ({ text, activated = false }: SkibIndicatorProps) => {
  return (
    <div className={`${styles.indicator} ${activated ? styles.active : styles.inactive}`}>
      <div className={styles.dot} />
      <span className={styles.label}>{text}</span>
      <span className={styles.status}>{activated ? 'ARMED' : 'SAFE'}</span>
    </div>
  );
};

export default SkibIndicator;
