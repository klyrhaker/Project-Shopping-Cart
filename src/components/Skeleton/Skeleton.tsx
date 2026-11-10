import styles from "./Skeleton.module.css";

function Skeleton() {
  return (
    <div className={styles.skeleton} role="status" data-testid="skeleton" />
  );
}
export default Skeleton;
