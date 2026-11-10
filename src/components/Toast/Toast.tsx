import { useEffect } from "react";

interface ToastProps {
  duration?: number;
  message: string;
  onDismiss: () => void;
  className?: string;
}

function Toast({
  duration = 3000,
  message,
  onDismiss,
  className = "",
}: ToastProps) {
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
