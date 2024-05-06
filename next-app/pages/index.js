import {useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import RestaurantInfo from "./components/RxInfo";
import OrderInfo from "./components/OrderInfo";
import { getAuth } from "../API/ToastQueries";
import { useQueryClient } from "../utils/ReactQueryProvider";




const IndexPage = ({pageProps}) => {
  const queryClient = useQueryClient();

  const { data: accessToken } = useQuery('accessToken', getAuth, {
    staleTime: 3600000,//1hr
  });


  const handleClick = async (e) => {
    e.preventDefault();
    let id=document.getElementById('input-id').value
    let secret=document.getElementById('input-secret').value
    sessionStorage.setItem('clientId',id)
    sessionStorage.setItem('clientSecret',secret)
    queryClient.invalidateQueries('accessToken')

  }

  return (
    <div className={styles.container}>
      Testing: main view -  index.js
      {!accessToken &&<div id='user-creds'>
      <label>ClientId</label>
        <input id='input-id' type='text'></input>
        <label>ClientSecret</label>
        <input id='input-secret' type='text'></input>
        <button onClick={handleClick}>Submit Credentials</button>
      
      </div>}
      {accessToken ? (
        <>
          <RestaurantInfo accessToken={accessToken} {...pageProps} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default IndexPage;
