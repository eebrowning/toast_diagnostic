import "../styles/globals.css";
import { ReactQueryProvider } from "../utils/ReactQueryProvider";
import OrderInfo from "../components/OrderInfo";
import RestaurantInfo from "../components/RxInfo";
import { QueryStoreProvider } from '../API/query-store'

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryProvider>
      <QueryStoreProvider>
        <Component {...pageProps} />
      </QueryStoreProvider>
    </ReactQueryProvider>
  );
}

export default MyApp;
