// pages/_app.tsx
import '../styles/styles.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleError = (error: any) => {
      console.error('Global error handler:', error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;