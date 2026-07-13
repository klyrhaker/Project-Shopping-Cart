import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  return (
    <p data-testid="error-message" role="alert" className={styles.errorMessage}>
      {message}
    </p>
  );
}
export default ErrorMessage;
