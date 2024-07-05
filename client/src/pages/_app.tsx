// _app.tsx

import '../styles/globals.css'; // Adjust path according to your structure
import '../styles/styles.css'; // Adjust path according to your structure

import type { AppProps } from 'next/app';
import Layout from './layout'; // Import your Layout component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
