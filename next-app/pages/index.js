import styles from "../styles/Home.module.css";
import RestaurantInfo from "./components/RxInfo";
import Authentication from "./components/authInfo";



const IndexPage = ({pageProps}) => {
  return (
    <div className={styles.container}>
 Testing: main view -  index.js
      <Authentication {...pageProps}></Authentication>
      <RestaurantInfo {...pageProps}></RestaurantInfo>
    </div>
  );
};

export default IndexPage;
