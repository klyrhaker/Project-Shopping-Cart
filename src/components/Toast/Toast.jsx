import { useEffect } from "react";
function Toast(props) {
  const { duration = 3000, message, onDismiss, className = "" } = props;
  useEffect(() => {
    const timerId = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timerId);
  }, [duration, onDismiss]);
  return (
    <p className={`toast ${className}`} role="status">
      {message}
    </p>
  );
}

export default Toast;
