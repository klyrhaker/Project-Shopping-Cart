function ErrorMessage({ message }) {
  return (
    <p data-testid="error-message" role="alert" className="error-message">
      {message}
    </p>
  );
}
export default ErrorMessage;
