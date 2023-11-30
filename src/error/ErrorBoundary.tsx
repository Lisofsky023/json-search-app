import React, { useState, useEffect, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const logErrorToMyService = async (error: Error, errorInfo: React.ErrorInfo) => {
      try {
        const response = await fetch('http://localhost:8000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: error.toString(),
            info: errorInfo.componentStack,
          }),
        });

        if (!response.ok) {
          console.error('Failed to log error on server:', response.status, response.statusText);
        }
      } catch (fetchError) {
        console.error('Error during error logging:', fetchError);
      }
    };

    const errorHandler = (error: ErrorEvent) => {
      const { error: actualError, filename, lineno, colno, message } = error;

      logErrorToMyService(actualError, {
        componentStack: `Error in ${filename} at line ${lineno}:${colno}\n${message}`,
      });

      setHasError(true);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
