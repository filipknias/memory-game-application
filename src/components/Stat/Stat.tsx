import styles from './Stat.module.scss';
import { StatProps } from './Stat.props';

const Stat = ({ label, value }: StatProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <span>{value}</span>
    </div>
  )
};

export default Stat;