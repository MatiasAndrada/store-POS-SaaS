import { useEffect } from 'react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          (registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          },
          (error) => {
            console.log('Service Worker registration failed:', error);
          }
        );
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
