import styles from './index.module.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  highlight?: boolean;
}

const MetricCard = ({ title, value, highlight = false }: MetricCardProps) => {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ''}`}>
      <span className={styles.label}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default MetricCard;
