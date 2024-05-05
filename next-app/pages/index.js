import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import RestaurantInfo from "./components/RxInfo";
import OrderInfo from "./components/OrderInfo";
import { getAuth } from "../API/ToastQueries";
import ScriptedSplunks from "./components/ScriptedSpunks";



const IndexPage = ({pageProps}) => {
  const { data: accessToken } = useQuery('accessToken', getAuth, {
    staleTime: 3600000,//1hr
  });


  return (
    <div className={styles.container}>
      Testing: main view -  index.js
      {accessToken ? (
        <>
          <RestaurantInfo accessToken={accessToken} {...pageProps} />
          <ScriptedSplunks accessToken={accessToken} {...pageProps}/>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default IndexPage;
