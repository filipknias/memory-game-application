import styles from './Card.module.scss';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
};

export default Card;