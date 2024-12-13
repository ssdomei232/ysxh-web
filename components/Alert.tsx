import { useEffect } from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
}

export default function Alert({ message, type, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : 'bg-yellow-100';
  const textColor = type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-700' : 'text-yellow-700';
  const borderColor = type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-yellow-500';

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} border-l-4 ${borderColor}`}>
      <p>{message}</p>
    </div>
  );
}

