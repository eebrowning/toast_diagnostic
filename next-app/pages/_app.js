import "../styles/globals.css";
import { ReactQueryProvider } from "../utils/ReactQueryProvider";
import { QueryStoreProvider } from '../utils/query-store'


function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryProvider >
      <QueryStoreProvider >
        <Component {...pageProps} />
      </QueryStoreProvider>

    </ReactQueryProvider>
  );
}

export default MyApp;
