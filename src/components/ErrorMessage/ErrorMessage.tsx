import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}
function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p data-testid="error-message" role="alert" className={styles.errorMessage}>
      {message}
    </p>
  );
}
export default ErrorMessage;
