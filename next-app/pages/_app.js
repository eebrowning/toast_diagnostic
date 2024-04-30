import '../styles/globals.css'
import {ReactQueryProvider} from '../utils/ReactQueryProvider'
import OrderInfo from './components/OrderInfo'
import RestaurantInfo from './components/RxInfo'

function MyApp({ Component, pageProps }) {
  return(
    <ReactQueryProvider> 
      Testing: app view
       <Component {...pageProps}/>

    </ReactQueryProvider>
     )
}

export default MyApp
