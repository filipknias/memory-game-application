import styles from './StatusCard.module.scss';
import { StatusCardProps } from './StatusCard.props';
import cx from 'clsx';

const StatusCard = ({ label, status, active }: StatusCardProps) => {
  return (
    <div className={cx(styles.statusCard, active && styles.active)}>
      <h2 className={styles.label}>{label}</h2>
      <h1 className={styles.status}>{status}</h1>
    </div>
  )
};  

export default StatusCard;